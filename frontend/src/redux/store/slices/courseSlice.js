import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: null,
    myCourse: null,
    refresh: false,
    courseLectures: null,
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
    deleteCourseLecture: (state, action) => {
      state.courseLectures = state.courseLectures?.filter(
        (lecture) => lecture?._id !== action.payload
      );
    },

    setCourseLectures: (state, action) => {
      state.courseLectures = action.payload;
    },
  },
});

export const {
  setCourse,
  setMyCourse,
  refreshCourse,
  setCourseLectures,
  deleteCourse,
  deleteCourseLecture,
} = courseSlice.actions;
export default courseSlice.reducer;
