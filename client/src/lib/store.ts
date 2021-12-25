import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import authReducer from '../auth/slice';
import suggestionsReducer from '../suggestions/slice';
import baseApi from './api';

const combinedReducers = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  suggestions: suggestionsReducer,
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
  }).concat(baseApi.middleware),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducers>;
