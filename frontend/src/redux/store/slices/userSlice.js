import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    refresh: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    refreshUser: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setUser, refreshUser } = userSlice.actions;
export default userSlice.reducer;
