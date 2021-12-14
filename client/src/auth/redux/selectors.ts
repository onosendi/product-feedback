import { RootState } from '../../lib/store';

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
