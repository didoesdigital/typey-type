import { shuffle } from "d3-array";

import trimAndSumUniqMetWords from "../../../utils/trimAndSumUniqMetWords";

import {
  hasFewerThan7Letters,
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLetters,
} from "../../../utils/dictEntryPredicates";

import type { MetWords } from "types";
import type {
  LevelMaterial,
  SHUFLMaterialByLevel,
} from "pages/games/SHUFL/gameReducer";

export const getLevelMaterial = (
  material: SHUFLMaterialByLevel,
  level: number
): LevelMaterial => {
  // @ts-expect-error can't index by number
  const materialByGivenLevel = material[level + 2];
  return materialByGivenLevel || material[3];
};

export const getRightAnswers = (
  levelMaterial: LevelMaterial,
  pickedWord: string
) =>
  levelMaterial.reduce<LevelMaterial>((prevArr, currentWord) => {
    return [...currentWord.trim()].sort().join("") ===
      [...pickedWord.trim()].sort().join("")
      ? [currentWord.trim(), ...prevArr]
      : prevArr;
  }, []);

export const pickAWord = (levelMaterial: LevelMaterial) =>
  shuffle(levelMaterial.slice()).slice(0, 1)[0].trim();

export const defaultSHUFLMaterialByLevel: SHUFLMaterialByLevel = {
  3: ["was", "her", "out"],
  4: ["them", "when", "more", "your", "than", "time"],
  5: ["their", "might", "place"],
  6: ["course", "turned", "friend"],
};

export const selectMaterial = (startingMetWordsToday: MetWords) => {
  if (!startingMetWordsToday) return defaultSHUFLMaterialByLevel;
  const result = Object.keys(trimAndSumUniqMetWords(startingMetWordsToday))
    .filter(
      (translation) =>
        hasFewerThan7Letters(translation) &&
        hasMoreThan2Letters(translation) &&
        hasNoRepeatLetters(translation) &&
        hasOnlyLowercaseLetters(translation)
    )
    .reduce<SHUFLMaterialByLevel>(
      (previous, currentWord) => {
        if (currentWord.length >= 3 && currentWord.length <= 6) {
          // @ts-expect-error number can't index 3, 4, 5, 6
          const levelWords = previous[currentWord.length];
          levelWords.push(currentWord);
        }

        return previous;
      },
      { 3: [], 4: [], 5: [], 6: [] }
    );

  const availableLevels = [3, 4, 5, 6] as const;
  availableLevels.forEach((wordLength) => {
    if (result[wordLength].length < 3) {
      result[wordLength].push(...defaultSHUFLMaterialByLevel[wordLength]);
    }
  });

  return result;
};

const shuffleLetters = (word: string) => shuffle(Array.from(word)).join("");

export const shuffleWord = (pickedWord: string, rightAnswers: string[]) => {
  let shuffleWord = shuffleLetters(pickedWord);
  if (rightAnswers.includes(shuffleWord)) {
    shuffleWord = shuffleLetters(pickedWord);
  }
  return shuffleWord;
};
