import isNormalInteger from "../../../utils/isNormalInteger";
import { actions } from "../utilities/gameActions";
import { choosePuzzleKey } from "./utilities";

export const roundToWin = 8;

const roundToWinStorageKey = "typey-KAOES-rounds";

type KAOESState = {
  firstGuess: boolean;
  gameComplete: boolean;
  roundIndex: number;
  puzzleText: string;
};

type KAOESActionGameRestarted = { type: typeof actions.gameRestarted };

type KAOESActionMakeGuess = { type: typeof actions.makeGuess };

type KAOESActionRoundCompleted = { type: typeof actions.roundCompleted };

type SetPuzzleText = {
  type: typeof actions.setPuzzleText;
  payload: { puzzleText: string };
};

type KAOESAction =
  | KAOESActionGameRestarted
  | KAOESActionMakeGuess
  | KAOESActionRoundCompleted
  | SetPuzzleText;

const defaultState: KAOESState = {
  firstGuess: true,
  gameComplete: false,
  roundIndex: 0,
  puzzleText: choosePuzzleKey(""),
};

export const initConfig = (state: undefined | KAOESState): KAOESState => ({
  ...defaultState,
  ...state,
});

const getPuzzleTextState = (state: KAOESState, action: SetPuzzleText) => {
  return {
    ...state,
    puzzleText: action.payload.puzzleText,
  };
};

export const gameReducer = (state: KAOESState, action: KAOESAction) => {
  let experimentalRoundToWin = roundToWin;

  try {
    const storageRounds =
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

  switch (action.type) {
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

    case actions.setPuzzleText:
      return getPuzzleTextState(state, action);

    default:
      return state;
  }
};
