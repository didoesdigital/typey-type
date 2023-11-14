import React, { FC } from "react";
import Completed from "../components/Completed";
import {
  useTPEURPBGSApi,
  useTPEURPBGSData,
} from "./TPEURPBGSContext/useTPEURPBGS";

type Props = {
  gameName: string;
};

const TPEURPBGSCompleted: FC<Props> = ({ gameName }) => {
  const { isGameComplete } = useTPEURPBGSData();
  const { gameRestarted } = useTPEURPBGSApi();

  return isGameComplete ? (
    <Completed
      // @ts-ignore TODO
      gameName={gameName}
      dispatch={() => {
        gameRestarted();
      }}
    />
  ) : null;
};

export default TPEURPBGSCompleted;
