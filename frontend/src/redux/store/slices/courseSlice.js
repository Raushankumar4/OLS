import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: null,
    myCourse: null,
    refresh: false,
  },
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
      state.refresh = !state.refresh;
    },

    setMyCourse: (state, action) => {
      state.myCourse = action.payload;
    },

    refreshCourse: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setCourse, setMyCourse, refreshCourse } = courseSlice.actions;
export default courseSlice.reducer;
