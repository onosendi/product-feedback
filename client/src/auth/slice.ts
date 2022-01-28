import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { DBUserRole } from '@t/database';
import { MD5 } from 'crypto-js';
import type { RootState } from '../project/store';
import usersApi from '../users/api';
import authApi from './api';

interface AuthState {
  emailHash: string | null;
  isAuthenticated: boolean;
  role: DBUserRole | null;
  token: string | null;
  userId: string | null;
  username: string | null;
}

const initialState: AuthState = {
  emailHash: null,
  isAuthenticated: false,
  role: null,
  token: null,
  userId: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.login.matchFulfilled,
        usersApi.endpoints.register.matchFulfilled,
      ),
      (state, { payload }) => ({
        ...payload,
        isAuthenticated: true,
      }),
    );
    builder.addMatcher(
      usersApi.endpoints.editUser.matchFulfilled,
      (state, action) => {
        const s = state;
        const { email, username } = action.meta.arg.originalArgs;
        s.emailHash = MD5(email).toString();
        s.username = username;
      },
    );
  },
});

export function selectAuth(state: RootState) {
  return state.auth;
}

export const { logout } = authSlice.actions;
export default authSlice.reducer;
