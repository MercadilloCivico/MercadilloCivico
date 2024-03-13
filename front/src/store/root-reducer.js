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
  providerReducer,
  favoritesReducer,
  adminReducer,
  salesPointReducer,
  salesReducer,
  faqsReducer,
} from './slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'favorites', 'carrito', 'card'],
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
  providers: providerReducer,
  favorites: favoritesReducer,
  admin: adminReducer,
  salesPoint: salesPointReducer,
  ventas: salesReducer,
  faqs: faqsReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
