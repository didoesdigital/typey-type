import { createContext } from "react";
import { UntrustedMultilineString, defaultState } from "../gameReducer";

// eslint-disable-next-line react-refresh/only-export-components
export const ContextData = createContext({
  ...defaultState,
  repeatToWin: 10, // TODO: this should come from somewhere else
});

// eslint-disable-next-line react-refresh/only-export-components
export const ContextApi = createContext({
  gameRestarted: () => {
    // do nothing
  },
  gameStarted: () => {
    // do nothing
  },
  materialSet: (untrustedMultilineString: UntrustedMultilineString) => {
    // do nothing
  },
  pairRestarted: () => {
    // do nothing
  },
  repeatCompleted: () => {
    // do nothing
  },
});

export const TPEURPBGSDataProvider = ContextData.Provider;
export const TPEURPBGSApiProvider = ContextApi.Provider;
