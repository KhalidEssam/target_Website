import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';


const persistConfig = {
  key: 'root', // The key to save the persisted data in localStorage
  storage,
};


const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
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
