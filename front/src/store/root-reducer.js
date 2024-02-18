import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const combinedReducers = combineReducers({});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
