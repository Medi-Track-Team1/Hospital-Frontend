import axios from 'axios';

const BASE_URL = 'https://doctorpanel-backend.onrender.com/api/doctor';

export const getDoctorsBySpecialty = (specialty) => {
  return axios
    .get(`${BASE_URL}/by-specialty`, { params: { specialty } })
    .then((res) => res.data);
};
