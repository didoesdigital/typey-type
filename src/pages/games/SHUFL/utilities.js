import { shuffle } from "d3-array";

import trimAndSumUniqMetWords from '../../../utils/trimAndSumUniqMetWords';

import {
  hasFewerThan7Letters,
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLetters,
} from "../../../utils/dictEntryPredicates";

// @ts-expect-error TS(7006) FIXME: Parameter 'material' implicitly has an 'any' type.
export const getLevelMaterial = (material, level) =>
  material[level + 2] || material[3];

// @ts-expect-error TS(7006) FIXME: Parameter 'levelMaterial' implicitly has an 'any' ... Remove this comment to see the full error message
export const getRightAnswers = (levelMaterial, pickedWord) =>
  // @ts-expect-error TS(7006) FIXME: Parameter 'prevArr' implicitly has an 'any' type.
  levelMaterial.reduce((prevArr, currentWord) => {
    return [...currentWord.trim()].sort().join("") ===
      [...pickedWord.trim()].sort().join("")
      ? [currentWord.trim(), ...prevArr]
      : prevArr;
  }, []);

// @ts-expect-error TS(7006) FIXME: Parameter 'levelMaterial' implicitly has an 'any' ... Remove this comment to see the full error message
export const pickAWord = (levelMaterial) =>
  shuffle(levelMaterial.slice()).slice(0, 1)[0].trim();

const defaultWords = {
  3: ["was", "her", "out"],
  4: ["them", "when", "more", "your", "than", "time"],
  5: ["their", "might", "place"],
  6: ["course", "turned", "friend"],
};

// @ts-expect-error TS(7006) FIXME: Parameter 'startingMetWordsToday' implicitly has a... Remove this comment to see the full error message
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
          // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          previous[currentWord.length].push(currentWord);
        }

        return previous;
      },
      { 3: [], 4: [], 5: [], 6: [] }
    );

  [3, 4, 5, 6].forEach((wordLength) => {
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (result[wordLength].length < 3) {
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      result[wordLength].push(...defaultWords[wordLength]);
    }
  });

  return result;
};

// @ts-expect-error TS(7006) FIXME: Parameter 'word' implicitly has an 'any' type.
const shuffleLetters = (word) => shuffle(Array.from(word)).join("");

// @ts-expect-error TS(7006) FIXME: Parameter 'pickedWord' implicitly has an 'any' typ... Remove this comment to see the full error message
export const shuffleWord = (pickedWord, rightAnswers) => {
  let shuffleWord = shuffleLetters(pickedWord);
  if (rightAnswers.includes(shuffleWord)) {
    shuffleWord = shuffleLetters(pickedWord);
  }
  return shuffleWord;
};
