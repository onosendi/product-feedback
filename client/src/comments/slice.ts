import { createSlice } from '@reduxjs/toolkit';
import type { DBComment } from '@t/database';
import commentsApi from './api';

interface CommentsState {
  [key: string]: DBComment[];
}

const initialState: CommentsState = {};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      commentsApi.endpoints.getComments.matchFulfilled,
      (state, { meta, payload }) => {
        const comment = state;
        const suggestionId = meta.arg.originalArgs;
        comment[suggestionId] = payload;
      },
    );
  },
});

export default suggestionsSlice.reducer;
