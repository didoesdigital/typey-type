import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // Sentry capture here!
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="center-all">
          <p>Sorry, Typey Type hit an error. I’ve been notified and will look into this as soon as I can. Meanwhile, try <a href=".">refresh the page</a>. Thanks for your patience. —Di</p>
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
