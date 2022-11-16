import type { MetWords } from "../types";

function trimAndSumUniqMetWords(metWords: MetWords) {
  let mungedUniqWords: { [key: string]: number } = {};
  for (const [metWord, timesSeen] of Object.entries(metWords)) {
    let trimmedWord = metWord.trim();
    if (mungedUniqWords[trimmedWord]) {
      mungedUniqWords[trimmedWord] += timesSeen;
    } else {
      mungedUniqWords[trimmedWord] = timesSeen;
    }
  }

  return mungedUniqWords;
}

export default trimAndSumUniqMetWords;
