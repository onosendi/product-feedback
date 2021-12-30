import type { APILogin } from '@t/api';
import type { AuthResponse } from '@t/response';
import baseApi from '../lib/api';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, any>({
      query: (credentials: APILogin) => ({
        method: 'post',
        url: '/auth/login',
        body: credentials,
      }),
      invalidatesTags: ['Suggestions'],
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
