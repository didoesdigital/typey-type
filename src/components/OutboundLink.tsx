import * as React from "react";
import GoogleAnalytics from "react-ga4";

type Props = {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  eventLabel: string;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
  /** Open new tabs from a link only when necessary, give users control of changes of context, and use link text to give advance warning that a link will open in a new window:
   * - <https://webaim.org/techniques/hypertext/hypertext_links#new_window>
   * - <https://www.w3.org/WAI/WCAG21/Understanding/change-on-request>
   * - <https://www.w3.org/WAI/WCAG21/Techniques/html/H83>
   * - <https://www.w3.org/WAI/WCAG21/Techniques/general/G200>
   */
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

  const safeTo = React.useMemo(() => {
    try {
      const parsedUrl = new URL(to, "https://example.com");

      if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
        return to;
      }

      return undefined;
    } catch {
      return undefined;
    }
  }, [to]);

  const newTabProps = newTabAndIUnderstandTheAccessibilityImplications
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      href={safeTo}
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
