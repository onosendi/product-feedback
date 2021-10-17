import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../lib/store';

const NAMESPACE = 'user';
const initialState = {};

export const userSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetUser: (_, { payload }) => payload,
  },
});

export const { actSetUser } = userSlice.actions;

//
// Selectors
//
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
