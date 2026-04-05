import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  fetchAssetSummary,
  fetchAssetsByType,
  fetchPopularAssets,
} from "@/slices/analytics/thunks";
import { clearError } from "@/slices/analytics/analyticsSlice";
import type { AppDispatch, RootState } from "@/app/store";
import toast from "react-hot-toast";
import Loader from "@/shared/ui/Loader";
import { useNavigate } from "react-router";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";
import { StatsCards } from "@/components/asset/StatsCards";
import { StorageOverview } from "@/components/asset/StorageOverview";
import { TopAssets } from "@/components/asset/TopAssets";
import { TypeDistribution } from "@/components/asset/TypeDistribution";
import { EngagementMetrics } from "@/components/asset/EngagementMetrics";

const AnalyticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { summary, typeDistribution, popularAssets, loading, error } = useSelector(
    (state: RootState) => state.analytics
  );

  useEffect(() => {
    if (!isAuthenticated) navigate(PATHS.login);
  }, [isAuthenticated, navigate]);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchAssetSummary()),
      dispatch(fetchAssetsByType()),
      dispatch(fetchPopularAssets({ limit: 5, days: 30 })),
    ]);
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (!isAuthenticated) return null;
  if (loading && !summary) return <Loader />;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto container px-4 py-8">
        <BackToPrevious />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <Button variant="outline" onClick={fetchData} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <StatsCards summary={summary} />
        <StorageOverview summary={summary} />
        <TopAssets assets={popularAssets} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TypeDistribution distributions={typeDistribution} />
          <EngagementMetrics summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
