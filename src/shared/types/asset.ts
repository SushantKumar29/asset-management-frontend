import type { Asset } from "@/slices/assets/types";
import type { User } from "@/slices/auth/types";

export interface AssetPreviewProps {
  asset: Asset;
  user: User | null;
  onDelete: () => void;
}

export interface AssetTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  asset: Asset;
  usageStats: {
    views: number;
    downloads: number;
    uniqueUsers: number;
  } | null;
}

export interface AssetMetadataProps {
  asset: Asset;
  tags: Array<{ id: string; name: string }> | null;
}
