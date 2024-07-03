import { createSlice } from "@reduxjs/toolkit";
import { getAllMeetings, getOneMeeting } from "./meetingActions";

const initialState = {
  meetings: [],
  isLoading: false,
  isError: false,
  isCreateLoading: false,
  isCreateError: false,
  isDeleteLoading: false,
  isDeleteError: false,
  meeting: {},
};

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Bütün randevuları al
    builder.addCase(getAllMeetings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMeetings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.meetings = action.payload;
    });
    builder.addCase(getAllMeetings.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //! Tek bir meeting al
    builder.addCase(getOneMeeting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.meeting = action.payload;
    });
    builder.addCase(getOneMeeting.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default meetingSlice.reducer;
