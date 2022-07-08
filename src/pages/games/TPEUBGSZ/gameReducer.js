import { actions } from "./gameActions";
import { makeUpAWordAndHint } from "./Utilities";

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
  puzzleText: "",
  currentHint: "",
};

export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

const getGameStartedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(state.level);
  return {
    ...state,
    ...initialProgress,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getGameRestartedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(state.level);
  return {
    ...state,
    ...initialProgress,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getAllLevelsCompletedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(1);
  return {
    ...state,
    ...initialProgress,
    gameComplete: true,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getEarlyLevelCompletedState = (state) => {
  const increasedLevel = state.level + 1;
  const [madeUpWord, hint] = makeUpAWordAndHint(increasedLevel);
  return {
    ...state,
    level: increasedLevel,
    levelComplete: true,
    roundIndex: 0,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getEarlyRoundCompletedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(state.level);
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

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
