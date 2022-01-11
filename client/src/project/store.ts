import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import authReducer from '../auth/slice';
import commentsReducer from '../comments/slice';
import feedbackReducer from '../feedback/slice';
import baseApi from './api';
import { rtkQueryErrorHandler } from './middleware';
import projectReducer from './slice';

const combinedReducers = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  feedback: feedbackReducer,
  project: projectReducer,
  [baseApi.reducerPath]: baseApi.reducer,
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
    baseApi.middleware,
    rtkQueryErrorHandler,
  ),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
