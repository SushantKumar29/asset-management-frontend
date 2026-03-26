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
  createdAt?: string;
}

export interface PopularAssetsProps {
  assets: Array<Asset> | null;
}

export interface UploadFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isUploading: boolean;
}
