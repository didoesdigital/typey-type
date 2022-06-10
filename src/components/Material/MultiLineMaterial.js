import React from "react";
import CurrentMaterialHighlight from "./CurrentMaterialHighlight";
import EntireMaterial from "./EntireMaterial";

export default function MultiLineMaterial({
  actualText,
  completedPhrases,
  currentPhrase,
  settings,
  upcomingPhrases,
  userSettings,
  ...props
}) {
  return (
    <div className="mb1 nt1">
      <div className="expected">
        <div className="visually-hidden">
          Matching and unmatching material typed, upcoming words, and previous
          words:
        </div>
        <div className="material mx-auto">
          <div
            id="js-material-panel"
            className="relative pr2 pb3 overflow-y-scroll"
            style={{ maxHeight: "80px" }}
          >
            <CurrentMaterialHighlight
              currentPhrase={currentPhrase}
              actualText={actualText}
              settings={settings}
              userSettings={userSettings}
              currentPhraseID={props.currentPhraseID}
            />
            <div
              id="js-entire-material-text"
              className="dib de-emphasized fw4 relative"
            >
              <EntireMaterial
                spacePlacement={userSettings.spacePlacement}
                presentedMaterial={props.lesson.presentedMaterial}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
