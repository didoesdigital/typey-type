import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';

// To test this component out, throw an error in the child component that the boundary wraps:
// constructor () {
  // super() 
  // throw new Error('This is an error')
// }

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mh-page">
          <div className="center-all">
            <p>Sorry, Typey Type hit an error. I’ve been notified and will look into this as soon as I can. Meanwhile, try <a href=".">refresh the page</a>. Thanks for your patience. —Di</p>
          </div>
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
