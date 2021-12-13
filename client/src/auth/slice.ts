import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from '../lib/types/redux';
import api from '../lib/api';
import desc from './descriptors';

const NAMESPACE = 'auth';

type AuthState = {
  username?: string,
};
const initialState: AuthState = {};

export const authSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetUser: (state, { payload: username }) => {
      // eslint-disable-next-line no-param-reassign
      state.username = username;
    },
  },
});

export const { actSetUser } = authSlice.actions;

export const loginThunk = (
  username: string,
  password: string,
) => async (dispatch: Dispatch) => {
  await api(desc.login(username, password));
  dispatch(actSetUser(username));
};

export default authSlice.reducer;
