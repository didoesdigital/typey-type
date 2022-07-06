import { shuffle } from "d3-array";

import { trimAndSumUniqMetWords } from "../../../utils/typey-type";

import {
  hasFewerThan7Letters,
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLetters,
} from "../../../utils/dictEntryPredicates";

export const getLevelMaterial = (material, level) => {
  switch (level) {
    case 1:
      return material.has3Letters;
    case 2:
      return material.has4Letters;
    case 3:
      return material.has5Letters;
    case 4:
      return material.has6Letters;
    default:
      return material.has3Letters;
  }
};

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
  has3Letters: ["was", "her", "out"],
  has4Letters: ["them", "when", "more", "your", "than", "time"],
  has5Letters: ["their", "might", "place"],
  has6Letters: ["course", "turned", "friend"],
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
        switch (currentWord.length) {
          case 3:
            previous.has3Letters.push(currentWord);
            break;
          case 4:
            previous.has4Letters.push(currentWord);
            break;
          case 5:
            previous.has5Letters.push(currentWord);
            break;
          case 6:
            previous.has6Letters.push(currentWord);
            break;

          default:
            break;
        }
        return previous;
      },
      { has3Letters: [], has4Letters: [], has5Letters: [], has6Letters: [] }
    );

  if (result.has3Letters.length < 3) {
    result.has3Letters.push(...defaultWords.has3Letters);
  }
  if (result.has4Letters.length < 3) {
    result.has4Letters.push(...defaultWords.has4Letters);
  }
  if (result.has5Letters.length < 3) {
    result.has5Letters.push(...defaultWords.has5Letters);
  }
  if (result.has6Letters.length < 3) {
    result.has6Letters.push(...defaultWords.has6Letters);
  }

  return result;
};

export const shuffleWord = (pickedWord) =>
  shuffle(Array.from(pickedWord)).join("");
