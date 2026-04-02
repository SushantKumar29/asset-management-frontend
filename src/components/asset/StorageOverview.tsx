import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatBytes } from "@/lib/formatters";
import type { AnalyticSummary } from "@/slices/analytics/types";

export const StorageOverview = ({ summary }: { summary: AnalyticSummary | null }) => {
  const {
    totalSizeBytes = 0,
    processed = 0,
    pending = 0,
    failed = 0,
    uniqueTypes = 0,
  } = summary || {};

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Storage Overview</CardTitle>
        <CardDescription>Total storage usage and asset status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Size</p>
            <p className="text-2xl font-bold text-foreground">{formatBytes(totalSizeBytes)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Asset Status</p>
            <div className="flex gap-4">
              <StatusBadge count={processed} label="Processed" color="success" />
              <StatusBadge count={pending} label="Pending" color="warning" />
              <StatusBadge count={failed} label="Failed" color="error" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Unique Types</p>
            <p className="text-2xl font-bold text-foreground">{uniqueTypes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ count, label, color }: { count: number; label: string; color: string }) => (
  <div>
    <p className={`text-lg font-semibold text-${color}`}>{count}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);
