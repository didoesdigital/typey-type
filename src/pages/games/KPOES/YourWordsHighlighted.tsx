import React from "react";

import type { MetWords, UserSettings } from "../../../types";

type Props = {
  metWords: MetWords;
  yourWords: string;
  userSettings: UserSettings;
};

const whitespaceRegexWithCaptures = /(\s)/;

const YourWordsHighlighted = ({ metWords, userSettings, yourWords }: Props) => {
  const result = yourWords
    .trim()
    .split(whitespaceRegexWithCaptures)
    .filter(Boolean)
    .map((wordPunctuationOrWhitespace, index, yourSplitWords) => {
      if (wordPunctuationOrWhitespace === " ")
        return (
          <React.Fragment key={index}>
            {wordPunctuationOrWhitespace}
          </React.Fragment>
        );
      if (wordPunctuationOrWhitespace === "\n")
        return (
          <React.Fragment key={index}>
            <br />
          </React.Fragment>
        );

      const typedCount = yourSplitWords.filter(
        (typed) => typed === wordPunctuationOrWhitespace
      ).length;

      const spacedWord =
        userSettings.spacePlacement === "spaceBeforeOutput"
          ? ` ${wordPunctuationOrWhitespace}`
          : userSettings.spacePlacement === "spaceAfterOutput"
          ? `${wordPunctuationOrWhitespace} `
          : wordPunctuationOrWhitespace;

      if (
        !metWords[spacedWord] ||
        (metWords[spacedWord] && typedCount === metWords[spacedWord])
      )
        return (
          <span key={`${index}`} className="highlight-new-word">
            {wordPunctuationOrWhitespace}
          </span>
        );

      if (
        metWords[spacedWord] &&
        (metWords[spacedWord] === 30 ||
          (metWords[spacedWord] > 30 && metWords[spacedWord] - typedCount < 30))
      )
        return (
          <span key={`${index}`} className="highlight-memorised-word">
            {wordPunctuationOrWhitespace}
          </span>
        );

      return (
        <React.Fragment key={index}>
          {wordPunctuationOrWhitespace}
        </React.Fragment>
      );
    });

  return <p>{result}</p>;
};

export default YourWordsHighlighted;
