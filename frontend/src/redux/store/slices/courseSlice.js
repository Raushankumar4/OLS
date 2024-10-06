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
    },

    setMyCourse: (state, action) => {
      state.myCourse = action.payload;
    },

    refreshCourse: (state) => {
      state.refresh = !state.refresh;
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses?.filter(
        (course) => course?._id !== action.payload
      );
    },
  },
});

export const { setCourse, setMyCourse, refreshCourse, deleteCourse } =
  courseSlice.actions;
export default courseSlice.reducer;
