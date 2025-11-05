import type { MetWords } from "../types";

function trimAndSumUniqMetWords(metWords: MetWords) {
  const mungedUniqWords: { [key: string]: number } = {};
  for (const [metWord, timesSeen] of Object.entries(metWords)) {
    const trimmedWord = metWord.trim();
    if (mungedUniqWords[trimmedWord]) {
      mungedUniqWords[trimmedWord] += timesSeen;
    } else {
      mungedUniqWords[trimmedWord] = timesSeen;
    }
  }

  return mungedUniqWords;
}

export default trimAndSumUniqMetWords;
