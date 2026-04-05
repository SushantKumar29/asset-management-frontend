export interface Asset {
  id: string;
  name: string;
  type: string;
  description: string;
  mimeType: string;
  fileSize: number;
  views: number;
  downloads: number;
  status: string;
  path: string;
  checksum: string;
  ownerName: string;
  processingStatus: object;
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PopularAssetsProps {
  assets: Array<Asset> | null;
}

export interface AssetsState {
  assets: Asset[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
  currentAsset: Asset | null;
  loading: boolean;
  error: string | null;
  uploadMessage: string | null;
}
