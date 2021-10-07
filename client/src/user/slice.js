import { createSlice } from '@reduxjs/toolkit';

const NAMESPACE = 'user';
const initialState = {};

export const userSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetUser: (state, { payload }) => payload,
  },
});

export const { actSetUser } = userSlice.actions;

//
// Selectors
//
export const selectUser = (state) => state.user;

export default userSlice.reducer;
