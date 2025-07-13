import React, { useEffect, useState } from "react";
import OutboundLink from "../../../components/OutboundLink";

type Props = {
  linkText: string;
  linkUrl: string;
};

const ExternalLink = ({ linkText, linkUrl }: Props) => {
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
      <OutboundLink
        className="no-underline"
        eventLabel={`${text} (external link opens in new tab)`}
        newTabAndIUnderstandTheAccessibilityImplications={true}
        to={url}
      >
        <strong>{text}</strong> (external link opens in new tab)
      </OutboundLink>
    </p>
  );
};

export default ExternalLink;
