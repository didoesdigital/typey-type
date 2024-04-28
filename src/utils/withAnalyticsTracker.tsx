import React from "react";
import GoogleAnalytics from "react-ga4";
import { useHistory, useLocation } from "react-router-dom";

if (process.env.NODE_ENV === "production" && !process.env.REACT_APP_QA) {
  GoogleAnalytics.initialize("G-VMN1E6BYC2");
} else {
  GoogleAnalytics.initialize("G-45R7RGF4FZ");
}

const withAnalyticsTracker = (
  WrappedComponent: React.ComponentType<{location: ReturnType<typeof useLocation>, history: ReturnType<typeof useHistory>}>,
  options = { anonymizeIp: true }
): React.FC<any> => {
  const HOC = (props: {[prop:string]: unknown}) => {
    const location = useLocation();
    const history = useHistory();

    return <WrappedComponent location={location} history={history} {...props} />;
  };

  return HOC;
};

export default withAnalyticsTracker;
