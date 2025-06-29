import React, { useCallback, useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga4";
import { actions as SHUFLactions } from "../SHUFL/gameActions";
import { actions as TPEUBGSZactions } from "../TPEUBGSZ/gameActions";
import { ReactComponent as AlertRobot } from "../../../images/AlertRobot.svg";
import * as Confetti from "../../../utils/confetti.js";

// @ts-expect-error TS(7034) FIXME: Variable 'particles' implicitly has type 'any[]' i... Remove this comment to see the full error message
const particles = [];
const ConfettiConfig = { sparsity: 480, colors: 2 };

// @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
const handleActionClick = (event, gameName, dispatch) => {
  event.preventDefault();

  if (dispatch) {
    dispatch({
      type:
        gameName === "SHUFL"
          ? SHUFLactions.levelRestarted
          : TPEUBGSZactions.levelRestarted,
    });
  }

  GoogleAnalytics.event({
    category: gameName,
    action: "Click",
    label: "Play again",
  });
};

export default React.memo(function LevelCompleted({
  // @ts-expect-error TS(2339) FIXME: Property 'gameName' does not exist on type '{ chil... Remove this comment to see the full error message
  gameName,
  // @ts-expect-error TS(2339) FIXME: Property 'level' does not exist on type '{ childre... Remove this comment to see the full error message
  level,
  // @ts-expect-error TS(2339) FIXME: Property 'dispatch' does not exist on type '{ chil... Remove this comment to see the full error message
  dispatch,
}) {
  const actionbutton = useRef(null);
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  useEffect(() => {
    if (actionbutton) {
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      actionbutton.current.focus();
    }
  }, []);

  useEffect(() => {
    // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
    Confetti.setupCanvas(ConfettiConfig, "level-completed", particles);
    if (canvasRef.current) {
      Confetti.restartAnimation(
        // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
        particles,
        canvasRef.current,
        canvasWidth,
        canvasHeight
      );
    }
    return function cleanup() {
      Confetti.cancelAnimation();
    };
  }, [canvasRef, canvasWidth, canvasHeight]);

  const restartConfetti = useCallback(
    (event) => {
      if (
        event &&
        ((event.keyCode && event.keyCode === 13) || event.type === "click")
      ) {
        // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
        particles.splice(0);
        Confetti.cancelAnimation();
        // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
        Confetti.setupCanvas(ConfettiConfig, "level-completed", particles);
        Confetti.restartAnimation(
          // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
          particles,
          canvasRef.current,
          canvasWidth,
          canvasHeight
        );
      }
    },
    [canvasRef, canvasWidth, canvasHeight]
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="fixed celebration-canvas top-0 left-0 pointer-none"
      />
      <div
        // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
        tabIndex="0"
        onClick={restartConfetti}
        onKeyDown={restartConfetti}
        className="w-100"
      >
        <div className="w-100 mw-48 mx-auto" id="level-completed">
          <AlertRobot />
        </div>
        <p className="text-center w-100">
          <strong>Level {level - 1} complete!</strong>
        </p>
      </div>
      <p className="mx-auto text-center">
        <button
          ref={actionbutton}
          className="button"
          onClick={(event) => handleActionClick(event, gameName, dispatch)}
        >
          Next level
        </button>
      </p>
    </>
  );
});
