import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs, fetchJobDetails } from "./thunks";

interface Job {
  id: string;
  jobType: string;
  assetId: string;
  assetName: string;
  status: "pending" | "running" | "completed" | "failed";
  startedAt: string;
  completedAt: string;
  durationMs: number;
  error: string;
  metadata: unknown;
  createdAt: string;
  log_count: number;
}

interface JobLog {
  id: string;
  step: string;
  message: string;
  createdAt: string;
}

interface JobsState {
  jobs: Job[];
  currentJob: {
    job: Job | null;
    logs: JobLog[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  currentJob: {
    job: null,
    logs: [],
  },
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentJob: (state) => {
      state.currentJob = { job: null, logs: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = {
          job: action.payload,
          logs: action.payload.logs || [],
        };
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentJob } = jobsSlice.actions;
export default jobsSlice.reducer;
