import React from "react";
import { shouldShowStroke } from "../../../utils/typey-type";
import { SOURCE_NAMESPACES } from "../../../constant/index.js";

import StrokeTipHidden from "./StrokeTipHidden";
import StrokeTipDiagram from "./StrokeTipDiagram";
import StrokeTipText from "./StrokeTipText";
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
  changeShowStrokesInLesson: () => void;
  currentPhrase: MaterialText;
  currentStroke: Outline;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  showStrokesInLesson: boolean;
  targetStrokeCount: number;
  userSettings: UserSettings;
  repetitionsRemaining: number;
};

const maxOutlinesShown = 35; // number of outlines for "quadruplicate"

export default function StrokeTip({
  changeShowStrokesInLesson,
  currentPhrase,
  currentStroke,
  globalLookupDictionary,
  showStrokesInLesson,
  targetStrokeCount,
  userSettings,
  repetitionsRemaining,
}: Props) {
  const isMultiline = userSettings.upcomingWordsLayout === "multiline";
  const showStroke = shouldShowStroke(
    showStrokesInLesson,
    userSettings.showStrokes,
    repetitionsRemaining,
    userSettings.hideStrokesOnLastRepetition
  );

  const misstrokesJSON = misstrokes as StenoDictionary;

  const currentPhraseOutlines = !(userSettings.showStrokesAsList && showStroke)
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

  return (
    <div className="mb6">
      {showStroke && currentStroke ? (
        <div>
          <div
            className={`stroke-tip${isMultiline ? " flex justify-center" : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              className="visually-hidden"
              aria-hidden={
                userSettings.showStrokesAsDiagrams ? "true" : "false"
              }
            >
              Hint:{" "}
            </span>
            {userSettings.showStrokesAsDiagrams ? (
              <StrokeTipDiagram
                currentStroke={currentStroke}
                diagramSize={userSettings.diagramSize}
                isMultiline={isMultiline}
                stenoLayout={userSettings.stenoLayout}
              />
            ) : (
              <StrokeTipText
                currentStroke={currentStroke}
                isMultiline={isMultiline}
                stenoLayout={userSettings.stenoLayout}
              />
            )}
          </div>
          {!!currentPhraseOutlines && userSettings.showStrokesAsList && (
            <div className={"stroke-tip min-h-160"}>
              <div
                className={`pt1 text-small max-h-120 overflow-y-scroll ${
                  isMultiline ? " mw-408 mx-auto" : ""
                }`}
                style={{ marginRight: isMultiline ? "auto" : "10px" }}
              >
                {currentPhraseOutlines.length < 1 ? (
                  <p
                    className={`mb0 de-emphasized${
                      isMultiline ? " text-center pl3" : ""
                    }`}
                  >
                    No other briefs…
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
          )}
        </div>
      ) : (
        <StrokeTipHidden
          changeShowStrokesInLesson={changeShowStrokesInLesson}
          isMultiline={isMultiline}
          showStrokesInLesson={showStrokesInLesson}
          targetStrokeCount={targetStrokeCount}
        />
      )}
    </div>
  );
}
