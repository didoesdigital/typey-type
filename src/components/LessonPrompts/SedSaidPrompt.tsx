import React from "react";
import { IconExternal } from "../Icon";
import { Tooltip } from "react-tippy";

export const hasSedSaid = (currentPhrase: string, actualText: string) => {
  const sedRegex = new RegExp(/^\s*sed\s*$/);
  // Note: doesn't bother checking for "said,", assuming this is more of an issue for early steno
  // students that have not yet reached story lessons
  return currentPhrase === "said" && actualText.match(sedRegex);
};

type Props = {
  currentPhrase: any;
  actualText: string;
  setAnnouncementMessage: () => void;
};

const SedSaidPrompt = ({
  currentPhrase,
  actualText,
  setAnnouncementMessage,
}: Props) => {
  const showSedSaidPrompt = hasSedSaid(currentPhrase, actualText);
  if (showSedSaidPrompt) {
    return (
      <p>
        It looks like you might be using an older Plover dictionary. Try{" "}
        <a
          href="https://github.com/openstenoproject/plover/wiki/Upgrading-V3-Dictionaries"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upgrading{" "}
          <span className="whitespace-nowrap">
            V3 Dictionaries
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
              onShow={setAnnouncementMessage}
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
      </p>
    );
  } else {
    return null;
  }
};

export default SedSaidPrompt;
