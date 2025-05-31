import type { AppStateForDescendants } from "AppRoutes";
import type { Attempt, PresentedMaterial } from "types";

export type AppState = AppStateForDescendants & {
  currentPhraseAttempts: Attempt[];
  isGlobalLookupDictionaryLoaded: boolean;
  numberOfMatchedChars: number;
  totalNumberOfMatchedChars: number;
  revisionMaterial: PresentedMaterial[];
};
