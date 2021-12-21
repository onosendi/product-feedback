import { createSlice } from '@reduxjs/toolkit';
import type { DBUserRole } from '@t/database';
import type { RootState } from '../lib/store';
import suggestionsApi from './api';

interface AuthState {
  role: DBUserRole | null;
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  role: null,
  token: null,
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
      suggestionsApi.endpoints.login.matchFulfilled,
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
