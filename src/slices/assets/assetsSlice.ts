import { createSlice } from "@reduxjs/toolkit";
import { fetchAssets, fetchAssetById, uploadAssets, deleteAsset, updateAsset } from "./thunks";
import type { AssetsState } from "./types";

const initialState: AssetsState = {
  assets: [],
  pagination: {
    total: 0,
    limit: 50,
    offset: 0,
  },
  currentAsset: null,
  loading: false,
  error: null,
  uploadMessage: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAsset: (state) => {
      state.currentAsset = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.assets;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAssetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAsset = action.payload;
      })
      .addCase(fetchAssetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(uploadAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAssets.fulfilled, (state, action) => {
        state.loading = false;
        const { uploaded, message } = action.payload;
        if (uploaded && uploaded.length) {
          state.assets.unshift(...uploaded);
          state.pagination.total += uploaded.length;
        }
        state.uploadMessage = message;
      })
      .addCase(uploadAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = state.assets.filter((asset) => asset.id !== action.payload);
        state.pagination.total -= 1;
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.assets.findIndex((asset) => asset.id === action.payload.id);
        if (index !== -1) {
          state.assets[index] = action.payload;
        }
        if (state.currentAsset?.id === action.payload.id) {
          state.currentAsset = action.payload;
        }
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
