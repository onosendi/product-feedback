import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/slice';

const combinedReducers = combineReducers({
  auth: authReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'auth/logout') {
    return combinedReducers(undefined, { type: undefined });
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default store;
