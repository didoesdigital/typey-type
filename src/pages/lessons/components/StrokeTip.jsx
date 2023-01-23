import React from "react";
import {
  shouldShowStroke,
} from "../../../utils/typey-type";

import StrokeTipHidden from "./StrokeTipHidden";
import StrokeTipDiagram from "./StrokeTipDiagram";

export default function StrokeTip({
  changeShowStrokesInLesson,
  currentStroke,
  showStrokesInLesson,
  targetStrokeCount,
  userSettings,
  repetitionsRemaining,
}) {
  const isMultiline = userSettings.upcomingWordsLayout === "multiline";
  const showStroke = shouldShowStroke(
    showStrokesInLesson,
    userSettings.showStrokes,
    repetitionsRemaining,
    userSettings.hideStrokesOnLastRepetition
  );

  const layoutTypeStyle =
    userSettings.stenoLayout === "stenoLayoutKoreanModernCSteno"
      ? " heavy-type-face--korean"
      : userSettings.stenoLayout === "stenoLayoutJapaneseSteno"
      ? " type-face--japanese"
      : "";

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
              isMultiline={isMultiline}
              currentStroke={currentStroke}
              stenoLayout={userSettings.stenoLayout}
              diagramSize={userSettings.diagramSize}
            />
          ) : (
            <div className={"db" + layoutTypeStyle}>
              <pre
                className={`overflow-auto mw-408 text-small${
                  isMultiline ? " flex" : ""
                }`}
              >
                <span
                  className="steno-stroke pa05 text-small"
                  aria-label={[...currentStroke].join(" ").replace("-", "dash")}
                >
                  {[...currentStroke].map((item, i) => (
                    <React.Fragment key={i}>{item}</React.Fragment>
                  ))}
                </span>
              </pre>
            </div>
          )}
        </div>
      ) : (
        <StrokeTipHidden
          isMultiline={isMultiline}
          showStrokesInLesson={showStrokesInLesson}
          changeShowStrokesInLesson={changeShowStrokesInLesson}
          targetStrokeCount={targetStrokeCount}
        />
      )}
    </div>
  );
}
