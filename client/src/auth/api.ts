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
      invalidatesTags: [
        { type: 'Suggestions', id: 'LIST' },
        { type: 'Suggestions', id: 'DETAIL' },
      ],
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
