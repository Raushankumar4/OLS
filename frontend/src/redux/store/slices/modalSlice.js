import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toogleModel: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toogleModel } = modalSlice.actions;

export default modalSlice.reducer;
