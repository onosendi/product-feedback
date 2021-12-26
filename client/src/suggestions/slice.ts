import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { SuggestionResponse } from '@t/response';
import type { RootState } from '../lib/store';
import votesApi from '../votes/api';
import suggestionsApi from './api';

export const suggestionsAdapter = createEntityAdapter({
  selectId: (suggestion: SuggestionResponse) => suggestion.id,
});

const initialState = suggestionsAdapter.getInitialState();

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      suggestionsApi.endpoints.getSuggestions.matchFulfilled,
      (state, { payload }) => {
        suggestionsAdapter.setMany(state, payload);
      },
    );
    builder.addMatcher(
      votesApi.endpoints.createVote.matchFulfilled,
      (state, action) => {
        const { originalArgs: suggestionId } = action.meta.arg;
        const suggestion = state.entities[suggestionId];
        if (suggestion) {
          suggestion.hasVoted = true;
          suggestion.votes += 1;
        }
      },
    );
    builder.addMatcher(
      votesApi.endpoints.deleteVote.matchFulfilled,
      (state, action) => {
        const { originalArgs: suggestionId } = action.meta.arg;
        const suggestion = state.entities[suggestionId];
        if (suggestion) {
          suggestion.hasVoted = false;
          suggestion.votes -= 1;
        }
      },
    );
  },
});

export const {
  selectById: selectSuggestionById,
} = suggestionsAdapter.getSelectors((state: RootState) => state.suggestions);

export default suggestionsSlice.reducer;
