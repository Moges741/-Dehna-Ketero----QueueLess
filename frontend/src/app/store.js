import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 
import officeReducer from '../features/office/officeSlice'; 
import serviceReducer from '../features/service/serviceSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import queueReducer from '../features/queue/queueSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    office: officeReducer,   
    service: serviceReducer,     
    ticket: ticketReducer,
    queue: queueReducer,
    // Add more reducers as your app grows, 
  },
});

export default store;