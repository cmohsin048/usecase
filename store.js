import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Reducer/AuthSlice'

const store = configureStore({
  reducer: {
    auth: authSlice
  }
});

export default store;