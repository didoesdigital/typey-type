import GoogleAnalytics from "react-ga";
import React from "react";

type Props = {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  eventLabel: string;
  to: string;
};

const OutboundLink = ({
  children,
  className,
  eventLabel,
  "aria-label": ariaLabel,
  style,
  to,
}: Props) => {
  return (
    <GoogleAnalytics.OutboundLink
      eventLabel={eventLabel}
      aria-label={ariaLabel}
      className={className}
      style={style}
      to={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </GoogleAnalytics.OutboundLink>
  );
};

export default OutboundLink;
