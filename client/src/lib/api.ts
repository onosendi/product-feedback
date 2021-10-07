import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// axios.defaults.withCredentials = true;

export default async (descriptor) => {
  const { data } = await axios(descriptor);
  return data;
};
