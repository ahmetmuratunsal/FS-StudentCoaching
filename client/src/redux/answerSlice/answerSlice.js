import { createSlice } from "@reduxjs/toolkit";
import { createAnswer, getAllAnswer, getOneAnswer } from "./answerActions";

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
      state.answer = action.payload;
    });
    builder.addCase(getAllAnswer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! Tek bir cevabı al
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

    //! Cevap ekle
    builder.addCase(createAnswer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.answer.unshift(action.payload);
    });
    builder.addCase(createAnswer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default answerSlice.reducer;
