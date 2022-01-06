import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { FeedbackResponse } from '@t/response';
import type { RootState } from '../lib/store';
import votesApi from '../votes/api';
import feedbackApi from './api';

export const feedbackAdapter = createEntityAdapter({
  selectId: (feedback: FeedbackResponse) => feedback.id,
});

const initialState = feedbackAdapter.getInitialState();

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      feedbackApi.endpoints.getSuggestions.matchFulfilled,
      (state, { payload }) => {
        feedbackAdapter.setMany(state, payload);
      },
    );
    builder.addMatcher(
      feedbackApi.endpoints.getFeedbackDetail.matchFulfilled,
      (state, { payload }) => {
        feedbackAdapter.upsertOne(state, payload);
      },
    );
    builder.addMatcher(
      feedbackApi.endpoints.getRoadmap.matchFulfilled,
      (state, { payload }) => {
        feedbackAdapter.setMany(state, payload);
      },
    );
    builder.addMatcher(
      votesApi.endpoints.createVote.matchFulfilled,
      (state, action) => {
        const { originalArgs: feedbackId } = action.meta.arg;
        const feedback = state.entities[feedbackId];
        if (feedback) {
          feedback.hasVoted = true;
          feedback.votes += 1;
        }
      },
    );
    builder.addMatcher(
      votesApi.endpoints.deleteVote.matchFulfilled,
      (state, action) => {
        const { originalArgs: feedbackId } = action.meta.arg;
        const feedback = state.entities[feedbackId];
        if (feedback) {
          feedback.hasVoted = false;
          feedback.votes -= 1;
        }
      },
    );
  },
});

export const {
  selectById: selectFeedbackById,
} = feedbackAdapter.getSelectors((state: RootState) => state.feedback);

export default feedbackSlice.reducer;
