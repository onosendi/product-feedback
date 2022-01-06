import type { APILogin } from '@t/api';
import type { AuthResponse } from '@t/response';
import baseApi from '../lib/api';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, APILogin>({
      query: (credentials) => ({
        method: 'post',
        url: '/auth/login',
        body: credentials,
      }),
      invalidatesTags: [
        { type: 'Feedback', id: 'LIST' },
        { type: 'Feedback', id: 'DETAIL' },
        { type: 'Feedback', id: 'ROADMAP' },
      ],
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
