export const API_BASE_URL = 'https://authentication-n090.onrender.com/api/auth';

// Add this missing JWT parsing function
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
};

const determineRole = (email, decodedToken = null) => {
  // First try to get role from JWT if available
  if (decodedToken?.roles?.length > 0) {
    return decodedToken.roles[0]; // Assuming roles array in JWT
  }
  
  // Fallback to email pattern matching
  if (!email) return 'ROLE_PATIENT';
  if (email.endsWith('doc@gmail.com')) return 'ROLE_DOCTOR';
  if (email.endsWith('adm@gmail.com')) return 'ROLE_ADMIN';
  if (email.endsWith('rec@gmail.com')) return 'ROLE_NURSE';
   
  return 'ROLE_PATIENT';
};

// Store user data safely as JSON
const storeUserData = (user) => {
  localStorage.setItem('currentUser', " ");
  if (typeof user === 'object' && user !== null) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    console.error("storeUserData: Invalid user object", user);
  }
};

// Retrieve current user safely, even if localStorage is corrupted
const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  if (!user) return null;
  
  try {
    // Try to parse as JSON first
    return JSON.parse(user);
  } catch (e) {
    // If parsing fails, it's a plain string ID
    return { userId: user };
  }
};


const clearUserData = () => {
  localStorage.removeItem('currentUser');
};
export const getAuthToken = () => {
  const user = getCurrentUser();
  return user ? user.token : null;
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  const decoded = parseJwt(token);
  if (!decoded) return false;
  
  // Check if token is expired
  return decoded.exp * 1000 > Date.now();
};

export const registerUser = async (userData) => {
  const roles = new Set([determineRole(userData.email)]);
  const payload = {
    username: userData.username || userData.patientName,
    email: userData.email,
    password: userData.password,
    enabled: true,
    roles: Array.from(roles),
    userid:localStorage.getItem("id")

  };

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    console.log(data.error);
    throw new Error(data.error || 'Registration failed');
  }
  
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  const decoded = parseJwt(data.token);
  const role = determineRole(email, decoded);

  const user = {
    token: data.token,
    email: email,
    role: role,
    username: data.username || email.split('@')[0],
    userId:data.userid
  };

  storeUserData(user);
  return user;
};

export const logoutUser = () => {
  clearUserData();
 
};

export const registerPatientDetails = async (patientData) => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');
  
  const response = await fetch(`${API_BASE_URL}/patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(patientData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Patient registration failed');
  }
  
  return data;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'ROLE_ADMIN';
};

export const isDoctor = () => {
  const user = getCurrentUser();
  return user?.role === 'ROLE_DOCTOR';
};

export const isNurse = () => {
  const user = getCurrentUser();
  return user?.role === 'ROLE_NURSE';
};

export const isPatient = () => {
  const user = getCurrentUser();
  return user?.role === 'ROLE_PATIENT';
};

export const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');
  
  // Automatically refresh token if about to expire (optional)
  const decoded = parseJwt(token);
  if (decoded.exp * 1000 - Date.now() < 300000) { // 5 minutes
    console.warn('Access token about to expire, consider refreshing');
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      clearUserData();
      window.location.href = '/login';
    }
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
};
