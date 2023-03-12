import React, { useEffect } from "react";
import GoogleAnalytics from "react-ga";
import { useHistory, useLocation } from "react-router-dom";

if (process.env.NODE_ENV === "production" && !process.env.REACT_APP_QA) {
  GoogleAnalytics.initialize("UA-113450929-1", { titleCase: false });
} else {
  // GoogleAnalytics.initialize('UA-113450929-2', { debug: true, titleCase: false });
  GoogleAnalytics.initialize("UA-113450929-2", { titleCase: false });
}

const withAnalyticsTracker = (
  WrappedComponent: any,
  options = { anonymizeIp: true }
) => {
  const trackPage = (page: Location["pathname"]) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = () => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
      const page = process.env.PUBLIC_URL + location.pathname;
      trackPage(page);
    }, [location.pathname]);

    return <WrappedComponent location={location} history={history} />;
  };

  return HOC;
};

export default withAnalyticsTracker;
