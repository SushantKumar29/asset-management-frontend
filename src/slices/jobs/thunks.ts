import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { camelize } from "@/lib/formatters";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (
    { status, limit = 50, offset = 0 }: { status?: string; limit?: number; offset?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, unknown> = { limit, offset };
      if (status) params.status = status;

      const res = await api.get("/worker/jobs", { params });
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch jobs");
    }
  }
);

export const fetchJobDetails = createAsyncThunk(
  "jobs/fetchJobDetails",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/worker/jobs/${jobId}`);
      return camelize(res.data.data || res.data);
    } catch (err) {
      return rejectWithValue((err as Error).message || "Failed to fetch job details");
    }
  }
);
