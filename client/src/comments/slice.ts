import { createSlice } from '@reduxjs/toolkit';
import type { DBComment } from '@t/database';
import type { RootState } from '../lib/store';
import commentsApi from './api';

interface CommentsState {
  [key: string]: DBComment[];
}

const initialState: CommentsState = {};

const suggestionsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      commentsApi.endpoints.getComments.matchFulfilled,
      (state, { meta, payload }) => {
        const comments = state;
        const suggestionId = meta.arg.originalArgs;
        comments[suggestionId] = payload;
      },
    );
    builder.addMatcher(
      commentsApi.endpoints.createComment.matchFulfilled,
      (state, { payload }) => {
        const comments = state;
        const { suggestionId } = payload;
        comments[suggestionId].push(payload);
      },
    );
  },
});

export function selectComments(state: RootState, suggestionId: string) {
  return state.comments[suggestionId] || [];
}

export default suggestionsSlice.reducer;
