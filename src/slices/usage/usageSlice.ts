import { createSlice } from "@reduxjs/toolkit";
import { fetchAssetUsage } from "./thunks";
import type { UsageState } from "./types";

const initialState: UsageState = {
  usageStats: null,
  loading: false,
  error: null,
};

const usageSlice = createSlice({
  name: "usage",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.usageStats = action.payload.stats || null;
      })
      .addCase(fetchAssetUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = usageSlice.actions;
export default usageSlice.reducer;
