import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import persistedReducer from './root-reducer';

const isDevelopment = import.meta.env.MODE === 'development';

const store = configureStore({
  reducer: persistedReducer,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
