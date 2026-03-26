import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye, Download, TrendingUp, Users, HardDrive, RefreshCw } from "lucide-react";
import {
  fetchAssetSummary,
  fetchAssetsByType,
  fetchPopularAssets,
} from "@/slices/analytics/thunks";
import { clearError } from "@/slices/analytics/analyticsSlice";
import type { AppDispatch, RootState } from "@/app/store";
import toast from "react-hot-toast";
import { formatBytes, formatMimeType } from "@/lib/formatters";
import Loader from "@/shared/ui/Loader";

const AnalyticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { summary, typeDistribution, popularAssets, loading, error } = useSelector(
    (state: RootState) => state.analytics
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchAssetSummary()),
      dispatch(fetchAssetsByType()),
      dispatch(fetchPopularAssets({ limit: 5, days: 30 })),
    ]);
    setRefreshing(false);
  };

  const stats = [
    {
      title: "Total Assets",
      value: summary?.total_assets || 0,
      icon: HardDrive,
      color: "text-link",
      description: "Assets in library",
    },
    {
      title: "Total Views",
      value: summary?.total_views || 0,
      icon: Eye,
      color: "text-link",
      description: "All-time views",
    },
    {
      title: "Total Downloads",
      value: summary?.total_downloads || 0,
      icon: Download,
      color: "text-success",
      description: "All-time downloads",
    },
    {
      title: "Unique Users",
      value: (summary?.unique_viewers || 0) + (summary?.unique_downloaders || 0),
      icon: Users,
      color: "text-warning",
      description: "Total unique users",
    },
  ];

  if (loading && !summary) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <Button variant="outline" onClick={fetchData} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Storage Overview</CardTitle>
            <CardDescription>Total storage usage and asset status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Size</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatBytes(summary?.total_size_bytes || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Asset Status</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-lg font-semibold text-success">{summary?.processed || 0}</p>
                    <p className="text-xs text-muted-foreground">Processed</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-warning">{summary?.pending || 0}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-error">{summary?.failed || 0}</p>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Unique Types</p>
                <p className="text-2xl font-bold text-foreground">{summary?.unique_types || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Performing Assets</CardTitle>
            <CardDescription>Most viewed and downloaded assets</CardDescription>
          </CardHeader>
          <CardContent>
            {popularAssets && popularAssets.length > 0 ? (
              <div className="space-y-4">
                {popularAssets.map((asset) => {
                  const maxUsage = popularAssets[0]?.total_usage || 1;
                  const popularityScore = (asset.total_usage / maxUsage) * 100;

                  return (
                    <div key={asset.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{asset.name}</p>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{formatMimeType(asset.mime_type)}</span>
                          <span>{asset.views} views</span>
                          <span>{asset.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="w-32">
                        <Progress value={popularityScore} className="h-2" />
                        <p className="text-xs text-right mt-1 text-muted-foreground">
                          {asset.total_usage} total
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No asset data available</p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assets by Type</CardTitle>
              <CardDescription>Distribution by file type</CardDescription>
            </CardHeader>
            <CardContent>
              {typeDistribution && typeDistribution.length > 0 ? (
                <div className="space-y-3">
                  {typeDistribution.map((type) => {
                    const maxCount = Math.max(...typeDistribution.map((t) => t.count));
                    const percentage = (type.count / maxCount) * 100;

                    return (
                      <div key={type.type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{type.type}</span>
                          <div className="flex gap-4">
                            <span>{type.count} assets</span>
                            <span className="text-muted-foreground">{type.total_views} views</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No type data available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Views vs Downloads ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Views to Downloads Ratio</span>
                    <span className="font-medium">
                      {summary?.total_views && summary?.total_downloads
                        ? ((summary.total_downloads / summary.total_views) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      summary?.total_views && summary?.total_downloads
                        ? (summary.total_downloads / summary.total_views) * 100
                        : 0
                    }
                    className="h-2"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{summary?.total_views?.toLocaleString()} views</span>
                    <span>{summary?.total_downloads?.toLocaleString()} downloads</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Unique Viewers</span>
                    <span className="font-medium">
                      {summary?.unique_viewers?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Unique Downloaders</span>
                    <span className="font-medium">
                      {summary?.unique_downloaders?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Engagement Rate</span>
                    </div>
                    <span className="text-xl font-bold text-success">
                      {summary?.total_assets
                        ? (
                            (summary.total_views + summary.total_downloads) /
                            summary.total_assets /
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
