import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8082/api/doctor';

const getDoctorById = (doctorId) => axios.get(`${REST_API_BASE_URL}/${doctorId}`);

export default getDoctorById;
