import type { APIEditUser, APIRegister } from '@t/api';
import type { AuthResponse, UserResponse } from '@t/response';
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
    getUserDetail: build.query<UserResponse, string>({
      query: (username) => `/users/${username}`,
    }),
    editUser: build.mutation<void, APIEditUser>({
      query: (body) => ({
        method: 'PATCH',
        url: '/users',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserDetailQuery,
  useEditUserMutation,
} = usersApi;

export default usersApi;
