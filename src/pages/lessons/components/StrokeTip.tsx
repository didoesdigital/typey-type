import React from "react";
import { shouldShowStroke } from "../../../utils/typey-type";
import StrokeTipHidden from "./StrokeTipHidden";
import StrokeTipDiagram from "./StrokeTipDiagram";
import StrokeTipList from "./StrokeTipList";
import StrokeTipText from "./StrokeTipText";

import type {
  LookupDictWithNamespacedDictsAndConfig,
  MaterialText,
  Outline,
} from "../../../types";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../../states/userSettingsState";

type Props = {
  changeShowStrokesInLesson: () => void;
  currentPhrase: MaterialText;
  currentStroke: Outline;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  showStrokesInLesson: boolean;
  targetStrokeCount: number;
  repetitionsRemaining: number;
};

export default function StrokeTip({
  changeShowStrokesInLesson,
  currentPhrase,
  currentStroke,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  showStrokesInLesson,
  targetStrokeCount,
  repetitionsRemaining,
}: Props) {
  const userSettings = useAtomValue(userSettingsState);
  const isMultiline = userSettings.upcomingWordsLayout === "multiline";
  const showStroke = shouldShowStroke(
    showStrokesInLesson,
    userSettings.showStrokes,
    repetitionsRemaining,
    userSettings.hideStrokesOnLastRepetition
  );

  // NOTE: in a custom lesson currentStroke may be "", so the hint behaviour might be weird

  return (
    <div className="mb6">
      {showStroke ? (
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
                currentStroke={currentStroke || ""}
                diagramSize={userSettings.diagramSize}
                isMultiline={isMultiline}
                stenoLayout={userSettings.stenoLayout}
              />
            ) : (
              <StrokeTipText
                currentStroke={currentStroke || ""}
                isMultiline={isMultiline}
                stenoLayout={userSettings.stenoLayout}
              />
            )}
          </div>
          <StrokeTipList
            isMultiline={isMultiline}
            currentPhrase={currentPhrase}
            currentStroke={currentStroke || ""}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            showStroke={showStroke}
            userSettings={userSettings}
          />
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
