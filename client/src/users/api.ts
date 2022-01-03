import type { APIRegister } from '@t/api';
import type { AuthResponse, ErrorResponse } from '@t/response';
import baseApi from '../lib/api';

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, APIRegister>({
      query: (body) => ({
        method: 'post',
        url: '/users',
        body,
      }),
      invalidatesTags: [
        { type: 'Suggestions', id: 'LIST' },
        { type: 'Suggestions', id: 'DETAIL' },
      ],
    }),
    validateUsername: build.query<ErrorResponse | boolean, string>({
      query: (username) => `/users/validate/${username}`,
    }),
  }),
});

export const { useRegisterMutation } = usersApi;

export default usersApi;
