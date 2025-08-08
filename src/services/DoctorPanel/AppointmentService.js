import axios from 'axios';

// ✅ Base URL for appointment endpoints
const REST_API_BASE_URL = 'https://appoitment-backend.onrender.com/api/appointments';

// ✅ Get upcoming appointments by doctor ID
export const listUpcomingAppointmentsByDoctorId = (id) =>
  axios.get(`${REST_API_BASE_URL}/doctor/${id}/upcoming`);

// ✅ Get completed appointments by doctor ID  
export const listCompletedAppointmentsByDoctorId = (id) =>
  axios.get(`${REST_API_BASE_URL}/doctor/${id}/completed`);

// ✅ Create new appointment (for revisits)
export const createAppointment = (appointmentData) =>
  axios.post(`${REST_API_BASE_URL}`, appointmentData);

// ✅ Get all appointments by doctor ID (alternative method)
export const listAllAppointmentsByDoctorId = (id) =>
  axios.get(`${REST_API_BASE_URL}/doctor/${id}/upcoming`);

// ✅ Update appointment status
export const updateAppointmentStatus = (id, status) =>
  axios.put(`${REST_API_BASE_URL}/${id}`, { status });

// ✅ FIXED: Mark appointment as completed
export const markAppointmentCompleted = async (appointmentId) => {
  try {
    console.log(`Marking appointment ${appointmentId} as completed`);
    const response = await axios.put(`${REST_API_BASE_URL}/${appointmentId}/complete`);
    console.log('Appointment marked as completed:', response.data);
    return response;
  } catch (error) {
    console.error('Error marking appointment as completed:', error);
    if (error.response?.status === 404) {
      console.error(`Appointment with ID ${appointmentId} not found`);
    }
    throw error;
  }
};

// ✅ FIXED: Cancel appointment (UPDATE status to CANCELED)
export const cancelAppointmentById = async (appointmentId) => {
  try {
    console.log(`Cancelling appointment ${appointmentId}`);
    const response = await axios.put(`${REST_API_BASE_URL}/cancel/${appointmentId}`);
    console.log('Appointment cancelled successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};

// ✅ Reschedule appointment
export const rescheduleAppointment = (id, newDateTime) =>
  axios.post(`${REST_API_BASE_URL}/${id}/reschedule?newDateTime=${newDateTime}`);

// ✅ Confirm appointment
export const confirmAppointment = (id) =>
  axios.put(`${REST_API_BASE_URL}/${id}/confirm`);