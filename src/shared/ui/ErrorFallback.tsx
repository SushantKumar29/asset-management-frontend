import type { ErrorFallbackProps } from "../types/errorBoundary";

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  title = "Failed to load component",
  showRetry = true,
}: ErrorFallbackProps) => (
  <div className="bg-error bg-opacity-10 border border-error rounded-lg p-6">
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
