import React from "react";
import { SOURCE_NAMESPACES } from "../constant/index.js";

import type { StrokeAndDictionaryAndNamespace, StenoLayout } from "../types";

type Props = {
  listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[];
  stenoLayout: StenoLayout;
};

const Component = ({ listOfStrokesAndDicts, stenoLayout }: Props) => {
  let layoutTypeStyle = "";
  if (stenoLayout === "stenoLayoutKoreanModernCSteno") {
    layoutTypeStyle = " heavy-type-face--korean";
  }
  if (stenoLayout === "stenoLayoutJapaneseSteno") {
    layoutTypeStyle = " type-face--japanese";
  }

  let strokeListItems = listOfStrokesAndDicts.map(
    (strokeAndDict, indexInListOfStrokesAndDicts) => {
      let classes =
        strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")
          ? "steno-stroke px05 db fw7"
          : "steno-stroke px05 db steno-stroke--subtle";
      let briefWithSpacesBetweenLetters = [...strokeAndDict[0]]
        .join(" ")
        .replace("-", "dash");

      let stenoBriefKeys = (
        <span className={classes} aria-label={briefWithSpacesBetweenLetters}>
          {strokeAndDict[0].split("").map((stenoKey, stenoKeyIndex) => (
            <React.Fragment key={stenoKeyIndex}>{stenoKey}</React.Fragment>
          ))}
        </span>
      );

      let stenoBriefKeysWithOrWithoutStrongTag = stenoBriefKeys;

      if (strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")) {
        stenoBriefKeysWithOrWithoutStrongTag = (
          <strong>{stenoBriefKeys}</strong>
        );
      }

      return (
        <li
          className="unstyled-list-item mb1 flex flex-wrap items-baseline"
          key={indexInListOfStrokesAndDicts}
        >
          <div className={"overflow-auto di mw-408 mr1" + layoutTypeStyle}>
            {stenoBriefKeysWithOrWithoutStrongTag}
          </div>
          <span
            className={
              strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")
                ? ""
                : "de-emphasized"
            }
          >
            {strokeAndDict[1]}
          </span>
        </li>
      );
    }
  );
  return listOfStrokesAndDicts && listOfStrokesAndDicts.length > 0 ? (
    <ul className="unstyled-list wrap">{strokeListItems}</ul>
  ) : null;
};

export default Component;
