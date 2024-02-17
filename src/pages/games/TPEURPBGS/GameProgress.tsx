import React, { FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useTPEURPBGSData } from "./TPEURPBGSContext/useTPEURPBGS";

const Section: FC = () => {
  const section = "custom";

  // We can remove this early return once we have more than 1 section available:
  if (section === "custom") {
    return null;
  }

  return (
    <div className="flex justify-between">
      <span>Section: </span>
      <span>{section === "custom" ? section : <strong>{section}</strong>}</span>
    </div>
  );
};

const Pair: FC = () => {
  const { pairIndex, pairToWin, isGameStarted } = useTPEURPBGSData();
  return (
    <div className="flex justify-between">
      <span>Pair: </span>
      <span>
        <strong className="dib">{pairIndex + 1}</strong> of{" "}
        {isGameStarted ? pairToWin : "?"}
      </span>
    </div>
  );
};

const Repeat: FC = () => {
  const { repeatIndex, repeatToWin } = useTPEURPBGSData();
  return (
    <div className="flex justify-between">
      <span>Repeat: </span>
      <span>
        <TransitionGroup
          className={"dib"}
          component={"span"}
          key={repeatIndex + 1}
        >
          <CSSTransition timeout={500} classNames="bloop" appear={true}>
            <strong>{repeatIndex + 1 || 1}</strong>
          </CSSTransition>
        </TransitionGroup>{" "}
        of {repeatToWin}
      </span>
    </div>
  );
};

const GameProgress: FC = () => {
  return (
    <div className="flex flex-grow">
      <div className="w-100" style={{ lineHeight: 2 }}>
        <Section />
        <Pair />
        <Repeat />
      </div>
    </div>
  );
};

export default GameProgress;
