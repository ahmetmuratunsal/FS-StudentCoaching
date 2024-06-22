import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün özel dersleri alma
export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async (privateLessonId, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/review/${privateLessonId}`);
      return res.data.reviews;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);
