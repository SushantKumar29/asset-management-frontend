export interface Job {
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
  logCount: number;
}

export interface JobLog {
  id: string;
  step: string;
  message: string;
  createdAt: string;
}

export interface JobDetails {
  job: Job | null;
  logs: JobLog[];
}

export interface JobsState {
  jobs: Job[];
  currentJob: JobDetails;
  loading: boolean;
  error: string | null;
}

export interface JobDialogDetailProps {
  detailsOpen: boolean;
  handleCloseDetails(): void;
  currentJob: JobDetails;
}
