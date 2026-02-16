import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 
import officeReducer from '../features/office/officeSlice'; 
import serviceReducer from '../features/service/serviceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    office: officeReducer,   
    service: serviceReducer,     
    // Add more reducers as your app grows, 
  },
});

export default store;