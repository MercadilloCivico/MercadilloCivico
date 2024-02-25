import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { authReducer, inventoryReducer, productReducer } from './slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const combinedReducers = combineReducers({
  auth: authReducer,
  products: productReducer,
  inventory: inventoryReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
