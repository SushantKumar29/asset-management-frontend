import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import {
  fetchAssetSummary,
  fetchAssetTypeDistribution,
  fetchPopularAssets,
  fetchRecentActivity,
} from "@/slices/dashboard/thunks";
import { clearError } from "@/slices/dashboard/dashboardSlice";
import toast from "react-hot-toast";
import ErrorBoundary from "@/shared/components/ErrorBoundary";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Loader from "@/shared/ui/Loader";
import { CardSkeleton } from "@/shared/ui/CardSkeleton";
import { SectionErrorFallback } from "@/shared/ui/ErrorFallback";
import QuickActions from "./dashboard/QuickActions";

const StatsCards = lazy(() => import("@/components/dashboard/StatsCards"));
const PopularAssets = lazy(() => import("@/components/dashboard/PopularAssets"));

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { summary, typeDistribution, popularAssets, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchAssetSummary());
    dispatch(fetchAssetTypeDistribution());
    dispatch(fetchPopularAssets());
    dispatch(fetchRecentActivity());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto container px-4 py-8">
        <DashboardHeader userName={user?.name} />
        <ErrorBoundary
          fallback={({ error, resetErrorBoundary }) => (
            <SectionErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
              title="Failed to load popular assets"
            />
          )}
        >
          <Suspense fallback={<CardSkeleton />}>
            <StatsCards summary={summary} distribution={typeDistribution} />
          </Suspense>
        </ErrorBoundary>
        <QuickActions />

        <div className="mt-8">
          <ErrorBoundary
            fallback={({ error, resetErrorBoundary }) => (
              <SectionErrorFallback
                error={error}
                resetErrorBoundary={resetErrorBoundary}
                title="Failed to load popular assets"
              />
            )}
          >
            <Suspense fallback={<CardSkeleton />}>
              <PopularAssets assets={popularAssets} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
