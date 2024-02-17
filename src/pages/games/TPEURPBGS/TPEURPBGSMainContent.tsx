import React, { FC } from "react";
import { useTPEURPBGSData } from "./TPEURPBGSContext/useTPEURPBGS";
import GameProgress from "./GameProgress";
import { ReactComponent as BananasRobot } from "../../../images/BananasRobot.svg";
import GamePlay from "./GamePlay";


type Props = {
  gameName: string;
};

const TPEURPBGSMainContent: FC<Props> = ({ gameName }) => {
  const { isGameComplete, isGameStarted } = useTPEURPBGSData();

  if (isGameComplete) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="mw-800 mr3 flex-grow">
          <div className="flex">
            <div className="w-100 mw-48 mr3 game-robot">
              <BananasRobot
                id="bananas-robot-TPEURPBGS"
                role="img"
                aria-labelledby="bananas-robot-title"
              />
            </div>
            <p>
              The robots have gone bananas! They are only responding to pairs of
              raw steno strokes like{" "}
              <kbd className="steno-stroke steno-stroke--subtle">PWAPB</kbd>{" "}
              <kbd className="steno-stroke steno-stroke--subtle">TPHA</kbd>.
              Write the pairs back and forth smoothly to straighten out the
              robots.
            </p>
          </div>
        </div>
        {<GameProgress />}
      </div>
      {isGameStarted && <GamePlay gameName={gameName} />}
    </>
  );
};

export default TPEURPBGSMainContent;
