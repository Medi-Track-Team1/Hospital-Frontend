import axios from 'axios';

const REST_API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/prescriptions';

// Create a new prescription
export const createPrescription = (prescriptionData) =>
  axios.post(REST_API_BASE_URL, prescriptionData);

// Get prescription by appointment ID (used in Medical Appointments)
export const getPrescriptionByAppointmentId = async (appointmentId) => {
  try {
    const response = await axios.get(
      `https://doctorpanel-backend.onrender.com/api/prescriptions/appointment/${appointmentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000,
      }
    );
    
    console.log("✅ Prescription response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error in getPrescriptionByAppointmentId:", error);
    
    if (error.response) {
      console.error("📡 Server Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error("📡 Network Error - No Response:", error.request);
    } else {
      console.error("⚠️ Request Setup Error:", error.message);
    }
    
    throw error;
  }
};

// Get all prescriptions by doctor ID (used for doctor's prescription history)
export const getPrescriptionsByDoctorId = (doctorId) =>
  axios.get(`${REST_API_BASE_URL}/doctor/${doctorId}`);

// Update prescription (used in edit functionality)
export const updatePrescription = (prescriptionId, prescriptionData) =>
  axios.put(`${REST_API_BASE_URL}/${prescriptionId}`, prescriptionData);

// Delete prescription (used for prescription management)
export const deletePrescription = (prescriptionId) =>
  axios.delete(`${REST_API_BASE_URL}/${prescriptionId}`);
