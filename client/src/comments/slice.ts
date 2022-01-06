import { createSlice } from '@reduxjs/toolkit';
import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import type { RootState } from '../lib/store';
import commentsApi from './api';

interface CommentsState {
  [key: DBId]: CommentResponse[];
}

const initialState: CommentsState = {};

const feedbackSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      commentsApi.endpoints.getComments.matchFulfilled,
      (state, { meta, payload }) => {
        const comments = state;
        const feedbackId = meta.arg.originalArgs;
        comments[feedbackId] = payload;
      },
    );
    builder.addMatcher(
      commentsApi.endpoints.createComment.matchFulfilled,
      (state, { payload }) => {
        const { feedbackCommentParentId, feedbackId } = payload;
        const comments = state[feedbackId];

        if (feedbackCommentParentId) {
          const comment = comments.find((c) => c.id === feedbackCommentParentId);
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

export function selectComments(state: RootState, feedbackId: DBId) {
  return state.comments[feedbackId] || [];
}

export default feedbackSlice.reducer;
