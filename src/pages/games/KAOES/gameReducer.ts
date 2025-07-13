import isNormalInteger from "../../../utils/isNormalInteger";
import { actions } from "../utilities/gameActions";

export const roundToWin = 8;

const roundToWinStorageKey = "typey-KAOES-rounds";

type KAOESState = {
  firstGuess: boolean;
  gameComplete: boolean;
  roundIndex: number;
};

type KAOESActionGameRestarted = { type: typeof actions.gameRestarted };

type KAOESActionMakeGuess = { type: typeof actions.makeGuess };

type KAOESActionRoundCompleted = { type: typeof actions.roundCompleted };

type KAOESAction =
  | KAOESActionGameRestarted
  | KAOESActionMakeGuess
  | KAOESActionRoundCompleted;

const defaultState: KAOESState = {
  firstGuess: true,
  gameComplete: false,
  roundIndex: 0,
};

export const initConfig = (state: undefined | KAOESState): KAOESState => ({
  ...defaultState,
  ...state,
});

export const gameReducer = (state: KAOESState, action: KAOESAction) => {
  let experimentalRoundToWin = roundToWin;

  try {
    let storageRounds =
      window.localStorage.getItem(roundToWinStorageKey) ?? "0";
    if (
      isNormalInteger(storageRounds) &&
      +storageRounds > 1 &&
      +storageRounds < 10000
    ) {
      experimentalRoundToWin = +storageRounds;
    }
  } catch (e) {
    console.error(e);
  }

  switch (action?.type) {
    case actions.makeGuess:
      return {
        ...state,
        firstGuess: false,
      };
    case actions.roundCompleted:
      return state.roundIndex + 1 === experimentalRoundToWin
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
