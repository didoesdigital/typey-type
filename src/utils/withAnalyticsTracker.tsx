import React from "react";
import GoogleAnalytics from "react-ga4";
import { useHistory, useLocation } from "react-router-dom";

if (process.env.NODE_ENV === "production" && !process.env.REACT_APP_QA) {
  GoogleAnalytics.initialize("G-VMN1E6BYC2");
} else {
  // GoogleAnalytics.initialize("G-VMN1E6BYC2", { testMode: true });
  GoogleAnalytics.initialize("G-VMN1E6BYC2");
}

const withAnalyticsTracker = (
  WrappedComponent: any,
  options = { anonymizeIp: true }
) => {
  const HOC = () => {
    const location = useLocation();
    const history = useHistory();

    return <WrappedComponent location={location} history={history} />;
  };

  return HOC;
};

export default withAnalyticsTracker;
