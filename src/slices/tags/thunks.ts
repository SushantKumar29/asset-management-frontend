import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { camelize } from "@/lib/formatters";

export const fetchAssetTags = createAsyncThunk(
  "tags/fetchAssetTags",
  async (assetId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/assets/${assetId}/tags`);
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch tags");
    }
  }
);
