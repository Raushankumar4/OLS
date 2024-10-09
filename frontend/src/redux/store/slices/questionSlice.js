import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: null,
    refresh: false,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    refreshQuestion: (state) => {
      state.refresh = !state.refresh;
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions?.filter(
        (question) => question?._id !== action.payload
      );
    },
  },
});

export const { setQuestions, refreshQuestion, deleteQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
