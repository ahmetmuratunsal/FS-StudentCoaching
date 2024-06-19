import { createSlice } from "@reduxjs/toolkit";
import { getAllPrivateLessons, getPrivateLesson } from "./privateLessonActions";

const initialState = {
  privateLessons: [],
  isLoading: false,
  isError: false,
  onePrivateLesson: {},
};

export const privateLessonSlice = createSlice({
  name: "privateLesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Bütün özel dersleri al
    builder.addCase(getAllPrivateLessons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPrivateLessons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.privateLessons = action.payload;
    });
    builder.addCase(getAllPrivateLessons.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! tek bir özel ders al
    builder.addCase(getPrivateLesson.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPrivateLesson.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.privateLessons = [];
      state.onePrivateLesson = action.payload;
    });
    builder.addCase(getPrivateLesson.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default privateLessonSlice.reducer;
