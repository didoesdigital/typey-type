import React, { Component } from "react";
import GoogleAnalytics from "react-ga";

if (process.env.NODE_ENV === "production" && !process.env.REACT_APP_QA) {
  GoogleAnalytics.initialize("UA-113450929-1", { titleCase: false });
} else {
  // GoogleAnalytics.initialize('UA-113450929-2', { debug: true, titleCase: false });
  GoogleAnalytics.initialize("UA-113450929-2", { titleCase: false });
}

const withAnalyticsTracker = (
  WrappedComponent,
  options = { anonymizeIp: true }
) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = process.env.PUBLIC_URL + this.props.location.pathname;
      trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const currentPage = process.env.PUBLIC_URL + this.props.location.pathname;
      const prevPage = process.env.PUBLIC_URL + prevProps.location.pathname;

      if (currentPage !== prevPage) {
        trackPage(currentPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withAnalyticsTracker;
