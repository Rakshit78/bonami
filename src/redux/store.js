import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/products.js';
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
