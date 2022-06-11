import React from "react";
import { matchSplitText } from "./../../utils/typey-type";

export default function SingleLineMaterial({
  actualText,
  completedPhrases,
  currentPhrase,
  settings,
  upcomingPhrases,
  userSettings,
}) {
  const spaceBeforeOutput =
    userSettings.spacePlacement === "spaceAfterOutput" ? "" : " ";
  const spaceAfterOutput =
    userSettings.spacePlacement === "spaceBeforeOutput" ? "" : " ";

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
  const nextUpcomingMaterial =
    upcomingPhrases.length > 0 ? upcomingPhrases[0] : "";
  const nextUpcomingClasses = `de-emphasized fw4 text-left bw-2 b--brand-primary-tint--60 ${
    nextUpcomingMaterial.includes(" ") ? "bb-dotted" : ""
  }`;
  const restUpcomingMaterial =
    upcomingPhrases.length > 1 ? upcomingPhrases.slice(1).join(" ") : "";

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
            </span>
            <div className={currentAndUpcomingPhrasesClasses}>
              <strong className="fw7" tabIndex="0">
                <span className="matched steno-material">{matched}</span>
                <span className="steno-material">{unmatched}</span>
              </strong>
              <span className={nextUpcomingClasses}>
                &#8203;{spaceBeforeOutput}
                {nextUpcomingMaterial}
              </span>{" "}
              <span className="de-emphasized fw4 text-left">
                {restUpcomingMaterial}
                {spaceAfterOutput}
              </span>
            </div>
          </pre>
        </div>
      </div>
    </div>
  );
}
