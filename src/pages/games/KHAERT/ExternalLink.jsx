import React, { useEffect, useState } from "react";
import GoogleAnalytics from "react-ga";

const ExternalLink = ({ linkText, linkUrl }) => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    setText(linkText);
    setUrl(linkUrl);
    // By ignoring prop changes in the dependency array, we ensure each new external link does not
    // re-render and update previous external link, so we can preserve genuine chat history.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className="underline">
      <GoogleAnalytics.OutboundLink
        className="no-underline"
        eventLabel={`${text} (external link opens in new tab)`}
        to={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>{text}</strong> (external link opens in new tab)
      </GoogleAnalytics.OutboundLink>
    </p>
  );
};

export default ExternalLink;
