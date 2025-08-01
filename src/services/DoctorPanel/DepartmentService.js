import axios from "axios";

const API_BASE = "http://localhost:8082/api/departments";

export const fetchDepartments = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};
