// TODO: Remove `rootReducer` since auth/logout shouldn't wipe the store
// to its initial state.
import {
  AnyAction,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-cycle
import authApi from '../auth/api';
// eslint-disable-next-line import/no-cycle
import authReducer from '../auth/slice';
// eslint-disable-next-line import/no-cycle
import suggestionsApi from '../suggestions/api';

const combinedReducers = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [suggestionsApi.reducerPath]: suggestionsApi.reducer,
});

function rootReducer(
  state: ReturnType<typeof combinedReducers> | undefined,
  action: AnyAction,
) {
  if (action.type === 'auth/logout') {
    return combinedReducers(undefined, { type: undefined });
  }
  return combinedReducers(state, action);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(
    authApi.middleware,
    suggestionsApi.middleware,
  ),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducers>;
