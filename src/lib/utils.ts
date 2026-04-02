import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    running: "bg-link/10 text-link",
    completed: "bg-success/10 text-success",
    processed: "bg-success/10 text-success",
    failed: "bg-error/10 text-error",
  };
  return styles[status] || "bg-muted text-muted-foreground";
};

export const getEngagementRate = (
  assetCount?: number,
  views?: number,
  downloads?: number
): number =>
  assetCount && views && downloads
    ? Number(((views + downloads) / assetCount / 100).toFixed(1))
    : 0;

export const getDownloadsToViewsRatio = (downloads?: number, views?: number) =>
  downloads && views ? (downloads / views) * 100 : 0;
