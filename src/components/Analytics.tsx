import React from "react";
import GoogleAnalytics from "react-ga4";

type AnalyticsProps = {
  children: React.ReactElement;
};

if (process.env.NODE_ENV === "production" && !process.env.REACT_APP_QA) {
  GoogleAnalytics.initialize("G-VMN1E6BYC2");
} else {
  GoogleAnalytics.initialize("G-45R7RGF4FZ");
}

const Analytics = ({ children }: AnalyticsProps) => {
  return <>{children}</>;
};

export default Analytics;
