import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestion } from "./questionActions";

const initialState = {
  questions: [],
  isLoading: false,
  isError: false,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Özel derse ait bütün yorumları al
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
  },
});

export default questionSlice.reducer;
