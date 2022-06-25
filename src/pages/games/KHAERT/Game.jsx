import React from "react";
import Intro from "../components/Intro";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

const gameName = "KHAERT";
const introText =
  "Meet Shazza, the Aussie steno bot who loves to have a yarn. Say hi (HEU).";

export default function Game() {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-SHUFL-game" className="text-center mb3">
          {gameName}
        </h3>
        <div className="flex flex-wrap pb1">
          <Intro
            introText={introText}
            robot={
              <ThinkingRobot
                id="thinking-robot-KHAERT"
                role="img"
                aria-labelledby="thinking-robot-title"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
