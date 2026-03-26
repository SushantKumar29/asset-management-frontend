import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { camelize } from "@/lib/formatters";

export const fetchAssetSummary = createAsyncThunk(
  "analytics/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/analytics/summary");
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch summary");
    }
  }
);

export const fetchAssetsByType = createAsyncThunk(
  "analytics/fetchByType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/analytics/type");
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch type distribution");
    }
  }
);

export const fetchPopularAssets = createAsyncThunk(
  "analytics/fetchPopular",
  async (
    { limit = 10, days = 30 }: { limit?: number; days?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/analytics/popular", {
        params: { limit, days },
      });
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch popular assets");
    }
  }
);
