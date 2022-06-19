import { actions } from "./gameActions";

const defaultState = {
  roundIndex: 0,
  gameComplete: false,
};

export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

export const gameReducer = (state, action) => {
  if (action.type === actions.moveToNextRound) {
    if (state.roundIndex + 1 === 3) {
      return {
        ...state,
        gameComplete: true,
      };
    } else {
      return {
        ...state,
        roundIndex: state.roundIndex + 1,
      };
    }
  }

  if (action.type === actions.restartGame) {
    return {
      ...state,
      gameComplete: false,
      roundIndex: 0,
    };
  }

  return state;
};
