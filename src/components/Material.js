import React from "react";
import { matchSplitText } from "./../utils/typey-type";

function FormattedText({ children, userSettings }) {
  return userSettings?.upcomingWordsLayout === "multiline" ? (
    <div
      id="js-material-panel"
      className={`relative pr2 pb3 overflow-y-scroll${
        userSettings.spacePlacement === "spaceBeforeOutput" ||
        userSettings.spacePlacement === "spaceAfterOutput"
          ? " translateX-10px"
          : ""
      }`}
      style={{ maxHeight: "80px" }}
    >
      {children}
    </div>
  ) : (
    <pre className="relative translateX-10px">{children}</pre>
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
  const isMultiline = userSettings?.upcomingWordsLayout === "multiline";

  const addSpacing = (input, spacePlacement) =>
    `${spacePlacement === "spaceBeforeOutput" ? " " : ""}${input}${
      spacePlacement === "spaceAfterOutput" ? " " : ""
    }`;

  const separator =
    userSettings.spacePlacement === "spaceBeforeOutput" ||
    userSettings.spacePlacement === "spaceAfterOutput" ? (
      <span className={`separator${isMultiline ? " " : " dib"}`}></span>
    ) : (
      <span className={`separator${isMultiline ? " pre" : " dib"}`}> </span>
    );

  const formattedCompletedPhrases = isMultiline ? (
    <div
      id="formattedCompletedPhrases"
      className="di"
    >
      {completedPhrases.map((phrase, index) => (
        <React.Fragment key={`${index}-${phrase}`}>
          <wbr />
          <div className="di pre">
            {separator}
            <span
              className={`de-emphasized fw4${
                isMultiline ? " " : " text-right"
              }`}
            >
              {addSpacing(phrase, userSettings.spacePlacement)}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  ) :
  (
    <div
      id="formattedCompletedPhrases"
      className="dib absolute completed-phrases-transform left-0 text-right de-emphasized fw4"
    >
      {addSpacing(completedPhrases.join(" "), userSettings.spacePlacement)}
    </div>
  );

  const [matched, unmatched] = matchSplitText(
    currentPhrase,
    actualText,
    settings,
    userSettings
  );

  const formattedCurrentPhrase = (
    <>
      {isMultiline && <wbr />}
      <strong
        id="js-current-phrase"
        className={`fw7${userSettings.blurMaterial ? " blur-words" : ""}${
          isMultiline ? " pre" : " dib"
        }`}
        tabIndex={0}
      >
        {separator}
        <span
          className={`${
            isMultiline ? "" : "dib break-spaces "
          }steno-material matched`}
        >
          {matched}
        </span>
        <span
          className={`${isMultiline ? "" : "dib break-spaces "}steno-material`}
        >
          {unmatched}
        </span>
      </strong>
    </>
  );

  const formattedNextPhrase = (
    <>
      {isMultiline && <wbr />}
      <div className="di pre">
        {separator}
        <span
          className={`${isMultiline ? "" : "dib fw4 "}${
            userSettings.blurMaterial ? "blur-words " : ""
          }de-emphasized bw-2 b--brand-primary-tint--60${
            upcomingPhrases.length > 0 && upcomingPhrases[0].includes(" ")
              ? " bb-dotted"
              : ""
          }`}
        >
          {upcomingPhrases.length > 0
            ? addSpacing(upcomingPhrases[0], userSettings.spacePlacement)
            : ""}
        </span>
      </div>
    </>
  );

  const formattedUpcomingPhrases = isMultiline ? (
    upcomingPhrases.slice(1).map((phrase, index) => (
      <React.Fragment key={`${index}-${phrase}`}>
        {isMultiline && <wbr />}
        <div className="di pre">
          {separator}
          <span
            className={`de-emphasized${
              userSettings.blurMaterial ? " blur-words" : ""
            }`}
          >
            {addSpacing(phrase, userSettings.spacePlacement)}
          </span>
        </div>
      </React.Fragment>
    ))
  ) : (
    <div className="di pre">
      {separator}
      <span
        className={`pre de-emphasized fw4${
          userSettings.blurMaterial ? " blur-words" : ""
        }`}
      >
        {addSpacing(
          upcomingPhrases.slice(1).join(" "),
          userSettings.spacePlacement
        )}
      </span>
    </div>
  );

  return (
    <div className="mb1 nt1 mx-auto">
      <div className="visually-hidden">
        Matching and unmatching material typed, upcoming words, and previous
        words:
      </div>
      <FormattedText userSettings={userSettings}>
        {formattedCompletedPhrases}
        {formattedCurrentPhrase}
        {formattedNextPhrase}
        {formattedUpcomingPhrases}
      </FormattedText>
    </div>
  );
}
