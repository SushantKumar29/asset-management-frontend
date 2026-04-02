export const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  // Videos
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/webm",
  "video/ogg",
  // Audio
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
  "audio/aac",
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB max
export const MAX_FILE_COUNT = 10; // Max 10 files
export const MAX_TAGS_COUNT = 10; // Max 10 tags

export const USAGE_ACTIONS = {
  view: "view",
  download: "download",
};

export const USAGE_CHANNELS = {
  web: "web",
  mobile: "mobile",
};

export const ASSET_TYPES = {
  image: "image",
  video: "video",
  audio: "audio",
  document: "document",
  other: "other",
};

export const ASSET_STATUSES = {
  pending: "pending",
  processing: "processing",
  processed: "processed",
  failed: "failed",
};
