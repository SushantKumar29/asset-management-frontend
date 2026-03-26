import { createSlice } from "@reduxjs/toolkit";
import { fetchAssetSummary, fetchAssetsByType, fetchPopularAssets } from "./thunks";

interface AnalyticsState {
  summary: {
    total_assets: number;
    pending: number;
    processed: number;
    failed: number;
    total_size_bytes: number;
    unique_types: number;
    total_views: number;
    total_downloads: number;
    unique_viewers: number;
    unique_downloaders: number;
  } | null;
  typeDistribution: Array<{
    type: string;
    count: number;
    total_size: number;
    total_views: number;
    total_downloads: number;
    unique_viewers: number;
  }> | null;
  popularAssets: Array<{
    id: string;
    name: string;
    mime_type: string;
    status: string;
    file_size: number;
    views: number;
    downloads: number;
    unique_viewers: number;
    unique_downloaders: number;
    total_usage: number;
  }> | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  summary: null,
  typeDistribution: null,
  popularAssets: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
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

      .addCase(fetchAssetsByType.fulfilled, (state, action) => {
        state.typeDistribution = action.payload;
      })
      .addCase(fetchAssetsByType.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchPopularAssets.fulfilled, (state, action) => {
        state.popularAssets = action.payload;
      })
      .addCase(fetchPopularAssets.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
