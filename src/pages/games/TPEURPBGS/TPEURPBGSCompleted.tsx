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
      // @ts-expect-error TS(2322) FIXME: Type '{ gameName: string; dispatch: () => void; }'... Remove this comment to see the full error message
      gameName={gameName}
      dispatch={() => {
        gameRestarted();
      }}
    />
  ) : null;
};

export default TPEURPBGSCompleted;
