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

const maxOutlinesShown = 10;

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

  const currentPhraseOutlines = rankOutlines(
    createListOfStrokes(currentPhrase, globalLookupDictionary),
    misstrokesJSON,
    currentPhrase,
    AffixList.getSharedInstance()
  ).filter(
    ([outline, _dictName, dictNamespace]) =>
      (dictNamespace === SOURCE_NAMESPACES.get("user") ||
        !(
          misstrokesJSON[outline] && currentPhrase === misstrokesJSON[outline]
        )) &&
      outline !== currentStroke
  );

  return (
    <div className="mb6">
      {showStroke && currentStroke ? (
        <div
          className={`stroke-tip${isMultiline ? " flex justify-center" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className="visually-hidden"
            aria-hidden={userSettings.showStrokesAsDiagrams ? "true" : "false"}
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
          {!!currentPhraseOutlines && userSettings.showStrokesAsList && (
            <div
              className="pt1 text-small max-h-240 overflow-y-scroll"
              style={{ marginRight: "10px" }}
            >
              {currentPhraseOutlines.length < 1 ? (
                <p className="de-emphasized">No other briefs…</p>
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
