import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { SuggestionResponse } from '@t/response';
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
  },
});

export default suggestionsSlice.reducer;
