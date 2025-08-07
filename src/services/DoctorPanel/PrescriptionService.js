import axios from 'axios';

const REST_API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/prescriptions';

// Create a new prescription
export const createPrescription = (prescriptionData) =>
  axios.post(REST_API_BASE_URL, prescriptionData);

// Get prescription by appointment ID
export const getPrescriptionByAppointmentId = async (appointmentId) => {
  try {
    console.log("🔍 Fetching prescription for appointmentId:", appointmentId);
    console.log("🌐 API URL:", `https://doctorpanel-backend.onrender.com/api/prescriptions/appointment/${appointmentId}`);
    
    const response = await axios.get(
      `https://doctorpanel-backend.onrender.com/api/prescriptions/appointment/${appointmentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000, // 10 second timeout
      }
    );
    
    console.log("✅ Prescription response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error in getPrescriptionByAppointmentId:", error);
    
    if (error.response) {
      // Server responded with error status
      console.error("📡 Server Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("📡 Network Error - No Response:", error.request);
    } else {
      // Something else happened
      console.error("⚠️ Request Setup Error:", error.message);
    }
    
    throw error;
  }
};
// Get all prescriptions by doctor ID
export const getPrescriptionsByDoctorId = (doctorId) =>
  axios.get(`${REST_API_BASE_URL}/doctor/${doctorId}`);

// Update prescription
export const updatePrescription = (prescriptionId, prescriptionData) =>
  axios.put(`${REST_API_BASE_URL}/${prescriptionId}`, prescriptionData);

// Delete prescription
export const deletePrescription = (prescriptionId) =>
  axios.delete(`${REST_API_BASE_URL}/${prescriptionId}`);