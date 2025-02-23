import type { MetWords } from "../types";

function calculateMemorisedWordCount(metWords: MetWords) {
  const yourMemorisedWordCount =
    Math.round(
      // the 2 below should be restored to 29, 2 is to help debugging
      Object.values(metWords).filter((timesSeen) => timesSeen > 2).length
    ) || 0;

  return yourMemorisedWordCount;
}

export default calculateMemorisedWordCount;
