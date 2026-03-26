import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import ErrorBoundary from "@/shared/components/ErrorBoundary";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const AssetsPage = lazy(() => import("@/pages/assets/AssetsPage"));
const UploadAssetPage = lazy(() => import("@/pages/assets/UploadAssetPage"));
const ReportsPage = lazy(() => import("@/pages/assets/ReportsPage"));
const AnalyticsPage = lazy(() => import("@/pages/assets/AnalyticsPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
);

const PageErrorFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
      <h2 className="text-xl font-semibold text-red-800 mb-2">Failed to load page</h2>
      <p className="text-red-600 mb-4">There was an error loading this page. Please try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Reload page
      </button>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <ErrorBoundary fallback={<PageErrorFallback />}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/assets/upload" element={<UploadAssetPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
