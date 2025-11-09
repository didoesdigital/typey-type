import * as React from "react";
import GoogleAnalytics from "react-ga4";

type AnalyticsProps = {
  children: React.ReactElement;
};

GoogleAnalytics.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);

const Analytics = ({ children }: AnalyticsProps) => {
  return <>{children}</>;
};

export default Analytics;
