import { actions } from "./gameActions";
import {
  getLevelMaterial,
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./utilities";
import createStrokeHintForPhrase from "../../../utils/transformingDictionaries/createStrokeHintForPhrase";

export const roundToWin = 3;
export const levelToWin = 4;

const initialProgress = {
  gameComplete: false,
  levelComplete: false,
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

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getGameStartedState = (state, action) => {
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

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getGameRestartedState = (state) => {
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

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getAllLevelsCompletedState = (state) => {
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

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getEarlyLevelCompletedState = (state) => {
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

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getEarlyRoundCompletedState = (state) => {
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

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
export const gameReducer = (state, action) => {
  switch (action?.type) {
    case actions.gameStarted:
      return getGameStartedState(state, action);

    case actions.gameRestarted:
      // @ts-expect-error TS(2554) FIXME: Expected 0-1 arguments, but got 2.
      return getGameRestartedState(state, action);

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
