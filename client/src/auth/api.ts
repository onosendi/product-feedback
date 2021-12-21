import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { DBUserRole } from '@t/database';
// eslint-disable-next-line import/no-cycle
import baseQuery from '../lib/baseQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation<{
      role: DBUserRole;
      token: string;
      username: string;
    },
    any>({
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
