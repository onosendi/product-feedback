import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { DBUserRole } from '@t/database';
import type { RootState } from '../lib/store';
import usersApi from '../users/api';
import authApi from './api';

interface AuthState {
  role: DBUserRole | null;
  token: string | null;
  userId: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  role: null,
  token: null,
  userId: null,
  username: null,
  isAuthenticated: false,
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
  },
});

export function selectAuth(state: RootState) {
  return state.auth;
}

// TODO: logging out should invalidate suggestions
export const { logout } = authSlice.actions;
export default authSlice.reducer;
