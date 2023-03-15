import React from "react";
import GoogleAnalytics from "react-ga4";

type Props = {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  eventLabel: string;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
  to: string;
};

const OutboundLink = ({
  children,
  className,
  eventLabel,
  "aria-label": ariaLabel,
  onClick,
  style,
  to,
}: Props) => {
  const clickHandler: React.MouseEventHandler = (e) => {
    GoogleAnalytics.event({
      category: "Outbound",
      action: "Click",
      label: eventLabel,
    });

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={to}
      aria-label={ariaLabel}
      className={className}
      onClick={clickHandler}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default OutboundLink;
