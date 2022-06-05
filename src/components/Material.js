import React, { useMemo } from "react";
import { matchSplitText } from "./../utils/typey-type";

const addSpacing = (input, spacePlacement) =>
  `${spacePlacement === "spaceBeforeOutput" ? " " : ""}${input}${
    spacePlacement === "spaceAfterOutput" ? " " : ""
  }`;

const keyId = (completedPhrasesLength, index) =>
  `${completedPhrasesLength + index}`;

function FormattedText({ children, userSettings, isMultiline }) {
  return isMultiline ? (
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

export function FormattedCompletedPhrases({
  isMultiline,
  completedPhrases,
  separator,
  spacePlacement,
}) {
  return isMultiline ? (
    <div id="formattedCompletedPhrases" className="di">
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
              {addSpacing(phrase, spacePlacement)}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  ) : (
    <div
      id="formattedCompletedPhrases"
      className="dib absolute completed-phrases-transform left-0 text-right de-emphasized fw4"
    >
      {addSpacing(completedPhrases.join(" "), spacePlacement)}
    </div>
  );
}

export function FormattedCurrentPhrase({
  isMultiline,
  separator,
  matched,
  unmatched,
  blurMaterial,
}) {
  return (
    <>
      {isMultiline && <wbr />}
      <strong
        id="js-current-phrase"
        className={`fw7${blurMaterial ? " blur-words" : ""}${
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
}

export function FormattedNextPhrase({
  isMultiline,
  separator,
  blurMaterial,
  upcomingPhrases,
  addSpacing,
  spacePlacement,
}) {
  return (
    <>
      {isMultiline && <wbr />}
      <div className="di pre">
        {separator}
        <span
          className={`${isMultiline ? "" : "dib fw4 "}${
            blurMaterial ? "blur-words " : ""
          }de-emphasized bw-2 b--brand-primary-tint--60${
            upcomingPhrases.length > 0 && upcomingPhrases[0].includes(" ")
              ? " bb-dotted"
              : ""
          }`}
        >
          {upcomingPhrases.length > 0
            ? addSpacing(upcomingPhrases[0], spacePlacement)
            : ""}
        </span>
      </div>
    </>
  );
}

export function FormattedUpcomingPhrases({
  isMultiline,
  upcomingPhrases,
  separator,
  blurMaterial,
  addSpacing,
  spacePlacement,
  completedPhrasesLength,
}) {
  return isMultiline ? (
    upcomingPhrases.slice(1).map((phrase, index) => (
      <React.Fragment key={keyId(completedPhrasesLength, index)}>
        {isMultiline && <wbr />}
        <div className="di pre">
          {separator}
          <span className={`de-emphasized${blurMaterial ? " blur-words" : ""}`}>
            {addSpacing(phrase, spacePlacement)}
          </span>
        </div>
      </React.Fragment>
    ))
  ) : (
    <div className="di pre">
      {separator}
      <span
        className={`pre de-emphasized fw4${blurMaterial ? " blur-words" : ""}`}
      >
        {addSpacing(upcomingPhrases.slice(1).join(" "), spacePlacement)}
      </span>
    </div>
  );
}

export default function Material({
  actualText,
  completedPhrases,
  currentPhrase,
  settings,
  totalWordCount,
  upcomingPhrases,
  userSettings,
}) {
  const isMultiline = useMemo(
    () =>
      userSettings?.upcomingWordsLayout === "multiline" &&
      totalWordCount < 1000,
    [userSettings.upcomingWordsLayout, totalWordCount]
  );

  const separator = useMemo(
    () =>
      userSettings.spacePlacement === "spaceBeforeOutput" ||
      userSettings.spacePlacement === "spaceAfterOutput" ? (
        <span className={`separator${isMultiline ? " " : " dib"}`}></span>
      ) : (
        <span className={`separator${isMultiline ? " pre" : " dib"}`}> </span>
      ),
    [userSettings.spacePlacement, isMultiline]
  );

  const [matched, unmatched] = useMemo(
    () => matchSplitText(currentPhrase, actualText, settings, userSettings),
    [currentPhrase, actualText, userSettings, settings]
  );

  return (
    <div className="mb1 nt1 mx-auto">
      <div className="visually-hidden">
        Matching and unmatching material typed, upcoming words, and previous
        words:
      </div>
      <FormattedText userSettings={userSettings} isMultiline={isMultiline}>
        <FormattedCompletedPhrases
          isMultiline={isMultiline}
          completedPhrases={completedPhrases}
          separator={separator}
          spacePlacement={userSettings.spacePlacement}
        />
        <FormattedCurrentPhrase
          isMultiline={isMultiline}
          separator={separator}
          matched={matched}
          unmatched={unmatched}
          blurMaterial={userSettings.blurMaterial}
        />
        <FormattedNextPhrase
          isMultiline={isMultiline}
          separator={separator}
          upcomingPhrases={upcomingPhrases}
          addSpacing={addSpacing}
          blurMaterial={userSettings.blurMaterial}
          spacePlacement={userSettings.spacePlacement}
        />
        <FormattedUpcomingPhrases
          isMultiline={isMultiline}
          separator={separator}
          upcomingPhrases={upcomingPhrases}
          addSpacing={addSpacing}
          blurMaterial={userSettings.blurMaterial}
          spacePlacement={userSettings.spacePlacement}
          completedPhrasesLength={completedPhrases.length}
        />
      </FormattedText>
    </div>
  );
}
