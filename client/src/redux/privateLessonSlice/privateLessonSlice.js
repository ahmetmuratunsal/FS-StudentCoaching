import { createSlice } from "@reduxjs/toolkit";
import { getPrivateLessons } from "./privateLessonActions";

const initialState = {
  privateLessons: [],
  isLoading: false,
  isError: false,
};

export const privateLessonSlice = createSlice({
  name: "privateLesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrivateLessons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPrivateLessons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.privateLessons = action.payload;
    });
    builder.addCase(getPrivateLessons.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default privateLessonSlice.reducer;
