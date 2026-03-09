import isNormalInteger from "../../../utils/isNormalInteger";
import { actions } from "../utilities/gameActions";
import { choosePuzzleKey } from "./utilities";

export const defaultRoundToWin = 8;

const roundToWinStorageKey = "typey-KAOES-rounds";

type KAOESState = {
  firstGuess: boolean;
  gameComplete: boolean;
  roundIndex: number;
  puzzleText: string;
  roundToWin: number;
};

type KAOESActionGameRestarted = { type: typeof actions.gameRestarted };

type KAOESActionMakeGuess = { type: typeof actions.makeGuess };

type KAOESActionRoundCompleted = { type: typeof actions.roundCompleted };

type KAOESActionRoundToWinUpdated = {
  type: typeof actions.roundToWinUpdated;
  payload: {
    roundToWin: number;
  };
};

type SetPuzzleText = {
  type: typeof actions.setPuzzleText;
  payload: { puzzleText: string };
};

type KAOESAction =
  | KAOESActionGameRestarted
  | KAOESActionMakeGuess
  | KAOESActionRoundCompleted
  | KAOESActionRoundToWinUpdated
  | SetPuzzleText;

const getInitialRoundToWin = () => {
  let initialRoundToWin = defaultRoundToWin;

  try {
    const storageRounds =
      window.localStorage.getItem(roundToWinStorageKey) ?? "0";
    if (
      isNormalInteger(storageRounds) &&
      +storageRounds > 1 &&
      +storageRounds < 10000
    ) {
      initialRoundToWin = +storageRounds;
    }
  } catch (e) {
    console.error(e);
  }

  return initialRoundToWin;
};

const defaultState: KAOESState = {
  firstGuess: true,
  gameComplete: false,
  roundIndex: 0,
  roundToWin: getInitialRoundToWin(),
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

const getRoundToWinUpdatedState = (
  state: KAOESState,
  action: KAOESActionRoundToWinUpdated,
) => {
  const newRoundToWin = action.payload.roundToWin;

  try {
    window.localStorage.setItem(roundToWinStorageKey, `${newRoundToWin}`);
  } catch (err) {
    console.error(err);
  }

  return {
    ...state,
    roundToWin: newRoundToWin,
  };
};

export const gameReducer = (state: KAOESState, action: KAOESAction) => {
  switch (action.type) {
    case actions.makeGuess:
      return {
        ...state,
        firstGuess: false,
      };

    case actions.roundCompleted:
      return state.roundIndex + 1 === state.roundToWin
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

    case actions.roundToWinUpdated:
      return getRoundToWinUpdatedState(state, action);

    case actions.setPuzzleText:
      return getPuzzleTextState(state, action);

    default:
      return state;
  }
};
