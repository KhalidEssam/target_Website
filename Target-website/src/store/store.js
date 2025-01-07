import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/theme/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
