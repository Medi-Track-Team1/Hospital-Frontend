const API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data;
};

export const getAllDoctors = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const getDoctorProfile = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/profile`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    throw error;
  }
};

export const createDoctor = async (doctorData, profilePhoto) => {
  try {
    const formData = new FormData();
    
    formData.append('doctor', new Blob([JSON.stringify({
      ...doctorData,
      status: 'Active'
    })], { type: 'application/json' }));
    
    if (profilePhoto) {
      formData.append('photo', profilePhoto);
    }

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData,
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw error;
  }
};

export const updateDoctor = async (id, doctorData, profilePhoto) => {
  try {
    const formData = new FormData();
    
    formData.append('doctor', new Blob([JSON.stringify(doctorData)], {
      type: 'application/json'
    }));
    
    if (profilePhoto) {
      formData.append('photo', profilePhoto);
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error updating doctor:', error);
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting doctor:', error);
    throw error;
  }
};