import { createSlice } from "@reduxjs/toolkit";
import { createReview, getAllReviews } from "./reviewActions";

const initialState = {
  reviews: [],
  isLoading: false,
  isError: false,
  isCreateLoading: false,
  isCreateError: false,
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

    //! Yeni özel ders ekle
    builder.addCase(createReview.pending, (state) => {
      state.isCreateLoading = true;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.isCreateLoading = false;
      state.isCreateError = false;
      state.reviews.push(action.payload);
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.isCreateLoading = false;
      state.isCreateError = action.payload;
    });
  },
});

export default reviewsSlice.reducer;
