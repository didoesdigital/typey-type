import React, { FC, useMemo, useReducer } from "react";
import { initConfig, gameReducer } from "../gameReducer";
import {
  TPEURPBGSApiProvider,
  TPEURPBGSDataProvider,
} from "./TPEURPBGSContext";

type Props = {
  children: React.ReactNode;
};

const TPEURPBGSController: FC<Props> = ({ children }) => {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    { repeatToWin: 10 }, // init arg
    initConfig
  );

  const data = useMemo(() => gameState, [gameState]);

  const api = useMemo(() => {
    return {
      gameRestarted: () => dispatch({ type: "gameRestarted" }),
      gameStarted: () => dispatch({ type: "gameStarted" }),
      materialSet: (untrustedMultilineString: string) =>
        dispatch({ type: "materialSet", payload: untrustedMultilineString }),
      pairRestarted: () => dispatch({ type: "pairRestarted" }),
      repeatCompleted: () => dispatch({ type: "repeatCompleted" }),
    };
  }, []);

  return (
    <TPEURPBGSDataProvider value={data}>
      <TPEURPBGSApiProvider value={api}>{children}</TPEURPBGSApiProvider>
    </TPEURPBGSDataProvider>
  );
};

export default TPEURPBGSController;
