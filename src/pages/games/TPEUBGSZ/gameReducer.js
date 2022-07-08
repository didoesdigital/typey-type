import { actions } from "./gameActions";
import { makeUpAWordAndHint } from "./Utilities";

export const roundToWin = 8;

const initialProgress = {
  gameComplete: false,
  roundIndex: 0,
};

const defaultState = {
  ...initialProgress,
  puzzleText: "",
  currentStroke: "",
};

export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

const getGameStartedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint();
  return {
    ...state,
    ...initialProgress,
    puzzleText: madeUpWord,
    currentStroke: hint,
  };
};

const getGameRestartedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint();
  return {
    ...state,
    gameComplete: false,
    roundIndex: 0,
    puzzleText: madeUpWord,
    currentStroke: hint,
  };
};

const getEarlyLevelCompletedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint();
  return {
    ...state,
    gameComplete: true,
    roundIndex: 0,
    puzzleText: madeUpWord,
    currentStroke: hint,
  };
};

const getEarlyRoundCompletedState = (state) => {
  const [madeUpWord, hint] = makeUpAWordAndHint();
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    puzzleText: madeUpWord,
    currentStroke: hint,
  };
};

export const gameReducer = (state, action) => {
  switch (action?.type) {
    case actions.gameStarted:
      return getGameStartedState(state, action);

    case actions.gameRestarted:
      return getGameRestartedState(state);

    case actions.roundCompleted:
      return state.roundIndex + 1 === roundToWin
        ? getEarlyLevelCompletedState(state)
        : getEarlyRoundCompletedState(state);

    default:
      return state;
  }
};
