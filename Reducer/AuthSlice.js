import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        // Set cookie for server-side authentication
        document.cookie = "isLoggedIn=true; path=/; max-age=86400"; // 24 hours
      }
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
        // Clear login cookie
        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;