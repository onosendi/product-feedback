import {
  AnyAction,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import authReducer from '../auth/redux/slice';
// eslint-disable-next-line import/no-cycle
import postApiReducer from '../suggestions/redux/api';

const combinedReducers = combineReducers({
  auth: authReducer,
  [postApiReducer.reducerPath]: postApiReducer.reducer,
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
  }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducers>;
