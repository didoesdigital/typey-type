import GoogleAnalytics from "react-ga";
import React from "react";

type Props = {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  eventLabel: string;
  to: string;
};

const OutboundLink = ({
  children,
  className,
  eventLabel,
  "aria-label": ariaLabel,
  to,
}: Props) => {
  return (
    <GoogleAnalytics.OutboundLink
      eventLabel={eventLabel}
      aria-label={ariaLabel}
      className={className}
      to={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </GoogleAnalytics.OutboundLink>
  );
};

export default OutboundLink;
