import React from "react";

import type { MetWords } from "../../../types";

type Props = {
  metWords: MetWords;
  yourWords: string;
};

const nonAlphaRegexWithCaptures = /([^A-Za-z])/;

const YourWordsHighlighted = ({ metWords, yourWords }: Props) => {
  const result = yourWords
    .split(nonAlphaRegexWithCaptures)
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

      if (
        !metWords[wordPunctuationOrWhitespace] ||
        (metWords[wordPunctuationOrWhitespace] &&
          typedCount === metWords[wordPunctuationOrWhitespace])
      )
        return (
          <span key={`${index}`} className="highlight-new-word">
            {wordPunctuationOrWhitespace}
          </span>
        );

      if (
        metWords[wordPunctuationOrWhitespace] &&
        (metWords[wordPunctuationOrWhitespace] === 30 ||
          (metWords[wordPunctuationOrWhitespace] > 30 &&
            metWords[wordPunctuationOrWhitespace] - typedCount < 30))
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
