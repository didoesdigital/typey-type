import type { MetWords } from "../types";

function calculateMemorisedWordCount(metWords: MetWords) {
  const yourMemorisedWordCount =
    Math.round(
      Object.values(metWords).filter((timesSeen) => timesSeen > 29).length
    ) || 0;

  return yourMemorisedWordCount;
}

export default calculateMemorisedWordCount;
