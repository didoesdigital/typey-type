import { actions } from "../utilities/gameActions";

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


const getEarlyLevelCompletedState = (state) => {
  return {
    ...state,
    gameComplete: true,
    roundIndex: 0,
  };
};

const getEarlyRoundCompletedState = (state) => {
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
  };
};

const getGameRestartedState = (state) => {
  return {
    ...state,
    gameComplete: false,
    roundIndex: 0,
  };
};

export const gameReducer = (state, action) => {
  switch (action?.type) {
    case actions.roundCompleted:
      return state.roundIndex + 1 === roundToWin
        ? getEarlyLevelCompletedState(state)
        : getEarlyRoundCompletedState(state);

    case actions.gameRestarted:
      return getGameRestartedState(state);

    default:
      return state;
  }
};
