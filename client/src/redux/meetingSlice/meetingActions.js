import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün randevuları alma
export const getAllMeetings = createAsyncThunk(
  "meetings/getAllMeetings",
  async (parametre, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/meeting`, { params: parametre });
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);

//* async şekilde tek bir randevu alma
export const getOneMeeting = createAsyncThunk(
  "meetings/getOneMeeting",
  async (id, { rejectWithValue }) => {
    try {
      // apiden cevap geldiyse return ile slicea gönder
      const res = await api.get(`/meeting/${id}`);
      return res.data;
    } catch (err) {
      // API'den gelen hatayı rejectWithValue ile slice'a gönder
      return rejectWithValue(err.response.data);
    }
  }
);
