import { AnyAction, combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const storeAndPersistor = { store, persistor };

export type RootState = ReturnType<typeof combinedReducers>;

export default storeAndPersistor;
