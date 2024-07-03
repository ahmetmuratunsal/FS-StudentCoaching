import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getAllStudent,
  getAllTeacher,
  getOneUser,
} from "./userActions";

const initialState = {
  students: [],
  teachers: [],
  isStudentLoading: false,
  isStudentError: false,
  isTeacherLoading: false,
  isTeacherError: false,
  user: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Bütün öğrencileri al
    builder.addCase(getAllStudent.pending, (state) => {
      state.isStudentLoading = true;
    });
    builder.addCase(getAllStudent.fulfilled, (state, action) => {
      state.isStudentLoading = false;
      state.isStudentError = false;
      state.students = action.payload;
    });
    builder.addCase(getAllStudent.rejected, (state, action) => {
      state.isStudentLoading = false;
      state.isStudentError = action.payload;
    });

    //! Bütün öğretmenleri al
    builder.addCase(getAllTeacher.pending, (state) => {
      state.isTeacherLoading = true;
    });
    builder.addCase(getAllTeacher.fulfilled, (state, action) => {
      state.isTeacherLoading = false;
      state.isTeacherError = false;
      state.teachers = action.payload;
    });
    builder.addCase(getAllTeacher.rejected, (state, action) => {
      state.isTeacherLoading = false;
      state.isTeacherError = action.payload;
    });

    //! Tek bir kullanıcıyı al
    builder.addCase(getOneUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(getOneUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! Kullanıcı ekle
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      //TODO BURASI YAPILMADI YAPILACAK
      state.students.unshift(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default userSlice.reducer;
