import { configureStore } from '@reduxjs/toolkit';
import postSlice from './postSlice';

const store = configureStore({
  reducer: postSlice,
});
export default store;
