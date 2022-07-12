import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function GameProgress({
  level,
  levelToWin,
  round,
  roundToWin,
}) {
  return (
    <div className="flex flex-grow">
      <p className="text-center w-100">
        Round:{" "}
        <TransitionGroup className={"dib"} component={"span"} key={round}>
          <CSSTransition timeout={500} classNames="bloop" appear={true}>
            <strong className="dib">{round}</strong>
          </CSSTransition>
        </TransitionGroup>{" "}
        of {roundToWin}
        <br />
        {level && (
          <>
            Level: <strong>{level || 1}</strong> of {levelToWin}
          </>
        )}
      </p>
    </div>
  );
}
