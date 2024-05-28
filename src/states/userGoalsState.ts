import { atomWithStorage } from "jotai/utils";

export const userGoalsState = atomWithStorage("userGoals", { newWords: 15, oldWords: 50 });

