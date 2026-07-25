import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface User {
  id: string;
  username: string;
  email: string;
}


interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authInitialized: boolean;
}


const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  authInitialized: false,
};


const authSlice = createSlice({

  name: "auth",

  initialState,


  reducers: {


    login(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) {

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.authInitialized = true;


      localStorage.setItem(
        "token",
        action.payload.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
    },



    initializeAuth(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) {

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.authInitialized = true;

    },



    finishAuthInitialization(state) {

      state.authInitialized = true;

    },



    logout(state) {

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authInitialized = true;


      localStorage.removeItem("token");
      localStorage.removeItem("user");

    },

  },

});


export const {
  login,
  initializeAuth,
  finishAuthInitialization,
  logout,
} = authSlice.actions;


export default authSlice.reducer;