import React from "react";
import GoogleAnalytics from "react-ga4";

type Props = {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  eventLabel: string;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
  newTabAndIUnderstandTheAccessibilityImplications?: boolean;
  to: string;
};

const OutboundLink = ({
  children,
  className,
  eventLabel,
  "aria-label": ariaLabel,
  onClick,
  style,
  newTabAndIUnderstandTheAccessibilityImplications,
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

  const newTabProps = newTabAndIUnderstandTheAccessibilityImplications
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : // FIXME: replace this part of the ternary expression with an empty object once new prop is rolled out everywhere
      {
        target: "_blank",
        rel: "noopener noreferrer",
      };

  return (
    <a
      href={to}
      aria-label={ariaLabel}
      className={className}
      onClick={clickHandler}
      style={style}
      {...newTabProps}
    >
      {children}
    </a>
  );
};

export default OutboundLink;
