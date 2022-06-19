import { shuffle } from "d3-array";

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

export const selectMaterial = (startingMetWordsToday) =>
  Object.keys(startingMetWordsToday)
    .map((word) => word.trim())
    .filter(
      (translation) =>
        hasFewerThan7Letters(translation) &&
        hasMoreThan2Letters(translation) &&
        hasNoRepeatLetters(translation) &&
        hasOnlyLowercaseLetters(translation)
    );

export const shuffleWord = (pickedWord) =>
  shuffle(Array.from(pickedWord)).join("");
