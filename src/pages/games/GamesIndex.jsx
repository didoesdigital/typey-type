import React, { useEffect, useRef } from "react";
import GameBox from "./components/GameBox";
import { ReactComponent as RaverRobot } from "../../images/RaverRobot.svg";
import { ReactComponent as ThinkingRobot } from "../../images/ThinkingRobot.svg";

export default function GamesIndex() {
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current.focus();
    }
  }, []);

  return (
    <main id="main">
      <div className="subheader">
        <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2 ref={mainHeading} tabIndex="-1">
                Games
              </h2>
            </header>
          </div>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <div className="flex flex-wrap justify-between">
          <h3 id="typey-type-games" className="mx-auto">
            Typey&nbsp;Type games
          </h3>
          <div className="flex flex-wrap justify-center mx-auto">
            <GameBox
              title="SHUFL (shuffle)"
              description="Solve the puzzle to straighten out shuffled words."
              linkTo="/games/SHUFL"
              linkText="Play SHUFL"
              robot={
                <RaverRobot role="image" aria-labelledby="raver-robot-title" />
              }
            />
            <GameBox
              title="TPEUBGSZ (fixes)"
              description="Practise prefixes and suffixes by combining them together."
              linkTo="/games/TPEUBGSZ"
              linkText="Play TPEUBGSZ"
              robot={
                <ThinkingRobot
                  role="image"
                  aria-labelledby="thinking-robot-title"
                />
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
