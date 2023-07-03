import React from "react";

type Props = {
  wordCount: number;
};

const WordCount = ({ wordCount }: Props) => (
  <>{`${wordCount} ${wordCount === 1 ? "word" : "words"}`}</>
);

export default WordCount;
