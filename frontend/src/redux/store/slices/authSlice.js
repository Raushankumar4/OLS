import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("token"),
  activationToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setActivationToken: (state, action) => {
      state.activationToken = action.payload;
    },
  },
});

export const { login, logout, setActivationToken } = authSlice.actions;
export default authSlice.reducer;
