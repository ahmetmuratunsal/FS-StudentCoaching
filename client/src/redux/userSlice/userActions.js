import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün öğrencileri alma
export const getAllStudent = createAsyncThunk(
  "users/getAllStudent",
  async (parametre, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/user/student`, { params: parametre });
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);

//* async şekilde bütün öğretmenleri alma
export const getAllTeacher = createAsyncThunk(
  "users/getAllTeacher",
  async (parametre, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/user/teacher`, { params: parametre });
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);

//* async şekilde bir tane kullanıcıyı alma
export const getOneUser = createAsyncThunk(
  "users/getOneUser",
  async (id, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/user/${id}`);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);

//* async şekilde yeni kullanıcı oluştur
export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.post(`/user`, newUser);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);
