import React, { useEffect } from "react";
import OutboundLink from "../../../../components/OutboundLink";
import { useAnnouncerApi } from "../../../../components/Announcer/useAnnouncer";

export const hasSedSaid = (currentPhrase: string, actualText: string) => {
  const sedRegex = new RegExp(/^\s*sed\s*$/);
  // Note: doesn't bother checking for "said,", assuming this is more of an issue for early steno
  // students that have not yet reached story lessons
  return currentPhrase === "said" && actualText.match(sedRegex);
};

type Props = {
  currentPhrase: any;
  actualText: string;
};

const SedSaidPrompt = ({ currentPhrase, actualText }: Props) => {
  const showSedSaidPrompt = hasSedSaid(currentPhrase, actualText);
  const { updateMessage } = useAnnouncerApi();

  useEffect(() => {
    if (showSedSaidPrompt) {
      updateMessage(
        "It looks like you might be using an older Plover dictionary. Try upgrading to V3 or newer dictionaries from the link in the message below."
      );
    }
  }, [showSedSaidPrompt, updateMessage]);

  if (showSedSaidPrompt) {
    return (
      <p>
        It looks like you might be using an older Plover dictionary. Try{" "}
        <OutboundLink
          eventLabel="Open steno project upgrade V3 dictionaries"
          newTabAndIUnderstandTheAccessibilityImplications={true}
          to="https://plover.wiki/index.php/Updating_V3_Dictionaries"
        >
          Upgrading V3 Dictionaries (opens in new tab)
        </OutboundLink>
      </p>
    );
  } else {
    return null;
  }
};

export default SedSaidPrompt;
