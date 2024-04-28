import React from "react";
import { matchSplitText } from "../../utils/typey-type";

import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";

type Props = {
  actualText: any;
  completedPhrases: any;
  currentPhrase: string;
  settings: any;
};

export default function OnePhraseMaterial({
  actualText,
  completedPhrases,
  currentPhrase,
  settings,
}: Props) {
  const userSettings = useAtomValue(userSettingsState);
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
            <div className={currentAndUpcomingPhrasesClasses} data-testid="current-and-upcoming-phrases">
              <strong className="fw7" tabIndex={0} data-testid="current-phrase">
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
