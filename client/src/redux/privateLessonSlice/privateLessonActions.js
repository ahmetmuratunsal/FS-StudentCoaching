import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* async şekilde bütün özel dersleri alma
export const getPrivateLessons = createAsyncThunk(
  "privatelesson/getPrivateLesson",
  async (query) => {
    const res = await api.get(`/privatelesson?search=${query}`);

    return res.data.privateLessons;
  }
);
