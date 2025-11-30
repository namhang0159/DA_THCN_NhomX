import axios from "./api.customize.js";

const LoginApi = (email, password) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/loginAdmin`;
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};
const fetchMeApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/admin`;
  return axios.get(URL_API);
};

export { LoginApi, fetchMeApi };
