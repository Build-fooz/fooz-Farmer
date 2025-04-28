import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import analyticsReducer from './slices/analyticsSlice';
import productReducer from './slices/productSlice';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  analytics: analyticsReducer,
  products: productReducer,
});

export default rootReducer; 