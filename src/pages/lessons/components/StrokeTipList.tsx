import React from "react";
import SOURCE_NAMESPACES from "../../../constant/sourceNamespaces";

import LookupResultsOutlinesAndDicts from "../../../components/LookupResultsOutlinesAndDicts";
import createListOfStrokes from "../../../utils/createListOfStrokes";
import rankOutlines from "../../../utils/transformingDictionaries/rankOutlines/rankOutlines";
import misstrokes from "../../../json/misstrokes.json";
import { AffixList } from "../../../utils/affixList";

import type {
  LookupDictWithNamespacedDictsAndConfig,
  MaterialText,
  Outline,
  StenoDictionary,
  UserSettings,
} from "../../../types";

type Props = {
  isMultiline: boolean;
  currentPhrase: MaterialText;
  currentStroke: Outline;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  showStroke: boolean;
  userSettings: UserSettings;
};

const maxOutlinesShown = 35; // number of outlines for "quadruplicate"

const StrokeTipList = ({
  isMultiline,
  currentPhrase,
  currentStroke,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  showStroke,
  userSettings,
}: Props) => {
  const misstrokesJSON = misstrokes as StenoDictionary;

  const currentPhraseOutlines = !(
    userSettings.showStrokesAsList &&
    showStroke &&
    globalLookupDictionaryLoaded
  )
    ? false
    : rankOutlines(
        createListOfStrokes(currentPhrase, globalLookupDictionary),
        misstrokesJSON,
        currentPhrase,
        AffixList.getSharedInstance()
      ).filter(
        ([outline, _dictName, dictNamespace]) =>
          (dictNamespace === SOURCE_NAMESPACES.get("user") ||
            !(
              misstrokesJSON[outline] &&
              currentPhrase === misstrokesJSON[outline]
            )) &&
          outline !== currentStroke
      );

  return !!currentPhraseOutlines && userSettings.showStrokesAsList ? (
    <div className={"stroke-tip min-h-160"}>
      <div
        className={`pt1 text-small max-h-120 overflow-y-scroll ${
          isMultiline ? " mw-408 mx-auto" : ""
        }`}
        style={{ marginRight: isMultiline ? "auto" : "10px" }}
      >
        {currentPhraseOutlines.length < 1 ? (
          <p
            className={`mb0 de-emphasized${isMultiline ? " text-center" : ""}`}
          >
            No other hints…
          </p>
        ) : (
          <LookupResultsOutlinesAndDicts
            listOfStrokesAndDicts={currentPhraseOutlines.slice(
              0,
              maxOutlinesShown
            )}
            stenoLayout={userSettings.stenoLayout}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default StrokeTipList;
