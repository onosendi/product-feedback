import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import authApi from '../auth/api';
import authReducer from '../auth/slice';
import suggestionsApi from '../suggestions/api';
import suggestionsReducer from '../suggestions/slice';
import votesApi from '../votes/api';

const combinedReducers = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  suggestions: suggestionsReducer,
  [suggestionsApi.reducerPath]: suggestionsApi.reducer,
  [votesApi.reducerPath]: votesApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(
    authApi.middleware,
    suggestionsApi.middleware,
    votesApi.middleware,
  ),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducers>;
