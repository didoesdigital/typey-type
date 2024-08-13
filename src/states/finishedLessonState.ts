import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const defaultTopSpeedPersonalBest = { wpm: 0 };

export const topSpeedPersonalBestState = atomWithStorage(
  "topSpeedPersonalBest",
  defaultTopSpeedPersonalBest
);

export const newTopSpeedPersonalBestState = atom(false);

export const newTopSpeedTodayState = atom(false);
