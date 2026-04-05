import { Component, type ErrorInfo } from "react";
import { SectionErrorFallback } from "@/shared/ui/ErrorFallback";
import type { ErrorProps, ErrorState } from "../types/errorBoundary";

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({
          error: this.state.error!,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SectionErrorFallback
          error={this.state.error!}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
