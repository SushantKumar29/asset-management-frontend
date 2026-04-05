export interface UsageStat {
  views: number;
  downloads: number;
  uniqueUsers: number;
}
export interface UsageState {
  usageStats: UsageStat | null;
  loading: boolean;
  error: string | null;
}
