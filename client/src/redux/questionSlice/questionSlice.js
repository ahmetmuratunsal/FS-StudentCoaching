import { createSlice } from "@reduxjs/toolkit";
import {
  deleteQuestion,
  getAllQuestion,
  getOneQuestion,
} from "./questionActions";

const initialState = {
  questions: [],
  isLoading: false,
  isError: false,
  oneQuestion: {},
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Bütün soruları al
    builder.addCase(getAllQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.questions = action.payload;
    });
    builder.addCase(getAllQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! Tek bir soruyu al
    builder.addCase(getOneQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.oneQuestion = action.payload;
    });
    builder.addCase(getOneQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! Soruyu sil
    builder.addCase(deleteQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.questions.data = state.questions.data.filter(
        (question) => question._id !== action.payload
      );
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default questionSlice.reducer;
