import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import { PageErrorFallback } from "@/shared/ui/ErrorFallback";
import { PATHS } from "@/constants/path";
import Loader from "@/shared/ui/Loader";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const AssetsPage = lazy(() => import("@/pages/assets/AssetsPage"));
const UploadAssetPage = lazy(() => import("@/pages/assets/UploadAssetPage"));
const ReportsPage = lazy(() => import("@/pages/assets/ReportsPage"));
const AnalyticsPage = lazy(() => import("@/pages/assets/AnalyticsPage"));
const AssetDetailsPage = lazy(() => import("@/pages/assets/AssetDetailsPage"));
const AdminJobsPage = lazy(() => import("@/pages/AdminJobsPage"));

const AppRoutes = () => {
  return (
    <ErrorBoundary fallback={<PageErrorFallback />}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={PATHS.root} element={<HomePage />} />
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.signup} element={<SignupPage />} />
          <Route path={PATHS.assets} element={<AssetsPage />} />
          <Route path={PATHS.assetsUpload} element={<UploadAssetPage />} />
          <Route path={PATHS.reports} element={<ReportsPage />} />
          <Route path={PATHS.analytics} element={<AnalyticsPage />} />
          <Route path={PATHS.assetsDetails} element={<AssetDetailsPage />} />
          <Route path={PATHS.jobs} element={<AdminJobsPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
