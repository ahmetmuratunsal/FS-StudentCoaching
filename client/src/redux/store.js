import { configureStore } from "@reduxjs/toolkit";
import privateLessonReducer from "./privateLessonSlice/privateLessonSlice";
import reviewReducer from "./reviewSlice/reviewSlice";
import questionReducer from "./questionSlice/questionSlice";

export const store = configureStore({
  reducer: {
    privateLesson: privateLessonReducer,
    reviews: reviewReducer,
    question: questionReducer,
  },
});
