import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import {
  authReducer,
  cardsReducer,
  cartReducer,
  inventoryReducer,
  productReducer,
  storeReducer,
  toastReducer,
  userReducer,
} from './slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'carrito'],
};

const combinedReducers = combineReducers({
  auth: authReducer,
  carrito: cartReducer,
  card: cardsReducer,
  user: userReducer,
  inventory: inventoryReducer,
  products: productReducer,
  store: storeReducer,
  toast: toastReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
