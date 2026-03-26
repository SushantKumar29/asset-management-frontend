import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { camelize } from "@/lib/formatters";

export const fetchAssetSummary = createAsyncThunk(
  "dashboard/fetchAssetSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/analytics/summary");
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch summary");
    }
  }
);

export const fetchAssetTypeDistribution = createAsyncThunk(
  "dashboard/fetchAssetTypeDistribution",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/analytics/type");
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch type distribution");
    }
  }
);

export const fetchPopularAssets = createAsyncThunk(
  "dashboard/fetchPopularAssets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/analytics/popular");
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch popular assets");
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  "dashboard/fetchRecentActivity",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/usage/activity/recent");
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch recent activity");
    }
  }
);
