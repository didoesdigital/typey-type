import { actions } from "./gameActions";

export const fallbackMaterial = "PWAPB TPHA";

export type UntrustedMultilineString = string;

export type GameRestarted = {
  type: "gameRestarted";
};

export type GameStarted = {
  type: "gameStarted";
};

export type PairRestarted = {
  type: "pairRestarted";
};

export type RepeatCompleted = {
  type: "repeatCompleted";
};

export type MaterialSet = {
  type: "materialSet";
  payload: UntrustedMultilineString;
};

export type Actions =
  | GameRestarted
  | GameStarted
  | PairRestarted
  | RepeatCompleted
  | MaterialSet;

const initialProgress = {
  isGameComplete: false,
  isGameStarted: false,
  pairComplete: false,
  pairIndex: 0,
  repeatIndex: 0,
};

export const defaultState: Omit<GameState, "repeatToWin"> = {
  ...initialProgress,
  material: [fallbackMaterial],
  puzzleText: fallbackMaterial,
  pairToWin: 1,
};

// These are arbitrary limits to prevent browsers from crashing and encourage good lesson design:
const maxStringLimit = 1000;
const maxPairsLimit = 24;
const maxPairStringLimit = 54;

const convertStringToMaterialAndCurrentPuzzleText = (
  untrustedString: string
) => {
  const splitLines = untrustedString
    .slice(0, maxStringLimit)
    .split("\n")
    .filter((line) => line !== "")
    .slice(0, maxPairsLimit)
    .map((line) => line.slice(0, maxPairStringLimit));

  return {
    material: splitLines,
    puzzleText: splitLines[0],
  };
};

/** e.g. "URT ELS" */
type Pair = string;

export type GameState = {
  material: Pair[];
  puzzleText: Pair;
  isGameComplete: boolean;
  isGameStarted: boolean;
  pairComplete: boolean;
  pairIndex: number;
  pairToWin: number;
  repeatIndex: number;
  repeatToWin: number;
};

export const initConfig = (initArg: { repeatToWin: number }): GameState => {
  return {
    ...defaultState,
    repeatToWin: initArg.repeatToWin,
  };
};

const getGameStartedState = (state: GameState): GameState => {
  return {
    ...state,
    ...initialProgress,
    isGameStarted: true,
    puzzleText: state.material[state.pairIndex],
  };
};

const getGameRestartedState = (state: GameState): GameState => {
  return {
    ...state,
    ...initialProgress,
    isGameStarted: false,
    isGameComplete: false,
    puzzleText: state.material[state.pairIndex],
  };
};

const getAllPairsCompletedState = (state: GameState): GameState => {
  return {
    ...state,
    ...initialProgress,
    isGameComplete: true,
    puzzleText: "completed", //"UFB ERP 3",
  };
};

const getEarlyRepeatCompletedState = (state: GameState): GameState => {
  const nextRepeat = state.repeatIndex + 1;
  return {
    ...state,
    repeatIndex: nextRepeat,
    puzzleText: state.material[state.pairIndex] ?? "", //"UFB ERP 4",
  };
};

const getEarlyPairCompletedState = (state: GameState): GameState => {
  return {
    ...state,
    repeatIndex: 0,
    pairIndex: state.pairIndex + 1,
    puzzleText: state.material[state.pairIndex + 1],
  };
};

const getMaterialSetState = (
  state: GameState,
  action: MaterialSet
): GameState => {
  const { material, puzzleText } = convertStringToMaterialAndCurrentPuzzleText(
    action.payload
  );

  return {
    ...state,
    material,
    pairToWin: material.length,
    puzzleText,
  };
};

export const gameReducer = (state: GameState, action: Actions): GameState => {
  switch (action?.type) {
    case actions.materialSet:
      return getMaterialSetState(state, action);

    case actions.gameStarted:
      return getGameStartedState(state);

    case actions.gameRestarted:
      return getGameRestartedState(state);

    case actions.pairRestarted:
      return { ...state, pairComplete: false };

    case actions.repeatCompleted:
      return state.repeatIndex + 1 === state.repeatToWin &&
        state.pairIndex + 1 === state.pairToWin
        ? getAllPairsCompletedState(state)
        : state.repeatIndex + 1 === state.repeatToWin
        ? getEarlyPairCompletedState(state)
        : getEarlyRepeatCompletedState(state);

    default:
      return state;
  }
};
