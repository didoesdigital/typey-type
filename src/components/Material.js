import React from "react";
import { matchSplitText } from "./../utils/typey-type";

function FormattedText({ children, userSettings }) {
  return userSettings?.upcomingWordsLayout === "multiline" ? (
    <div className="relative">{children}</div>
  ) : (
    <pre className="relative">{children}</pre>
  );
}

export default function Material({
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
        <div className="material mx-auto">
          <FormattedText userSettings={userSettings}>
            <span className="dib de-emphasized completed-phrases">
              {completedPhrases}&#8203;
              {spaceAfterOutput}
            </span>
            <div className={"dib current-and-upcoming-phrases" + blur}>
              <strong className="fw7" tabIndex="0">
                <span className="matched steno-material">{matched}</span>
                <span className="steno-material">{unmatched}</span>
              </strong>
              <span className={nextUpcomingClasses}>
                &#8203;{spaceBeforeOutput}
                {nextUpcomingMaterial}
              </span>{" "}
              <span className="de-emphasized upcoming-phrases">
                {restUpcomingMaterial}
                {spaceAfterOutput}
              </span>
            </div>
          </FormattedText>
        </div>
      </div>
    </div>
  );
}
