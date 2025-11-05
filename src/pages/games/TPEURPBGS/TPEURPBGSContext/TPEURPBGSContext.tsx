import React from "react";
import { UntrustedMultilineString, defaultState } from "../gameReducer";

export const ContextData = React.createContext({
  ...defaultState,
  repeatToWin: 10, // TODO: this should come from somewhere else
});

export const ContextApi = React.createContext({
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
