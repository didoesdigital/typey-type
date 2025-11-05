import type { MetWords } from "../types";

function removeWhitespaceAndSumUniqMetWords(metWords: MetWords) {
  const mungedUniqWords: { [key: string]: number } = {};
  for (const [metWord, timesSeen] of Object.entries(metWords)) {
    const removedWhitespaceWord = metWord.replace(/\s/g, "");
    if (mungedUniqWords[removedWhitespaceWord]) {
      mungedUniqWords[removedWhitespaceWord] += timesSeen;
    } else {
      mungedUniqWords[removedWhitespaceWord] = timesSeen;
    }
  }
  return mungedUniqWords;
}

export default removeWhitespaceAndSumUniqMetWords;
