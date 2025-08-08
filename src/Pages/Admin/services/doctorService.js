const API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
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

const compressImage = async (file, maxSize = 500000) => { // 500KB max size
  return new Promise((resolve) => {
    if (file.size <= maxSize) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        const ratio = Math.sqrt(maxSize / file.size);
        width *= ratio;
        height *= ratio;
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          }));
        }, 'image/jpeg', 0.7);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const createDoctor = async (doctorData, profilePhoto) => {
  try {
    const formData = new FormData();
    
    // Compress image if it's too large
    let processedPhoto = profilePhoto;
    if (profilePhoto && profilePhoto.size > 500000) {
      processedPhoto = await compressImage(profilePhoto);
    }

    // Append all doctor data as JSON
    formData.append('doctor', JSON.stringify({
      ...doctorData,
      status: doctorData.status || 'Active',
      languages: doctorData.languages ? 
        doctorData.languages.split(',').map(lang => lang.trim()) : 
        []
    }));
    
    // Append photo if provided
    if (processedPhoto) {
      formData.append('photo', processedPhoto);
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
    
    formData.append('doctor', JSON.stringify({
      ...doctorData,
      languages: doctorData.languages ? doctorData.languages.split(',').map(lang => lang.trim()) : []
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

export const getDoctorsBySpecialty = async (specialty) => {
  try {
    const response = await fetch(`${API_BASE_URL}/by-specialty?specialty=${specialty}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching doctors by specialty:', error);
    throw error;
  }
};