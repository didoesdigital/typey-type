import React from "react";
import { matchSplitText } from "./../utils/typey-type";

export default function Material({
  actualText,
  completedPhrases,
  currentPhrase,
  settings,
  upcomingPhrases,
  userSettings,
}) {
  const spaceAfterOutput =
    userSettings.spacePlacement === "spaceBeforeOutput" ? "" : " ";
  const spaceBeforeOutput =
    userSettings.spacePlacement === "spaceAfterOutput" ? "" : " ";

  const blur = userSettings.blurMaterial ? " blur" : "";

  const [matched, unmatched] = matchSplitText(
    currentPhrase,
    actualText,
    settings,
    userSettings
  );
  const nextUpcomingMaterial =
    upcomingPhrases.length > 0 ? upcomingPhrases[0] : "";
  const nextUpcomingClasses = `de-emphasized upcoming-phrases bw-2 b--brand-primary-tint--60 ${
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
          <pre className="relative">
        <div className="material mx-auto">
            <div className={"dib current-and-upcoming-phrases" + blur}>
              <strong className="fw7" tabIndex="0">
                {spaceAfterOutput}
                <span className="matched steno-material">{matched}</span>
                <span className="steno-material">{unmatched}</span>
                {spaceBeforeOutput}
              </strong>
              <span className={nextUpcomingClasses}>
                {nextUpcomingMaterial}
              </span>{" "}
              <span className="de-emphasized upcoming-phrases">
                {restUpcomingMaterial}
                {spaceAfterOutput}
              </span>
            </div>
            <span className="dib de-emphasized completed-phrases">
              &#8203;{completedPhrases}
            </span>
          </pre>
        </div>
      </div>
    </div>
  );
}
