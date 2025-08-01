const API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
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

export const getDoctorById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    throw error;
  }
};

export const createDoctor = async (doctorData, profilePhoto) => {
  try {
    const formData = new FormData();
    
    // Append all doctor data as JSON string
    formData.append('doctor', new Blob([JSON.stringify({
      ...doctorData,
      status: 'Active' // Default status
    })], { type: 'application/json' }));
    
    // Append photo if exists
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
    
    // Append all doctor data as JSON string
    formData.append('doctor', new Blob([JSON.stringify(doctorData)], {
      type: 'application/json'
    }));
    
    // Append photo if exists
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

export const getDoctorsBySpecialty = async (specialty) => {
  try {
    const response = await fetch(`${API_BASE_URL}/names/by-specialty?specialty=${encodeURIComponent(specialty)}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching doctors by specialty:', error);
    throw error;
  }
};