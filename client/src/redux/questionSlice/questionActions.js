import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün soruları alma
export const getAllQuestion = createAsyncThunk(
  "question/getAllQuestion",
  async (parametre, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/question`, { params: parametre });
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);

//* async şekilde tek bir soruyu alma
export const getOneQuestion = createAsyncThunk(
  "question/getOneQuestion",
  async (id, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/question/${id}`);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);

//* async şekilde tek bir soruyu alma
export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.delete(`/question/${id}`);
      return id;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);
