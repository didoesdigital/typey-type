import { shuffle } from "d3-array";

import { trimAndSumUniqMetWords } from "../../../utils/typey-type";

import {
  hasFewerThan7Letters,
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLetters,
} from "../../../utils/dictEntryPredicates";

export const getRightAnswers = (material, pickedWord) =>
  material.reduce((prevArr, currentWord) => {
    return [...currentWord.trim()].sort().join("") ===
      [...pickedWord.trim()].sort().join("")
      ? [currentWord.trim(), ...prevArr]
      : prevArr;
  }, []);

export const pickAWord = (filteredMetWords) =>
  shuffle(filteredMetWords.slice()).slice(0, 1)[0].trim();

const defaultWords = [
  "was",
  "her",
  "out",
  "them",
  "when",
  "more",
  "your",
  "than",
  "time",
  "their",
  "might",
  "place",
  "course",
  "turned",
  "friend",
];

export const selectMaterial = (startingMetWordsToday) => {
  const result = Object.keys(
    trimAndSumUniqMetWords(startingMetWordsToday)
  ).filter(
    (translation) =>
      hasFewerThan7Letters(translation) &&
      hasMoreThan2Letters(translation) &&
      hasNoRepeatLetters(translation) &&
      hasOnlyLowercaseLetters(translation)
  );

  if (result.length < 15) {
    result.push(...defaultWords);
  }

  return result;
};

export const shuffleWord = (pickedWord) =>
  shuffle(Array.from(pickedWord)).join("");
