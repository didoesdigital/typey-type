import type { MetWords } from "../types";

function removeWhitespaceAndSumUniqMetWords(metWords: MetWords) {
  let mungedUniqWords: { [key: string]: number } = {};
  for (const [metWord, timesSeen] of Object.entries(metWords)) {
    let removedWhitespaceWord = metWord.replace(/\s/g, "");
    if (mungedUniqWords[removedWhitespaceWord]) {
      mungedUniqWords[removedWhitespaceWord] += timesSeen;
    } else {
      mungedUniqWords[removedWhitespaceWord] = timesSeen;
    }
  }
  return mungedUniqWords;
}

export default removeWhitespaceAndSumUniqMetWords;
