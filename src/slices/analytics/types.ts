export interface AnalyticSummary {
  totalAssets: number;
  pending: number;
  processed: number;
  failed: number;
  totalSizeBytes: number;
  uniqueTypes: number;
  totalViews: number;
  totalDownloads: number;
  uniqueViewers: number;
  uniqueDownloaders: number;
  uniqueUsers?: number;
}

export interface Distribution {
  type: string;
  count: number;
  totalSize: number;
  totalViews: number;
  totalDownloads: number;
  uniqueViewers: number;
}

export interface PopularAssets {
  id: string;
  name: string;
  mimeType: string;
  status: string;
  fileSize: number;
  views: number;
  downloads: number;
  uniqueViewers: number;
  uniqueDownloaders: number;
  totalUsage: number;
}

export interface AnalyticsState {
  summary: AnalyticSummary | null;
  typeDistribution: Array<Distribution> | null;
  popularAssets: Array<PopularAssets> | null;
  loading: boolean;
  error: string | null;
}
