import React, { useEffect } from "react";
import OutboundLink from "../../../../components/OutboundLink";
import { useAnnouncerApi } from "../../../../components/Announcer/useAnnouncer";

export const hasWordBoundaryError = (
  currentPhrase: string,
  actualText: string
) => {
  return currentPhrase === "wars" && actualText.includes("Star Wars");
};

type Props = {
  currentPhrase: any;
  actualText: string;
};

const WordBoundaryErrorPrompt = ({ currentPhrase, actualText }: Props) => {
  const { updateMessage } = useAnnouncerApi();
  const showWordBoundaryPrompt = hasWordBoundaryError(
    currentPhrase,
    actualText
  );

  useEffect(() => {
    if (showWordBoundaryPrompt) {
      updateMessage(
        "It’s a trap! It looks like you hit a word boundary error. You might avoid this by manually inserting a space between the words star and wars e.g. using S-P. See the message below for a link to more info."
      );
    }
  }, [showWordBoundaryPrompt, updateMessage]);

  if (showWordBoundaryPrompt) {
    return (
      <p>
        It’s a trap! This looks like a{" "}
        <OutboundLink
          eventLabel="Open steno project word boundary error"
          newTabAndIUnderstandTheAccessibilityImplications={true}
          to="https://www.openstenoproject.org/learn-plover/lesson-6-prefix-suffix-alternatives.html"
        >
          word boundary error (link opens in new tab)
        </OutboundLink>
        . You might avoid this by manually inserting a space e.g.{" "}
        <span className="steno-stroke steno-stroke--subtle">STAR/S-P/WARS</span>
      </p>
    );
  } else {
    return null;
  }
};

export default WordBoundaryErrorPrompt;
