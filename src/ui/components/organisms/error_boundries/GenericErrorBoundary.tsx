import React from "react";
import { AppLog } from "utils/Util";

export class GenericErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    AppLog.bug(error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
