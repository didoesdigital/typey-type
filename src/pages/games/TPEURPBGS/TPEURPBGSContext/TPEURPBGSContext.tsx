import React from "react";
import { UntrustedMultilineString, defaultState } from "../gameReducer";

export const ContextData = React.createContext({
  ...defaultState,
  repeatToWin: 10, // TODO: this should come from somewhere else
});

export const ContextApi = React.createContext({
  gameRestarted: () => {},
  gameStarted: () => {},
  materialSet: (untrustedMultilineString: UntrustedMultilineString) => {},
  pairRestarted: () => {},
  repeatCompleted: () => {},
});

export const TPEURPBGSDataProvider = ContextData.Provider;
export const TPEURPBGSApiProvider = ContextApi.Provider;
