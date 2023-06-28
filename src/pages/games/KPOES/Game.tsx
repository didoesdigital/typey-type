import React, { useEffect, useReducer, useState } from "react";
import Intro from "../components/Intro";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

const gameName = "KPOES";
const introText = "Write what's in your head.";

export default function Game() {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-KPOES-game" className="text-center mb3">
          {gameName} game
        </h3>
        <Intro
          introText={introText}
          robot={
            <ThinkingRobot
              id="thinking-robot-KPOES"
              role="img"
              aria-labelledby="thinking-robot-title"
            />
          }
        />
        <p className="text-center mt10 text-small">
          Got a suggestion?{" "}
          <a
            href="https://forms.gle/P1tMjotG2w17CyyNA"
            className="mt0"
            target="_blank"
            rel="noopener noreferrer"
            id="ga--KPOES--give-feedback"
          >
            Give feedback (form opens in new tab)
          </a>
        </p>
      </div>
    </div>
  );
}
