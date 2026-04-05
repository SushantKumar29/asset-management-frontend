import type { Asset } from "../assets/types";

export interface Summary {
  totalAssets: number;
  pending: number;
  processed: number;
  totalSizeBytes: number;
  failed: number;
  uniqueTypes: number;
}

export interface Activity {
  user: string;
  action: string;
  assetName: string;
  type: string;
  createdAt: string;
}

export interface AssetDistribution {
  type: string;
  count: number;
  percentage: number;
}

export interface DashboardState {
  summary: Summary | null;
  typeDistribution: Array<{
    type: string;
    count: number;
    percentage: number;
  }> | null;
  popularAssets: Array<Asset> | null;
  recentActivity: Array<Activity> | null;
  loading: boolean;
  error: string | null;
}

export interface StatsCardsProps {
  summary: Summary | null;
  distribution: Array<AssetDistribution> | null;
}

export interface AssetDistributionProps {
  distribution: Array<AssetDistribution> | null;
}
