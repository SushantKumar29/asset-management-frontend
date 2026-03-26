import { type ErrorInfo } from "react";

export interface ErrorProps {
  children: React.ReactNode;
  fallback?:
    | React.ReactNode
    | ((props: { error: Error; resetErrorBoundary: () => void }) => React.ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  title?: string;
  showRetry?: boolean;
}
