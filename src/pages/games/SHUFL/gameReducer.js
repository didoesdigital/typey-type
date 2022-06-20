import { actions } from "./gameActions";

const roundToWin = 10;

const defaultState = {
  roundIndex: 0,
  gameComplete: false,
};

export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

export const gameReducer = (state, action) => {
  switch (action?.type) {
    case actions.moveToNextRound:
      return state.roundIndex + 1 === roundToWin
        ? {
            ...state,
            gameComplete: true,
            roundIndex: 0,
          }
        : {
            ...state,
            roundIndex: state.roundIndex + 1,
          };
    case actions.restartGame:
      return {
        ...state,
        gameComplete: false,
        roundIndex: 0,
      };

    default:
      return state;
  }
};
