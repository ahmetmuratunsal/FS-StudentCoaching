import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün cevapları alma
export const getAllAnswer = createAsyncThunk(
  "answer/getAllAnswer",
  async (parametre, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/answer`, { params: parametre });
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);

//* async şekilde bir tane cevabı alma
export const getOneAnswer = createAsyncThunk(
  "answer/getOneAnswer",
  async (id, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/answer/${id}`);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);

//* async şekilde yeni cevap oluştur
export const getCreateAnswer = createAsyncThunk(
  "answer/getCreateAnswer",
  async (newAnswer, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.post(`/answer`, newAnswer);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.statusText);
    }
  }
);
