import React from "react";

import type { MetWords } from "../../../types";

type Props = {
  metWords: MetWords;
  yourWords: string;
};

const getClassesForWord = (word: string, metWords: MetWords) => {
  // console.log(`${word}: ${metWords[word]}`);
  if (metWords[word] === 1) {
    return "text-green-700";
  }

  if (metWords[word] === 30) {
    return "text-peach-700";
  }

  if (metWords[word] < 30) {
    return "text-violet-600";
  }

  return "";
};

const YourWordsHighlighted = ({ metWords, yourWords }: Props) => {
  return (
    <>
      {yourWords.split(/\s/).map((word) => (
        <span className={getClassesForWord(word, metWords)}>{word} </span>
      ))}
    </>
  );
};

export default YourWordsHighlighted;
