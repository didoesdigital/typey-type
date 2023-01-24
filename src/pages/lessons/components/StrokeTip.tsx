import React from "react";
import { shouldShowStroke } from "../../../utils/typey-type";

import StrokeTipHidden from "./StrokeTipHidden";
import StrokeTipDiagram from "./StrokeTipDiagram";
import StrokeTipText from "./StrokeTipText";
import LookupResultsOutlinesAndDicts from "../../../components/LookupResultsOutlinesAndDicts";
import createListOfStrokes from "../../../utils/createListOfStrokes";

import type {
  LookupDictWithNamespacedDictsAndConfig,
  MaterialText,
  Outline,
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

  const currentPhraseOutlines = createListOfStrokes(
    currentPhrase,
    globalLookupDictionary
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
          {!!currentPhraseOutlines && (
            <LookupResultsOutlinesAndDicts
              listOfStrokesAndDicts={currentPhraseOutlines.slice(
                0,
                maxOutlinesShown
              )}
              stenoLayout={userSettings.stenoLayout}
            />
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
