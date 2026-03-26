export const camelize = <T>(input: T): T => {
  if (input === null || input === undefined || typeof input !== "object") {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => camelize(item)) as T;
  }

  const result: Record<string, unknown> = {};
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const camelKey = key.replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = camelize((input as Record<string, unknown>)[key]);
    }
  }
  return result as T;
};

export const formatBytes = (bytes: number | string) => {
  const num = typeof bytes === "string" ? parseInt(bytes) : bytes;
  if (num === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return parseFloat((num / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatMimeType = (mimeType: string): string => {
  const types = [
    ["image/", "image"],
    ["video/", "video"],
    ["audio/", "audio"],
    ["application/pdf", "document"],
    ["text/", "document"],
    ["document", "document"],
  ];

  for (const [type, assetType] of types) {
    if (mimeType.startsWith(type)) return assetType;
  }

  return "other";
};
