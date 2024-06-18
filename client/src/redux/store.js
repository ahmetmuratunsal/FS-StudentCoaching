import { configureStore } from "@reduxjs/toolkit";
import privateLessonReducer from "./privateLessonSlice/privateLessonSlice";

export const store = configureStore({
  reducer: {
    privateLesson: privateLessonReducer,
  },
});
