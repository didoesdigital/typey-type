import { Fragment } from "react";
import SOURCE_NAMESPACES from "../constant/sourceNamespaces";
import TypeyTypeIcon from "components/Icons/icon-images/TypeyTypeIcon.svg";
import Icon from "components/Icons/Icon";

import type {
  StenoLayout,
  StrokeDictNamespaceAndMisstrokeStatus,
} from "../types";

type Props = {
  listOfStrokeDictNamespaceMisstroke: StrokeDictNamespaceAndMisstrokeStatus[];
  stenoLayout: StenoLayout;
};

const LookupResultsOutlinesAndDicts = ({
  listOfStrokeDictNamespaceMisstroke,
  stenoLayout,
}: Props) => {
  let layoutTypeStyle = "";
  if (stenoLayout === "stenoLayoutKoreanModernCSteno") {
    layoutTypeStyle = " heavy-type-face--korean";
  }
  if (stenoLayout === "stenoLayoutJapaneseSteno") {
    layoutTypeStyle = " type-face--japanese";
  }

  const strokeListItems = listOfStrokeDictNamespaceMisstroke.map(
    (strokeAndDict, indexInListOfStrokesAndDicts) => {
      const briefWithSpacesBetweenLetters = [...strokeAndDict[0]]
        .join(" ")
        .replace("-", "dash");

      const stenoBriefKeys = (
        <span
          className="steno-stroke px05 db fw7"
          role="note"
          aria-label={briefWithSpacesBetweenLetters}
        >
          {strokeAndDict[0].split("").map((stenoKey, stenoKeyIndex) => (
            <Fragment key={stenoKeyIndex}>{stenoKey}</Fragment>
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
          className="unstyled-list-item mb1 flex flex-wrap items-baseline gap-y-1"
          key={indexInListOfStrokesAndDicts}
        >
          <div className={"overflow-auto di mw-408 mr1" + layoutTypeStyle}>
            {stenoBriefKeysWithOrWithoutStrongTag}
          </div>
          {strokeAndDict[2] === SOURCE_NAMESPACES.get("typey") ? (
            <Icon
              iconSVGImport={TypeyTypeIcon}
              color="currentColor"
              width="1.5em"
              height="1.5em"
              className="icon mr1"
              style={{ alignSelf: "center" }}
            />
          ) : null}
          <span
            title={
              strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")
                ? strokeAndDict[1]
                : undefined
            }
          >
            {strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")
              ? "Typey Type"
              : strokeAndDict[1]}
          </span>{" "}
          {strokeAndDict[3] === true ? (
            <span className="ml1 px1 bg-magenta-300 dark:bg-coolgrey-800 dark:text-magenta-400">
              Possible misstroke
            </span>
          ) : null}
        </li>
      );
    }
  );
  return listOfStrokeDictNamespaceMisstroke &&
    listOfStrokeDictNamespaceMisstroke.length > 0 ? (
    <ul className="unstyled-list wrap">{strokeListItems}</ul>
  ) : null;
};

export default LookupResultsOutlinesAndDicts;
