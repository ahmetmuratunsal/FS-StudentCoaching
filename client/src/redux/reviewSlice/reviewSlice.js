import { createSlice } from "@reduxjs/toolkit";
import { getAllReviews } from "./reviewActions";

const initialState = {
  reviews: [],
  isLoading: false,
  isError: false,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Özel derse ait bütün yorumları al
    builder.addCase(getAllReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.reviews = action.payload;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default reviewsSlice.reducer;
