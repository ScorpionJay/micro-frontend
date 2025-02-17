/**
 * @author Jay
 * @date 2020-01-01
 * @description error boundary
 */
import React from "react";
import "./style";
class ErrorBoundary extends React.PureComponent {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log("====================================");
    console.log(error, info);
    console.log("====================================");
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="errorPage">
          <h1>页面出错啦</h1>
          <button onClick={() => location.reload()}>刷新页面</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
