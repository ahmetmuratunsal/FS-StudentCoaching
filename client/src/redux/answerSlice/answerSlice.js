import { createSlice } from "@reduxjs/toolkit";
import { getAllAnswer, getOneAnswer } from "./answerActions";

const initialState = {
  answer: [],
  isLoading: false,
  isError: false,
  oneAnswer: {},
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Bütün cevapları al
    builder.addCase(getAllAnswer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAnswer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.questions = action.payload;
    });
    builder.addCase(getAllAnswer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! Tek bir soruyu al
    builder.addCase(getOneAnswer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneAnswer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.oneAnswer = action.payload;
    });
    builder.addCase(getOneAnswer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default answerSlice.reducer;
