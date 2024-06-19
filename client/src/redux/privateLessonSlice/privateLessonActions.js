import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün özel dersleri alma
export const getAllPrivateLessons = createAsyncThunk(
  "privatelesson/getAllPrivateLessons",
  async (parametre, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/privatelesson`, { params: parametre });
      return res.data.privateLessons;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);

//* async şekilde bütün özel dersleri alma
export const getPrivateLesson = createAsyncThunk(
  "privatelesson/getPrivateLesson",
  async (id, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/privatelesson/${id}`);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);
