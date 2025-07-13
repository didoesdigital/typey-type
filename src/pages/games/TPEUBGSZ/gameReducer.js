import { actions } from "./gameActions";
import { makeUpAWordAndHint } from "./utilities";

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
  numberOfMetWords: 0,
  puzzleText: "",
  currentHint: "",
};

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getGameStartedState = (state, action) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(
    state.level,
    action.payload.numberOfMetWords
  );
  return {
    ...state,
    ...initialProgress,
    numberOfMetWords: action.payload.numberOfMetWords,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getGameRestartedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(
    state.level,
    state.numberOfMetWords
  );
  return {
    ...state,
    ...initialProgress,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getAllLevelsCompletedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(1, state.numberOfMetWords);
  return {
    ...state,
    ...initialProgress,
    gameComplete: true,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getEarlyLevelCompletedState = (state) => {
  const increasedLevel = state.level + 1;
  const [madeUpWord, hint] = makeUpAWordAndHint(
    increasedLevel,
    state.numberOfMetWords
  );
  return {
    ...state,
    level: increasedLevel,
    levelComplete: true,
    roundIndex: 0,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const getEarlyRoundCompletedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(
    state.level,
    state.numberOfMetWords
  );
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

// @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
export const gameReducer = (state, action) => {
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
