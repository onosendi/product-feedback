import { AxiosRequestConfig } from 'axios';

const descriptors = {
  list: (): AxiosRequestConfig => ({
    method: 'get',
    url: '/suggestions',
  }),
};

export default descriptors;
