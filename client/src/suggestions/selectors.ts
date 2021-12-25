import type { RootState } from '../lib/store';
import { suggestionsAdapter } from './slice';

export const {
  selectById: selectSuggestionById,
} = suggestionsAdapter.getSelectors((state: RootState) => state.suggestions);
