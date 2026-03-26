import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAssetSummary,
  fetchAssetTypeDistribution,
  fetchPopularAssets,
  fetchRecentActivity,
} from "./thunks";
import type { DashboardState } from "./types";

const initialState: DashboardState = {
  summary: null,
  typeDistribution: null,
  popularAssets: null,
  recentActivity: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAssetSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchAssetSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAssetTypeDistribution.fulfilled, (state, action) => {
        state.typeDistribution = action.payload;
      })
      .addCase(fetchAssetTypeDistribution.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchPopularAssets.fulfilled, (state, action) => {
        state.popularAssets = action.payload;
      })
      .addCase(fetchPopularAssets.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
