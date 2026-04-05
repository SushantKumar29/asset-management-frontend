import { createSlice } from "@reduxjs/toolkit";
import { createReport, fetchMyReports, downloadReport } from "./thunks";
import type { ReportsState } from "./types";

const initialState: ReportsState = {
  reports: [],
  loading: false,
  downloading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchMyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(downloadReport.pending, (state) => {
        state.downloading = true;
      })
      .addCase(downloadReport.fulfilled, (state) => {
        state.downloading = false;
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.downloading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = reportsSlice.actions;
export default reportsSlice.reducer;
