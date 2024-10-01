import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;
