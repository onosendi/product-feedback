import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

const api = async (descriptor: AxiosRequestConfig) => {
  const { data } = await axios(descriptor);
  return data;
};

export default api;
