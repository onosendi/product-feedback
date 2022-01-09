import type { APIEditUser, APIRegister } from '@t/api';
import type { AuthResponse, ErrorResponse, UserResponse } from '@t/response';
import baseApi from '../project/api';

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, APIRegister>({
      query: (body) => ({
        method: 'post',
        url: '/users',
        body,
      }),
      invalidatesTags: [
        { type: 'Feedback', id: 'LIST' },
        { type: 'Feedback', id: 'DETAIL' },
      ],
    }),
    validateUsername: build.query<ErrorResponse | boolean, string>({
      query: (username) => `/users/validate/${username}`,
    }),
    getUserDetail: build.query<UserResponse, string>({
      query: (username) => `/users/${username}`,
    }),
    editUser: build.mutation<void, APIEditUser>({
      query: (body) => ({
        method: 'PATCH',
        url: '/users',
        body,
      }),
      // TODO invalidate tags
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserDetailQuery,
  useEditUserMutation,
} = usersApi;

export default usersApi;
