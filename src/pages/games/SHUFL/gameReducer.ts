import { actions } from "./gameActions";
import {
  getLevelMaterial,
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./utilities";
import createStrokeHintForPhrase from "../../../utils/transformingDictionaries/createStrokeHintForPhrase";
import type { LookupDictWithNamespacedDicts, MetWords } from "types";

export const roundToWin = 3;
export const levelToWin = 4;

type SHUFLMaterial = {
  3: string[];
  4: string[];
  5: string[];
  6: string[];
};

type SHUFLState = {
  currentHint: string;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  material: Partial<SHUFLMaterial>;
  puzzleText: string;
  rightAnswers: string[];
  gameComplete: boolean;
  levelComplete: boolean;
  level: number;
  roundIndex: number;
};

type SHUFLActionGameRestarted = {
  type: typeof actions.gameRestarted;
  payload: {
    globalLookupDictionary: LookupDictWithNamespacedDicts;
    startingMetWordsToday: MetWords;
  };
};

type SHUFLActionGameStarted = {
  type: typeof actions.gameStarted;
  payload: {
    globalLookupDictionary: LookupDictWithNamespacedDicts;
    startingMetWordsToday: MetWords;
  };
};

type SHUFLActionLevelRestarted = {
  type: typeof actions.levelRestarted;
  payload: {
    globalLookupDictionary: LookupDictWithNamespacedDicts;
    startingMetWordsToday: MetWords;
  };
};

type SHUFLActionRoundCompleted = { type: typeof actions.roundCompleted };

type SHUFLAction =
  | SHUFLActionGameRestarted
  | SHUFLActionGameStarted
  | SHUFLActionLevelRestarted
  | SHUFLActionRoundCompleted;

const initialProgress: Pick<
  SHUFLState,
  "gameComplete" | "levelComplete" | "level" | "roundIndex"
> = {
  gameComplete: false,
  levelComplete: false,
  level: 1,
  roundIndex: 0,
};

const defaultState: Pick<
  SHUFLState,
  | "gameComplete"
  | "levelComplete"
  | "level"
  | "roundIndex"
  | "currentHint"
  | "globalLookupDictionary"
  | "material"
  | "puzzleText"
  | "rightAnswers"
> = {
  ...initialProgress,
  currentHint: "",
  globalLookupDictionary: new Map(),
  material: {},
  puzzleText: "",
  rightAnswers: [],
};

export const initConfig = (state: undefined | SHUFLState): SHUFLState => ({
  ...defaultState,
  ...state,
});

const getGameStartedState = (
  state: SHUFLState,
  action: SHUFLActionGameStarted
) => {
  const material = selectMaterial(action.payload.startingMetWordsToday);
  const firstPickedWord = pickAWord(getLevelMaterial(material, 1));
  const rightAnswers = getRightAnswers(
    getLevelMaterial(material, 1),
    firstPickedWord
  );
  return {
    ...state,
    ...initialProgress,
    globalLookupDictionary: action.payload.globalLookupDictionary,
    material,
    currentHint: createStrokeHintForPhrase(
      firstPickedWord.trim(),
      state.globalLookupDictionary
    ),
    puzzleText: shuffleWord(firstPickedWord, rightAnswers),
    rightAnswers,
  };
};

const getGameRestartedState = (state: SHUFLState) => {
  const pickedWord = pickAWord(getLevelMaterial(state.material, 1));
  const rightAnswers = getRightAnswers(
    getLevelMaterial(state.material, 1),
    pickedWord
  );
  return {
    ...state,
    ...initialProgress,
    currentHint: createStrokeHintForPhrase(
      pickedWord.trim(),
      state.globalLookupDictionary
    ),
    puzzleText: shuffleWord(pickedWord, rightAnswers),
    rightAnswers,
  };
};

const getAllLevelsCompletedState = (state: SHUFLState) => {
  const roundCompletedPickedWord = pickAWord(
    getLevelMaterial(state.material, 1)
  );
  const rightAnswers = getRightAnswers(
    getLevelMaterial(state.material, 1),
    roundCompletedPickedWord
  );
  return {
    ...state,
    ...initialProgress,
    gameComplete: true,
    currentHint: createStrokeHintForPhrase(
      roundCompletedPickedWord.trim(),
      state.globalLookupDictionary
    ),
    rightAnswers,
    puzzleText: shuffleWord(roundCompletedPickedWord, rightAnswers),
  };
};

const getEarlyLevelCompletedState = (state: SHUFLState) => {
  const increasedLevel = state.level + 1;
  const roundCompletedPickedWord = pickAWord(
    getLevelMaterial(state.material, increasedLevel)
  );
  const rightAnswers = getRightAnswers(
    getLevelMaterial(state.material, increasedLevel),
    roundCompletedPickedWord
  );
  return {
    ...state,
    level: increasedLevel,
    levelComplete: true,
    roundIndex: 0,
    currentHint: createStrokeHintForPhrase(
      roundCompletedPickedWord.trim(),
      state.globalLookupDictionary
    ),
    rightAnswers,
    puzzleText: shuffleWord(roundCompletedPickedWord, rightAnswers),
  };
};

const getEarlyRoundCompletedState = (state: SHUFLState) => {
  const roundCompletedPickedWord = pickAWord(
    getLevelMaterial(state.material, state.level)
  );
  const rightAnswers = getRightAnswers(
    getLevelMaterial(state.material, state.level),
    roundCompletedPickedWord
  );
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    currentHint: createStrokeHintForPhrase(
      roundCompletedPickedWord.trim(),
      state.globalLookupDictionary
    ),
    rightAnswers,
    puzzleText: shuffleWord(roundCompletedPickedWord, rightAnswers),
  };
};

export const gameReducer = (state: SHUFLState, action: SHUFLAction) => {
  switch (action?.type) {
    case actions.gameStarted:
      return getGameStartedState(state, action);

    case actions.gameRestarted:
      return getGameRestartedState(state);

    case actions.levelRestarted:
      return { ...state, levelComplete: false };

    case actions.roundCompleted:
      return state.roundIndex + 1 === roundToWin && state.level === levelToWin
        ? getAllLevelsCompletedState(state)
        : state.roundIndex + 1 === roundToWin
        ? getEarlyLevelCompletedState(state)
        : getEarlyRoundCompletedState(state);

    default:
      return state;
  }
};
