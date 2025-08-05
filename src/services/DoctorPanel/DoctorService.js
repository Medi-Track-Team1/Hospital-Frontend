import axios from 'axios';

const REST_API_BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

// Get doctor by ID
export const getDoctorById = (doctorId) =>
  axios.get(`${REST_API_BASE_URL}/${doctorId}`);

// Get all doctors
export const getAllDoctors = () =>
  axios.get(`${REST_API_BASE_URL}`);

// Get doctors by specialty (e.g., Cardiology)
export const getDoctorsBySpecialty = (specialty) =>
  axios.get(`${REST_API_BASE_URL}/by-specialty`, {
    params: { specialty },
  });
export const getDoctorCount = async () => {
  const response = await axios.get(`${REST_API_BASE_URL}/count`);
  return response.data;
};