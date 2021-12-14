import { AxiosRequestConfig } from 'axios';

const descriptors = {
  login: (
    username: string,
    password: string,
  ): AxiosRequestConfig => ({
    data: { username, password },
    method: 'post',
    url: '/auth/login',
  }),
};

export default descriptors;
