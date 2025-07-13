import { actions } from "./gameActions";
import { makeUpAWordAndHint } from "./utilities";

export const roundToWin = 3;
export const levelToWin = 4;

type TPEUBGSZState = {
  currentHint: string;
  puzzleText: string;
  gameComplete: boolean;
  levelComplete: boolean;
  level: number;
  roundIndex: number;
  numberOfMetWords: number;
};

type TPEUBGSZActionGameRestarted = {
  type: typeof actions.gameRestarted;
  payload: {
    numberOfMetWords: number;
  };
};

type TPEUBGSZActionGameStarted = {
  type: typeof actions.gameStarted;
  payload: {
    numberOfMetWords: number;
  };
};

type TPEUBGSZActionLevelRestarted = {
  type: typeof actions.levelRestarted;
  payload: {
    numberOfMetWords: number;
  };
};

type TPEUBGSZActionRoundCompleted = { type: typeof actions.roundCompleted };

type TPEUBGSZAction =
  | TPEUBGSZActionGameRestarted
  | TPEUBGSZActionGameStarted
  | TPEUBGSZActionLevelRestarted
  | TPEUBGSZActionRoundCompleted;

const initialProgress: Pick<
  TPEUBGSZState,
  "gameComplete" | "levelComplete" | "level" | "roundIndex"
> = {
  gameComplete: false,
  levelComplete: false,
  level: 1,
  roundIndex: 0,
};

const defaultState: Pick<
  TPEUBGSZState,
  | "gameComplete"
  | "levelComplete"
  | "level"
  | "roundIndex"
  | "numberOfMetWords"
  | "puzzleText"
  | "currentHint"
> = {
  ...initialProgress,
  numberOfMetWords: 0,
  puzzleText: "",
  currentHint: "",
};

export const initConfig = (
  state: undefined | TPEUBGSZState
): TPEUBGSZState => ({
  ...defaultState,
  ...state,
});

const getGameStartedState = (
  state: TPEUBGSZState,
  action: TPEUBGSZActionGameStarted
) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(
    state.level,
    action.payload.numberOfMetWords
  );
  return {
    ...state,
    ...initialProgress,
    numberOfMetWords: action.payload.numberOfMetWords,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getGameRestartedState = (state: TPEUBGSZState) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(
    state.level,
    state.numberOfMetWords
  );
  return {
    ...state,
    ...initialProgress,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getAllLevelsCompletedState = (state: TPEUBGSZState) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(1, state.numberOfMetWords);
  return {
    ...state,
    ...initialProgress,
    gameComplete: true,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getEarlyLevelCompletedState = (state: TPEUBGSZState) => {
  const increasedLevel = state.level + 1;
  const [madeUpWord, hint] = makeUpAWordAndHint(
    increasedLevel,
    state.numberOfMetWords
  );
  return {
    ...state,
    level: increasedLevel,
    levelComplete: true,
    roundIndex: 0,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

const getEarlyRoundCompletedState = (state: TPEUBGSZState) => {
  const [madeUpWord, hint] = makeUpAWordAndHint(
    state.level,
    state.numberOfMetWords
  );
  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    puzzleText: madeUpWord,
    currentHint: hint,
  };
};

export const gameReducer = (state: TPEUBGSZState, action: TPEUBGSZAction) => {
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
