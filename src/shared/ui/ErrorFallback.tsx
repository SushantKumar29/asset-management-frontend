import type { ErrorFallbackProps } from "../types/errorBoundary";

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  title = "Failed to load component",
  showRetry = true,
}: ErrorFallbackProps) => (
  <div className="bg-opacity-10 border border-error rounded-lg p-6">
    <h3 className="text-error font-medium mb-2">{title}</h3>
    <p className="text-error text-sm mb-3">{error.message || "Something went wrong"}</p>
    {showRetry && (
      <button
        onClick={resetErrorBoundary}
        className="text-link hover:text-link-hover text-sm underline"
      >
        Try again
      </button>
    )}
  </div>
);

export const PageErrorFallback = () => (
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
