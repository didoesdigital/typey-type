import React from "react";
import { matchSplitText } from "../../utils/typey-type";

import type { UserSettings } from "../../types";

type Props = {
  actualText: any;
  completedPhrases: any;
  currentPhrase: string;
  settings: any;
  userSettings: UserSettings;
};

export default function OnePhraseMaterial({
  actualText,
  completedPhrases,
  currentPhrase,
  settings,
  userSettings,
}: Props) {
  const [matched, unmatched] = matchSplitText(
    currentPhrase,
    actualText,
    settings,
    userSettings
  );
  const completedPhrasesClasses =
    "dib de-emphasized fw4 left-0 absolute text-right completed-phrases-transform";
  const currentAndUpcomingPhrasesClasses = `dib current-and-upcoming-phrases${
    userSettings.blurMaterial ? " blur-words" : ""
  }`;

  return (
    <div className="mb1 nt1">
      <div className="expected">
        <div className="visually-hidden">
          Matching and unmatching material typed, upcoming words, and previous
          words:
        </div>
        <div className="material mx-auto py1">
          <pre className="relative translateX-10px">
            <span className={completedPhrasesClasses}>
              {completedPhrases.join(" ")}&#8203;
              {userSettings.spacePlacement === "spaceBeforeOutput" ? "" : " "}
            </span>
            <div className={currentAndUpcomingPhrasesClasses}>
              <strong className="fw7" tabIndex={0}>
                <span className="matched steno-material">{matched}</span>
                <span className="steno-material">{unmatched}</span>
              </strong>
            </div>
          </pre>
        </div>
      </div>
    </div>
  );
}
