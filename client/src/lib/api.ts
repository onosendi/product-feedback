import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from './store';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { auth } = store.getState();
    if (auth.token && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

const api = async (descriptor: AxiosRequestConfig) => {
  const { data } = await axios(descriptor);
  return data;
};

export default api;
