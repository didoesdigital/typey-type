import React, { useEffect, useRef } from "react";
import GameBox from "./components/GameBox";
import { ReactComponent as RaverRobot } from "../../images/RaverRobot.svg";
import { ReactComponent as AussieRobot } from "../../images/AussieRobot.svg";
import { ReactComponent as ThinkingRobot } from "../../images/ThinkingRobot.svg";
import { ReactComponent as BananasRobot } from "../../images/BananasRobot.svg";
import { ReactComponent as ComposingRobot } from "../../images/ComposingRobot.svg";
import { ReactComponent as MischievousRobot } from "../../images/MischievousRobot.svg";
import Subheader from "../../components/Subheader";

export default function GamesIndex() {
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current.focus();
    }
  }, []);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              Games
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto">
        <div className="flex flex-wrap justify-between">
          <h3 id="typey-type-games" className="mx-auto">
            Typey&nbsp;Type games
          </h3>
          <div className="flex flex-wrap justify-center mx-auto">
            <GameBox
              title="KAOES (keys)"
              description="Learn where the keys are on a steno diagram."
              linkTo="/games/KAOES"
              linkText="Play KAOES"
              robot={
                <MischievousRobot
                  id="mischievous-robot-KAOES"
                  role="img"
                  aria-labelledby="mischievous-robot-title"
                />
              }
            />
            <GameBox
              title="SHUFL (shuffle)"
              description="Solve the puzzle to straighten out shuffled words."
              linkTo="/games/SHUFL"
              linkText="Play SHUFL"
              robot={
                <RaverRobot role="img" aria-labelledby="raver-robot-title" />
              }
            />
            <GameBox
              title="TPEUBGSZ (fixes)"
              description="Practise prefixes and suffixes by combining them together."
              linkTo="/games/TPEUBGSZ"
              linkText="Play TPEUBGSZ"
              robot={
                <ThinkingRobot
                  role="img"
                  aria-labelledby="thinking-robot-title"
                />
              }
            />
            <GameBox
              title="KPOES (compose)"
              description="Write what's in your head. Compose stories and reflect."
              linkTo="/games/KPOES"
              linkText="Play KPOES"
              robot={
                <ComposingRobot
                  role="img"
                  aria-labelledby="composing-robot-title"
                />
              }
            />
            <GameBox
              title="TPEURPBGS (fingers)"
              description="Practise finger drills to write smoother and faster."
              linkTo="/games/TPEURPBGS"
              linkText="Play TPEURPBGS"
              robot={
                <BananasRobot
                  role="img"
                  aria-labelledby="bananas-robot-title"
                />
              }
            />
            <GameBox
              title="KHAERT (chatter)"
              description="Have a yarn with the Aussie bot. Practise simple convo."
              linkTo="/games/KHAERT"
              linkText="Start KHAERT"
              robot={
                <AussieRobot role="img" aria-labelledby="aussie-robot-title" />
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
