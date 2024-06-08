import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/products.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const pconfig = {
  key: 'root',
  version: 1,
  storage,
};
const reducer = combineReducers({
  product: productReducer,
});
const persistReducer1 = persistReducer(pconfig, reducer);
export const store = configureStore({
  reducer: persistReducer1,
});
