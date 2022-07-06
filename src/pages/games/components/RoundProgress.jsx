import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function RoundProgress({ round, level }) {
  return (
    <div className="flex flex-grow">
      <p className="text-right w-100">
        Round:{" "}
        <TransitionGroup className={"dib"} component={"span"} key={round}>
          <CSSTransition timeout={500} classNames="bloop" appear={true}>
            <strong className="dib">{round}</strong>
          </CSSTransition>
        </TransitionGroup>
        <br />
        Level: {level || 1}
      </p>
    </div>
  );
}
