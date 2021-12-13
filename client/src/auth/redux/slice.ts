import { createSlice } from '@reduxjs/toolkit';

const NAMESPACE = 'auth';

type AuthState = {
  token: string | null,
  username: string | null,
};
const initialState: AuthState = {
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
