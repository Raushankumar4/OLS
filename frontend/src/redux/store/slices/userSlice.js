import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    refresh: false,
    otherUsers: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    updateUser: (state, action) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },

    refreshUser: (state) => {
      state.refresh = !state.refresh;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
  },
});

export const { setUser, updateUser, refreshUser, setOtherUsers } =
  userSlice.actions;
export default userSlice.reducer;
