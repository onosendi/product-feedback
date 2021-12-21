import { createSlice } from '@reduxjs/toolkit';
import { DBUserRole } from '@t/database';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../lib/store';
// eslint-disable-next-line import/no-cycle
import suggestionsApi from './api';

const NAMESPACE = 'auth';

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
  name: NAMESPACE,
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
