import * as Sentry from "@sentry/browser";
import React, { Component } from "react";

// To test this component out, throw an error in the child component that the boundary wraps:
// constructor () {
// super()
// throw new Error('This is an error')
// }

type State = {
  hasError: boolean;
  disabledCookieError: boolean;
};

type Props = {
  vanish?: boolean;
  relative?: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, disabledCookieError: false };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });

    let disabledCookieError = false;

    if (
      error.name === "SecurityError" &&
      ((error.message.includes("localStorage") &&
        error.message.includes("Access is denied for this document")) ||
        error.message === "The operation is insecure.")
    ) {
      disabledCookieError = true;
    }

    if (disabledCookieError) {
      this.setState({ disabledCookieError: true });
      Sentry.captureException(error);
      Sentry.captureMessage("Possibly disabled cookie error: " + info);
    } else {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError && this.state.disabledCookieError) {
      return (
        <main id="main">
          <div className="mh-page">
            <div className="center-all">
              <h1>You have cookies disabled</h1>
              <p>
                Typey Type uses local storage to keep track of your steno
                settings and progress. It won’t work with cookies blocked.
                Please enable cookies and <a href=".">refresh the page</a>. —Di
              </p>
            </div>
          </div>
        </main>
      );
    } else if (this.state.hasError && this.props.vanish) {
      return null;
    } else if (this.state.hasError && this.props.relative) {
      return (
        <div className="mt3">
          <p>
            Sorry, Typey Type hit an error. I’ve been notified and will look
            into this as soon as I can. Meanwhile, try{" "}
            <a href=".">refresh the page</a>. Thanks for your patience. —Di
          </p>
        </div>
      );
    } else if (this.state.hasError) {
      return (
        <main id="main">
          <div className="mh-page">
            <div className="center-all">
              <p>
                Sorry, Typey Type hit an error. I’ve been notified and will look
                into this as soon as I can. Meanwhile, try{" "}
                <a href=".">refresh the page</a>. Thanks for your patience. —Di
              </p>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
