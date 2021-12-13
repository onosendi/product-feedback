import { createSlice } from '@reduxjs/toolkit';

const NAMESPACE = 'auth';

type AuthState = {
  role: 'user' | 'admin' | null,
  token: string | null,
  username: string | null,
};
const initialState: AuthState = {
  role: null,
  token: null,
  username: null,
};

export const authSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetAuth: (state, { payload }) => payload,
  },
});

export const { actSetAuth } = authSlice.actions;

export default authSlice.reducer;
