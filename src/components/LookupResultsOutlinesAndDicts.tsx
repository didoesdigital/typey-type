import React from "react";
import SOURCE_NAMESPACES from "../constant/sourceNamespaces";

import type { StrokeAndDictionaryAndNamespace, StenoLayout } from "../types";

type Props = {
  listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[];
  stenoLayout: StenoLayout;
};

const LookupResultsOutlinesAndDicts = ({
  listOfStrokesAndDicts,
  stenoLayout,
}: Props) => {
  let layoutTypeStyle = "";
  if (stenoLayout === "stenoLayoutKoreanModernCSteno") {
    layoutTypeStyle = " heavy-type-face--korean";
  }
  if (stenoLayout === "stenoLayoutJapaneseSteno") {
    layoutTypeStyle = " type-face--japanese";
  }

  const strokeListItems = listOfStrokesAndDicts.map(
    (strokeAndDict, indexInListOfStrokesAndDicts) => {
      const briefWithSpacesBetweenLetters = [...strokeAndDict[0]]
        .join(" ")
        .replace("-", "dash");

      const stenoBriefKeys = (
        <span
          className={
            strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")
              ? "steno-stroke px05 db fw7"
              : "steno-stroke px05 db steno-stroke--subtle"
          }
          role="note"
          aria-label={briefWithSpacesBetweenLetters}
        >
          {strokeAndDict[0].split("").map((stenoKey, stenoKeyIndex) => (
            <React.Fragment key={stenoKeyIndex}>{stenoKey}</React.Fragment>
          ))}
        </span>
      );

      const stenoBriefKeysWithOrWithoutStrongTag =
        strokeAndDict[2] === SOURCE_NAMESPACES.get("typey") ? (
          <strong>{stenoBriefKeys}</strong>
        ) : (
          stenoBriefKeys
        );

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

export default LookupResultsOutlinesAndDicts;
