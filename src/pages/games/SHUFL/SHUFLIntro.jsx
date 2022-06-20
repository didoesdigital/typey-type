import React from "react";
import { ReactComponent as RaverRobot } from "../../../images/RaverRobot.svg";

export default function SHUFLIntro() {
  return (
    <div className="mw-844 mr3 flex-grow">
      <div className="flex">
        <div className="w-100 mw-48 mr3">
          <RaverRobot id="raver-robot-SHUFL" />
        </div>
        <p>
          The steno robots have been dancing too much and shuffled all the
          letters out of order! You need to type the correct word to get them
          all back in order.
        </p>
      </div>
    </div>
  );
}
