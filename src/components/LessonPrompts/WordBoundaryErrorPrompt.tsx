import React from "react";
import { IconExternal } from "../Icon";
import { Tooltip } from "react-tippy";
import useAnnounceTooltip from "../../components/Announcer/useAnnounceTooltip";

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
  const announceTooltip = useAnnounceTooltip();
  const showWordBoundaryPrompt = hasWordBoundaryError(
    currentPhrase,
    actualText
  );
  if (showWordBoundaryPrompt) {
    return (
      <p>
        It’s a trap! It looks like you hit a{" "}
        <a
          href="https://sites.google.com/site/learnplover/lesson-6-prefix-suffix-alternatives"
          target="_blank"
          rel="noopener noreferrer"
        >
          word boundary{" "}
          <span className="whitespace-nowrap">
            error
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
          </span>
        </a>
        . You might avoid this by manually inserting a space e.g.{" "}
        <span className="steno-stroke steno-stroke--subtle">STAR/S-P/WARS</span>
      </p>
    );
  } else {
    return null;
  }
};

export default WordBoundaryErrorPrompt;
