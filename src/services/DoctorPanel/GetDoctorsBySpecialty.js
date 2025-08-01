import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/doctor';

export const getDoctorsBySpecialty = (specialty) => {
  return axios
    .get(`${BASE_URL}/by-specialty`, { params: { specialty } })
    .then((res) => res.data);
};
