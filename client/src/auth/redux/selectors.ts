import { RootState } from '../../lib/store';

export function selectAuth(state: RootState) {
  return state.auth;
}

export function selectIsAuthenticated(state: RootState) {
  return !!state.auth.token;
}
