import React, { FC } from "react";
import { useTPEURPBGSData } from "./TPEURPBGSContext/useTPEURPBGS";
import GameProgress from "./GameProgress";
import { ReactComponent as ComposingRobot } from "../../../images/ComposingRobot.svg";
import GamePlay from "./GamePlay";

const introText =
  "The robots have gone bananas! Pick finger combos and a level then “Start”. Pro tip: turn off all your steno dictionaries to output “raw” steno.";

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
              <ComposingRobot
                id="composing-robot-TPEURPBGS"
                role="img"
                aria-labelledby="composing-robot-title"
              />
            </div>
            <p>{introText}</p>
          </div>
        </div>
        {isGameStarted && <GameProgress />}
      </div>
      {isGameStarted && <GamePlay gameName={gameName} />}
    </>
  );
};

export default TPEURPBGSMainContent;
