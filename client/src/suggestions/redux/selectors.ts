import { RootState } from '../../lib/store';

export function selectList(state: RootState) {
  return state.suggestions.list;
}
