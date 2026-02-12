import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';  // Adjust path to your authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, 
    // Add more reducers as your app grows, e.g., otherSlice: otherReducer
  },
});

export default store;