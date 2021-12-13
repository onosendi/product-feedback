import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from '../lib/types/redux';
import api from '../lib/api';
import desc from './descriptors';

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

export const loginThunk = (
  username: string,
  password: string,
) => async (dispatch: Dispatch) => {
  const { token } = await api(desc.login(username, password));
  dispatch(actSetAuth({ token, username }));
};

export default authSlice.reducer;
