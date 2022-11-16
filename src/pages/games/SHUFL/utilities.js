import { shuffle } from "d3-array";

import trimAndSumUniqMetWords from '../../../utils/trimAndSumUniqMetWords';

import {
  hasFewerThan7Letters,
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLetters,
} from "../../../utils/dictEntryPredicates";

export const getLevelMaterial = (material, level) =>
  material[level + 2] || material[3];

export const getRightAnswers = (levelMaterial, pickedWord) =>
  levelMaterial.reduce((prevArr, currentWord) => {
    return [...currentWord.trim()].sort().join("") ===
      [...pickedWord.trim()].sort().join("")
      ? [currentWord.trim(), ...prevArr]
      : prevArr;
  }, []);

export const pickAWord = (levelMaterial) =>
  shuffle(levelMaterial.slice()).slice(0, 1)[0].trim();

const defaultWords = {
  3: ["was", "her", "out"],
  4: ["them", "when", "more", "your", "than", "time"],
  5: ["their", "might", "place"],
  6: ["course", "turned", "friend"],
};

export const selectMaterial = (startingMetWordsToday) => {
  if (!startingMetWordsToday) return defaultWords;
  const result = Object.keys(trimAndSumUniqMetWords(startingMetWordsToday))
    .filter(
      (translation) =>
        hasFewerThan7Letters(translation) &&
        hasMoreThan2Letters(translation) &&
        hasNoRepeatLetters(translation) &&
        hasOnlyLowercaseLetters(translation)
    )
    .reduce(
      (previous, currentWord) => {
        if (currentWord.length >= 3 && currentWord.length <= 6) {
          previous[currentWord.length].push(currentWord);
        }

        return previous;
      },
      { 3: [], 4: [], 5: [], 6: [] }
    );

  [3, 4, 5, 6].forEach((wordLength) => {
    if (result[wordLength].length < 3) {
      result[wordLength].push(...defaultWords[wordLength]);
    }
  });

  return result;
};

const shuffleLetters = (word) => shuffle(Array.from(word)).join("");

export const shuffleWord = (pickedWord, rightAnswers) => {
  let shuffleWord = shuffleLetters(pickedWord);
  if (rightAnswers.includes(shuffleWord)) {
    shuffleWord = shuffleLetters(pickedWord);
  }
  return shuffleWord;
};
