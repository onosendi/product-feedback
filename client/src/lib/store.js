import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from '../user/slice';

const combinedReducers = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  let resultState = { ...state };
  if (action.type === 'user/logout') {
    resultState = {};
  }
  return combinedReducers(resultState, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
