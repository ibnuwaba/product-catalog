
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mb-6 text-gray-600">
            An unexpected error occurred. Please try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700"
          >
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
