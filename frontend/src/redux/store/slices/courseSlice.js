import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    myCourse: [],
  },
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },

    setMyCourse: (state, action) => {
      state.myCourse = action.payload;
    },
  },
});

export const { setCourse, setMyCourse } = courseSlice.actions;
export default courseSlice.reducer;
