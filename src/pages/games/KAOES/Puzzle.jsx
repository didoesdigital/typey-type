import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// @ts-expect-error TS(7031) FIXME: Binding element 'puzzleText' implicitly has an 'an... Remove this comment to see the full error message
export default function Puzzle({ puzzleText }) {
  return (
    <p className="text-center lede mb0">
      <strong>
        Where does the{" "}
        <TransitionGroup className={""} component={"span"} key={puzzleText}>
          <CSSTransition timeout={500} classNames="bloop" appear={true}>
            <span className="dib" data-chromatic="ignore">{puzzleText}</span>
          </CSSTransition>
        </TransitionGroup>{" "}
        key belong?
      </strong>
    </p>
  );
}
