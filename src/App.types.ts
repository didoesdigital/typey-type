import type { AppStateForDescendants } from "AppRoutes";
import type { Attempt, RevisionMaterial } from "types";

export type AppState = AppStateForDescendants & {
  currentPhraseAttempts: Attempt[];
  isGlobalLookupDictionaryLoaded: boolean;
  numberOfMatchedChars: number;
  totalNumberOfMatchedChars: number;
  revisionMaterial: RevisionMaterial;
};

export type BufferEntry = {
  text: string;
  time: number;
  // TODO: this should possibly be optional:
  numberOfMatchedWordsSoFar: number;
  // TODO: this should possibly be optional:
  hintWasShown: boolean;
};

export type OverrunBuffer = BufferEntry[];
export type SideEffectForBuffer = (...args: any[]) => any;
export type SideEffectsForBuffer = SideEffectForBuffer[];
export type GetNewStateAndSideEffectsForBufferReturn = [
  AppState,
  SideEffectsForBuffer
];
