import { AxiosRequestConfig } from 'axios';

const descriptors = {
  token: (username: string, password: string): AxiosRequestConfig => ({
    data: { username, password },
    method: 'post',
    url: '/auth/token',
  }),
};

export default descriptors;
