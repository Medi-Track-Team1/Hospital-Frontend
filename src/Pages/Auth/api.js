export const API_BASE_URL = 'http://localhost:8080/api/auth';

// Helper function to determine role based on email pattern
const determineRole = (email) => {
  if (!email) return 'ROLE_PATIENT';
  
  if (email.endsWith('doc@gmail.com')) return 'ROLE_DOCTOR';
  if (email.endsWith('adm@gmail.com')) return 'ROLE_ADMIN';
  if (email.endsWith('rec@gmail.com')) return 'ROLE_NURSE';
   
  return 'ROLE_PATIENT';
};

 

export const registerUser = async (userData) => {
  const roles = new Set([determineRole(userData.email)]);
  const payload = {
    username:userData.username || userData.patientName,
    email: userData.email,
    password: userData.password,
    enabled: true,
    roles: Array.from(roles) 
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
  
  return data; // Should contain token and any other user data
};

export const registerPatientDetails = async (patientData, authToken) => {
  const response = await fetch(`${API_BASE_URL}/patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(patientData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Patient registration failed');
  }
  
  return data;
};