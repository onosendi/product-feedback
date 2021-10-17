import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/slice';

const combinedReducers = combineReducers({
  user: userReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'user/logout') {
    return combinedReducers(undefined, { type: undefined });
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
