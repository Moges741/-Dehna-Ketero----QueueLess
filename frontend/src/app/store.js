import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer, 
    // Add more reducers as your app grows, 
  },
});

export default store;