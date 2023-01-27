import React from "react";
import { shouldShowStroke } from "../../../utils/typey-type";
import { SOURCE_NAMESPACES } from "../../../constant/index.js";

import StrokeTipHidden from "./StrokeTipHidden";
import StrokeTipDiagram from "./StrokeTipDiagram";
import StrokeTipList from "./StrokeTipList";
import StrokeTipText from "./StrokeTipText";
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
          <StrokeTipList
            isMultiline={isMultiline}
            currentPhrase={currentPhrase}
            currentStroke={currentStroke}
            globalLookupDictionary={globalLookupDictionary}
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
