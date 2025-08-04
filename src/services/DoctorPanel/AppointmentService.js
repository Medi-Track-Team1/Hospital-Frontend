import axios from 'axios';

// ✅ Correct base path (no duplicate "doctor")
const REST_API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

export const listAppointmentsByDoctorId = (id) =>
  axios.get(`${REST_API_BASE_URL}/${id}/appointments`);

export const listCompletedAppointmentsByDoctorId = (id) =>
  axios.get(`${REST_API_BASE_URL}/${id}/appointments/completed`);
