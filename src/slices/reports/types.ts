export interface CreateReportParams {
  type: string;
  from: Date;
  to: Date;
}

export interface Report {
  id: string;
  type: string;
  data: unknown;
  dateRange: { from: string; to: string };
  createdAt: string;
}

export interface ReportsState {
  reports: Report[];
  loading: boolean;
  downloading: boolean;
  error: string | null;
}
