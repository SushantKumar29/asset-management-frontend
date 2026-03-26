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
import StatsCards from "@/components/dashboard/StatsCards";
import Loader from "@/shared/ui/Loader";
import { CardSkeleton } from "@/shared/ui/CardSkeleton";
import { ErrorFallback } from "@/shared/ui/ErrorFallback";

const PopularAssets = lazy(() => import("@/components/dashboard/PopularAssets"));
// const RecentActivity = lazy(
// 	() => import("@/components/dashboard/RecentActivity"),
// );

const QuickActions = lazy(() => import("@/components/dashboard/QuickActions"));

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    summary,
    typeDistribution,
    popularAssets,
    // recentActivity,
    loading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

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
      <div className="mx-auto max-w-7xl px-4 py-8">
        <DashboardHeader userName={user?.name} />
        <StatsCards summary={summary} distribution={typeDistribution} />

        {/* Popular Assets - with proper error boundary */}
        <div className="mt-8">
          <ErrorBoundary
            fallback={({ error, resetErrorBoundary }) => (
              <ErrorFallback
                error={error}
                resetErrorBoundary={resetErrorBoundary}
                title="Failed to load popular assets"
              />
            )}
            onError={(error) => console.error("PopularAssets error:", error)}
          >
            <Suspense fallback={<CardSkeleton />}>
              <PopularAssets assets={popularAssets} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* {recentActivity && (
					<div className='mt-8'>
						<ErrorBoundary
							fallback={
								<ComponentErrorFallback
									error={new Error()}
									resetErrorBoundary={() => {}}
								/>
							}
						>
							<Suspense fallback={<CardSkeleton />}>
								<RecentActivity activities={recentActivity} />
							</Suspense>
						</ErrorBoundary>
					</div>
				)} */}

        <div className="mt-8">
          <ErrorBoundary
            fallback={({ error, resetErrorBoundary }) => (
              <ErrorFallback
                error={error}
                resetErrorBoundary={resetErrorBoundary}
                title="Failed to load quick actions"
              />
            )}
          >
            <Suspense fallback={<CardSkeleton />}>
              <QuickActions />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
