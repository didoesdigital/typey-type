import React, { useEffect } from "react";
import OutboundLink from "../../../../components/OutboundLink";
import { useAnnouncerApi } from "../../../../components/Announcer/useAnnouncer";

export const missingAussieDict = (
  currentStroke: string,
  actualText: string
) => {
  const untranslatedAussieSuffixRegex = new RegExp(/(A\*U|aw)/);
  return (
    (currentStroke.includes("/A*U ") ||
      currentStroke.includes("/A*U/") ||
      currentStroke.endsWith("/A*U")) &&
    actualText.match(untranslatedAussieSuffixRegex)
  );
};

type Props = {
  currentStroke: string;
  actualText: string;
};

const AussieDictPrompt = ({ currentStroke, actualText }: Props) => {
  const { updateMessage } = useAnnouncerApi();

  const isMissingAussieDict = missingAussieDict(currentStroke, actualText);

  useEffect(() => {
    if (isMissingAussieDict) {
      updateMessage(
        "To use /A*U for Aussie spelling, add the Australian dictionary or fingerspell this entry. See the message below for a link to the dictionary."
      );
    }
  }, [isMissingAussieDict, updateMessage]);

  if (isMissingAussieDict) {
    return (
      <p>
        To use <span className="steno-stroke steno-stroke--subtle">/A*U</span>{" "}
        for Aussie spelling, add the{" "}
        <OutboundLink
          eventLabel="dict-en-AU-with-extra-stroke.json dictionary"
          newTabAndIUnderstandTheAccessibilityImplications={true}
          to="https://github.com/didoesdigital/steno-dictionaries#australian-english-dictionaries"
        >
          dict-en-AU-with-extra-stroke.json dictionary (link opens in new tab)
        </OutboundLink>{" "}
        or fingerspell <span className="whitespace-nowrap">this entry</span>.
      </p>
    );
  } else {
    return null;
  }
};

export default AussieDictPrompt;
