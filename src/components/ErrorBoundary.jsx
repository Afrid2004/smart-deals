import { RotateCcw } from "lucide-react";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      key: 0,
      isRetrying: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      isRetrying: true,
      key: prev.key + 1,
    }));

    setTimeout(() => {
      this.setState({
        isRetrying: false,
      });
    }, 1000);
  };

  render() {
    const spin = (
      <div className="w-5 h-5 border-2 border-white border-t-white/30 border-r-white/30 rounded-full animate-spin"></div>
    );

    if (this.state.isRetrying) {
      return (
        <div className="flex items-center justify-center flex-col py-5">
          <button
            disabled
            className="px-4 py-2 bg-gray-800 text-white rounded flex items-center gap-2 mx-auto"
          >
            {spin}
            Retrying...
          </button>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center flex-col py-10">
          <p className="text-gray-800 mb-3 text-xl">
            {this.props.fallback || "Something went wrong!"}
          </p>

          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-gray-800 cursor-pointer hover:bg-gray-900 duration-75 text-white rounded flex items-center gap-2 mx-auto"
          >
            Retry <RotateCcw className="w-5 shrink-0" />
          </button>
        </div>
      );
    }

    return (
      <React.Fragment key={this.state.key}>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default ErrorBoundary;
