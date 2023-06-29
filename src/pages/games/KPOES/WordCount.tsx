import React from "react";

type Props = {
  wordCount: number;
};

const WordCount = ({ wordCount }: Props) => {
  return <p>{`${wordCount} ${wordCount === 1 ? "word" : "words"}`}</p>;
};

export default WordCount;
