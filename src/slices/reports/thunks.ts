import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { camelize } from "@/lib/formatters";
import type { CreateReportParams } from "./types";

export const createReport = createAsyncThunk(
  "reports/create",
  async (params: CreateReportParams, { rejectWithValue }) => {
    try {
      const res = await api.post("/reports/report", {
        type: params.type, // (usage | performance | compliance | summary)
        from: params.from.toISOString(),
        to: params.to.toISOString(),
      });
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to create report");
    }
  }
);

export const fetchMyReports = createAsyncThunk(
  "reports/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/reports/my-reports");
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch reports");
    }
  }
);

export const downloadReport = createAsyncThunk(
  "reports/download",
  async (reportId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reports/download/${reportId}`, {
        responseType: "blob",
      });
      return { blob: res.data, reportId };
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to download report");
    }
  }
);
