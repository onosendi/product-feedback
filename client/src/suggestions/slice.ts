import { createSlice } from '@reduxjs/toolkit';
import type { SuggestionsFilterDisplay } from '@t/ui';

interface SuggestionsState {
  filter: SuggestionsFilterDisplay[];
}

const initialState: SuggestionsState = {
  filter: [],
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => payload,
  },
});

export const { setFilter } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
