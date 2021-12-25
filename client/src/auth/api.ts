import type { AuthResponse } from '@t/response';
import baseApi from '../lib/api';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, any>({
      query: (credentials: {
        username: string;
        password: string;
      }) => ({
        method: 'post',
        url: '/auth/login',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
