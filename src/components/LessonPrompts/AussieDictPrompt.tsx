import React from "react";
import { IconExternal } from "../Icon";
import { Tooltip } from "react-tippy";
import useAnnounceTooltip from "../../components/Announcer/useAnnounceTooltip";

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
  const announceTooltip = useAnnounceTooltip();
  const isMissingAussieDict = missingAussieDict(currentStroke, actualText);
  if (isMissingAussieDict) {
    return (
      <p>
        To use <span className="steno-stroke steno-stroke--subtle">/A*U</span>{" "}
        for Aussie spelling, add the{" "}
        <a
          href="https://github.com/didoesdigital/steno-dictionaries#australian-english-dictionaries"
          target="_blank"
          rel="noopener noreferrer"
        >
          dict-en-AU-with-extra-stroke.json dictionary
          {/* @ts-ignore */}
          <Tooltip
            title="Opens in a new tab"
            animation="shift"
            arrow="true"
            className=""
            duration="200"
            tabIndex="0"
            tag="span"
            theme="didoesdigital"
            trigger="mouseenter focus click"
            onShow={announceTooltip}
          >
            <IconExternal
              ariaHidden="true"
              role="presentation"
              iconWidth="24"
              iconHeight="24"
              className="ml1 svg-icon-wrapper svg-baseline"
              iconTitle=""
            />
          </Tooltip>
        </a>{" "}
        or fingerspell <span className="whitespace-nowrap">this entry</span>.
      </p>
    );
  } else {
    return null;
  }
};

export default AussieDictPrompt;
