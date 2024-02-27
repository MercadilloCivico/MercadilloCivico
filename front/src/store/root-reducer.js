import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { authReducer, inventoryReducer, productReducer, storeReducer } from './slices';

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
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
