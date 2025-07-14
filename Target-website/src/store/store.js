import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';
import languageReducer from './features/languageSlice'; // Import language slice
import cartReducer from './features/cartSlice'
import orderReducer from './features/ordersSlice'
import tokenReducer from './features/tokenSlice'

const persistConfig = {
  key: 'root', // The key to save the persisted data in localStorage
  storage,
  whitelist: ['language' , 'theme', 'cart'], 
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  language: languageReducer, // Add language reducer
  cart: cartReducer,
  order:orderReducer,
  token:tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions
      },
    }),
});

export const persistor = persistStore(store);
export default store;
