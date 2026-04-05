import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { getDownloadsToViewsRatio, getEngagementRate } from "@/lib/utils";
import type { AnalyticSummary } from "@/slices/analytics/types";

export const EngagementMetrics = ({ summary }: { summary: AnalyticSummary | null }) => {
  const {
    totalDownloads = 0,
    totalViews = 0,
    uniqueViewers = 0,
    uniqueDownloaders = 0,
    totalAssets = 0,
  } = summary || {};

  const downloadsToViewsRatio = getDownloadsToViewsRatio(totalDownloads, totalViews);
  const engagementRate = getEngagementRate(totalAssets, totalViews, totalDownloads);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Metrics</CardTitle>
        <CardDescription>Views vs Downloads ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RatioSection
            label="Views to Downloads Ratio"
            value={downloadsToViewsRatio}
            leftLabel={`${totalViews.toLocaleString()} views`}
            rightLabel={`${totalDownloads.toLocaleString()} downloads`}
          />

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Unique Viewers</span>
              <span className="font-medium">{uniqueViewers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Unique Downloaders</span>
              <span className="font-medium">{uniqueDownloaders.toLocaleString()}</span>
            </div>
          </div>

          <EngagementRateSection rate={engagementRate} />
        </div>
      </CardContent>
    </Card>
  );
};

const RatioSection = ({
  label,
  value,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
}) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span className="font-medium">{value.toFixed(1)}%</span>
    </div>
    <Progress value={value} className="h-2" />
    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
  </div>
);

const EngagementRateSection = ({ rate }: { rate: number }) => (
  <div className="pt-4 border-t border-border">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-success" />
        <span className="text-sm">Engagement Rate</span>
      </div>
      <span className="text-xl font-bold text-success">{rate}%</span>
    </div>
  </div>
);
