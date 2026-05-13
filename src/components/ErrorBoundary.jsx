import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-center text-red-500">
          {this.props.fallback || "Something went wrong!"}
        </p>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
