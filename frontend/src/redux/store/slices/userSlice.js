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

    updateUser: (state, action) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },

    refreshUser: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setUser, updateUser, refreshUser } = userSlice.actions;
export default userSlice.reducer;
