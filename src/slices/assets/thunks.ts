import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import type { Asset } from "./types";
import { camelize } from "@/lib/formatters";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (
    params: {
      status?: string;
      search?: string;
      type?: string;
      limit?: number;
      offset?: number;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/assets", { params });
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch assets");
    }
  }
);

export const fetchAssetById = createAsyncThunk(
  "assets/fetchAssetById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/assets/${id}`);
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch asset");
    }
  }
);

export const uploadAssets = createAsyncThunk(
  "assets/uploadAssets",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post("/assets/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return camelize(res.data.data) || res.data;
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to upload assets");
    }
  }
);

export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/assets/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to delete asset");
    }
  }
);

export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async ({ id, data }: { id: string; data: Partial<Asset> }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/assets/${id}`, data);
      return camelize(res.data.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to update asset");
    }
  }
);
