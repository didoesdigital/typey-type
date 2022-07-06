import { actions } from "../utilities/gameActions";

const roundToWin = 10;

const defaultState = {
  firstGuess: true,
  gameComplete: false,
  roundIndex: 0,
};

export const initConfig = (state) => ({
  ...defaultState,
  ...state,
});

export const gameReducer = (state, action) => {
  switch (action?.type) {
    case actions.makeGuess:
      return {
        ...state,
        firstGuess: false,
      };
    case actions.roundCompleted:
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
    case actions.gameRestarted:
      return {
        ...state,
        firstGuess: true,
        gameComplete: false,
        roundIndex: 0,
      };

    default:
      return state;
  }
};
