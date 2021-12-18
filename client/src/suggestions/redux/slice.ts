import { createSlice } from '@reduxjs/toolkit';

const NAMESPACE = 'suggestions';

const initialState = {
  detail: {},
  filters: [],
  list: [],
};

const suggestionsSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetDetail: (state, { payload }) => {
      state.detail = payload;
    },
    actSetFilters: (state, { payload }) => {
      state.filters = payload;
    },
    actSetList: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const {
  actSetDetail,
  actSetFilters,
  actSetList,
} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
