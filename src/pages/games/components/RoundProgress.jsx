import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function RoundProgress({
  round,
  level,
  roundToWin,
  levelToWin,
}) {
  return (
    <div className="flex flex-grow">
      <p className="text-right w-100">
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
