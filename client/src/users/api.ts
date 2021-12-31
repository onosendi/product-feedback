import type { APIRegister } from '@t/api';
import type { AuthResponse } from '@t/response';
import baseApi from '../lib/api';

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, any>({
      query: (body: APIRegister) => ({
        method: 'post',
        url: '/users',
        body,
      }),
      invalidatesTags: ['Suggestions'],
    }),
  }),
});

export const { useRegisterMutation } = usersApi;

export default usersApi;
