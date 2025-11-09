import { Fragment } from "react";

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
          <Fragment key={index}>
            {wordPunctuationOrWhitespace}
          </Fragment>
        );
      if (wordPunctuationOrWhitespace === "\n")
        return (
          <Fragment key={index}>
            <br />
          </Fragment>
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
        <Fragment key={index}>
          {wordPunctuationOrWhitespace}
        </Fragment>
      );
    });

  return <p>{result}</p>;
};

export default YourWordsHighlighted;
