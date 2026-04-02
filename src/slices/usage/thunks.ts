import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { camelize } from "@/lib/formatters";

export const fetchAssetUsage = createAsyncThunk(
  "usage/fetchAssetUsage",
  async (assetId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/usage/${assetId}`);
      const data = camelize(res.data.data || res.data);

      let views = 0;
      let downloads = 0;
      let uniqueUsers = 0;

      if (Array.isArray(data)) {
        data.forEach((item: { action: string; count: string; uniqueUsers: string }) => {
          if (item.action === "view") {
            views = parseInt(item.count) || 0;
            uniqueUsers = parseInt(item.uniqueUsers) || 0;
          }
          if (item.action === "download") {
            downloads = parseInt(item.count) || 0;
          }
        });
      }

      return {
        stats: { views, downloads, uniqueUsers },
      };
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch usage");
    }
  }
);

export const trackUsage = createAsyncThunk(
  "usage/trackUsage",
  async (
    {
      assetId,
      action = "view",
      channel = "web",
    }: { assetId: string; action?: string; channel?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(`/usage/${assetId}`, { action, channel });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to track usage");
    }
  }
);
