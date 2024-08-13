import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userGoalsState = atomWithStorage("userGoals", {
  newWords: 15,
  oldWords: 50,
});

export const oldWordsGoalUnveiledState = atom(false);
export const newWordsGoalUnveiledState = atom(false);
