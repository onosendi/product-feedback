import { createSlice } from '@reduxjs/toolkit';
import type { CommentResponse } from '@t/response';
import type { RootState } from '../lib/store';
import commentsApi from './api';

interface CommentsState {
  [key: string]: CommentResponse[];
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
        const { suggestionCommentParentId, suggestionId } = payload;
        const comments = state[suggestionId];

        if (suggestionCommentParentId) {
          const comment = comments.find((c) => c.id === suggestionCommentParentId);
          if (comment) {
            if (!comment.replies) {
              comment.replies = [];
            }
            comment.replies.push(payload);
          }
        } else {
          comments.push(payload);
        }
      },
    );
  },
});

export function selectComments(state: RootState, suggestionId: string) {
  return state.comments[suggestionId] || [];
}

export default suggestionsSlice.reducer;
