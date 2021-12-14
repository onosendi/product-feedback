import { AxiosRequestConfig } from 'axios';

const descriptors = {
  register: (
    username: string,
    password: string,
    passwordConfirm: string,
  ): AxiosRequestConfig => ({
    data: { username, password, passwordConfirm },
    method: 'post',
    url: '/user',
  }),
};

export default descriptors;
