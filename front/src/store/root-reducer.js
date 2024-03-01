import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import {
  authReducer,
  cardsReducer,
  inventoryReducer,
  productReducer,
  storeReducer,
  toastReducer,
  userReducer,
} from './slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const combinedReducers = combineReducers({
  auth: authReducer,
  products: productReducer,
  inventory: inventoryReducer,
  store: storeReducer,
  toast: toastReducer,
  user: userReducer,
  card: cardsReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
