import { actions } from "./gameActions";
import {
  getLevelMaterial,
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./utilities";
import { createStrokeHintForPhrase } from "../../../utils/transformingDictionaries";

const roundToWin = 3;
const levelToWin = 4;

const initialProgress = {
  gameComplete: false,
  level: 1,
  roundIndex: 0,
};

const defaultState = {
  ...initialProgress,
  currentHint: "",
  globalLookupDictionary: new Map(),
  material: {},
  puzzleText: "",
  rightAnswers: [],
};

export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

const getGameStartedState = (state, action) => {
  const material = selectMaterial(action.payload.startingMetWordsToday);
  const firstPickedWord = pickAWord(getLevelMaterial(material, 1));
  return {
    ...state,
    ...initialProgress,
    globalLookupDictionary: action.payload.globalLookupDictionary,
    material,
    currentHint: createStrokeHintForPhrase(
      firstPickedWord.trim(),
      state.globalLookupDictionary
    ),
    rightAnswers: getRightAnswers(
      getLevelMaterial(material, 1),
      firstPickedWord
    ),
    puzzleText: shuffleWord(firstPickedWord),
  };
};

const getGameRestartedState = (state) => {
  const pickedWord = pickAWord(getLevelMaterial(state.material, 1));
  return {
    ...state,
    ...initialProgress,
    currentHint: createStrokeHintForPhrase(
      pickedWord.trim(),
      state.globalLookupDictionary
    ),
    rightAnswers: getRightAnswers(
      getLevelMaterial(state.material, 1),
      pickedWord
    ),
    puzzleText: shuffleWord(pickedWord),
  };
};

const getAllLevelsCompletedState = (state) => {
  const roundCompletedPickedWord = pickAWord(
    getLevelMaterial(state.material, 1)
  );
  return {
    ...state,
    ...initialProgress,
    gameComplete: true,
    rightAnswers: getRightAnswers(
      getLevelMaterial(state.material, 1),
      roundCompletedPickedWord
    ),
    currentHint: createStrokeHintForPhrase(
      roundCompletedPickedWord.trim(),
      state.globalLookupDictionary
    ),
    puzzleText: shuffleWord(roundCompletedPickedWord),
  };
};

const getEarlyLevelCompletedState = (state) => {
  const increasedLevel = state.level + 1;
  const roundCompletedPickedWord = pickAWord(
    getLevelMaterial(state.material, increasedLevel)
  );
  return {
    ...state,
    level: increasedLevel,
    roundIndex: 0,
    rightAnswers: getRightAnswers(
      getLevelMaterial(state.material, increasedLevel),
      roundCompletedPickedWord
    ),
    currentHint: createStrokeHintForPhrase(
      roundCompletedPickedWord.trim(),
      state.globalLookupDictionary
    ),
    puzzleText: shuffleWord(roundCompletedPickedWord),
  };
};

const getEarlyRoundCompletedState = (state) => {
  const roundCompletedPickedWord = pickAWord(
    getLevelMaterial(state.material, state.level)
  );
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    rightAnswers: getRightAnswers(
      getLevelMaterial(state.material, state.level),
      roundCompletedPickedWord
    ),
    currentHint: createStrokeHintForPhrase(
      roundCompletedPickedWord.trim(),
      state.globalLookupDictionary
    ),
    puzzleText: shuffleWord(roundCompletedPickedWord),
  };
};

export const gameReducer = (state, action) => {
  switch (action?.type) {
    case actions.gameStarted:
      return getGameStartedState(state, action);

    case actions.gameRestarted:
      return getGameRestartedState(state, action);

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
