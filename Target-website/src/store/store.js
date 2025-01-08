import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
