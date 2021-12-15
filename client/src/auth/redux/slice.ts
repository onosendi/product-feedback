import { createAction, createSlice } from '@reduxjs/toolkit';

const NAMESPACE = 'auth';

interface AuthState {
  role: 'user' | 'admin' | null;
  token: string | null;
  username: string | null;
}

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

export const actLogout = createAction<undefined>(`${NAMESPACE}/logout`);

export const { actSetAuth } = authSlice.actions;

export default authSlice.reducer;
