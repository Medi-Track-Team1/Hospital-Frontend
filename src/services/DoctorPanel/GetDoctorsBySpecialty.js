import axios from 'axios';

const BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

export const getDoctorsBySpecialty = async (specialty) => {
  const res = await axios
    .get(`${BASE_URL}/by-specialty`, { params: { specialty } });
  return res.data;
};
