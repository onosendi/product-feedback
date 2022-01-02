import type { APIRegister } from '@t/api';
import type { AuthResponse, ErrorResponse } from '@t/response';
import baseApi from '../lib/api';

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, any>({
      query: (body: APIRegister) => ({
        method: 'post',
        url: '/users',
        body,
      }),
      invalidatesTags: [
        { type: 'Suggestions', id: 'LIST' },
        { type: 'Suggestions', id: 'DETAIL' },
      ],
    }),
    validateUsername: build.query<ErrorResponse | boolean, any>({
      query: (username: string) => `/users/validate/${username}`,
    }),
  }),
});

export const { useRegisterMutation } = usersApi;

export default usersApi;
