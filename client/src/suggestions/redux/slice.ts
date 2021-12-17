import { createSlice } from '@reduxjs/toolkit';

const NAMESPACE = 'suggestions';

const initialState = {
  filters: [],
};

const suggestionsSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetFilters: (state, { payload }) => {
      state.filters = payload;
    },
  },
});

export const { actSetFilters } = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
