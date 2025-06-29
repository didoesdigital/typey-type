import React, { useCallback, useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga4";
import { Link } from "react-router-dom";
import { actions } from "../utilities/gameActions";
import { ReactComponent as HappyRobot } from "../../../images/HappyRobot.svg";
import * as Confetti from "../../../utils/confetti.js";

// @ts-expect-error TS(7034) FIXME: Variable 'particles' implicitly has type 'any[]' i... Remove this comment to see the full error message
const particles = [];

// @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
const handlePlayAgainClick = (event, gameName, dispatch) => {
  event.preventDefault();

  if (dispatch) {
    dispatch({ type: actions.gameRestarted });
  }

  GoogleAnalytics.event({
    category: gameName,
    action: "Click",
    label: "Play again",
  });
};

// @ts-expect-error TS(2339) FIXME: Property 'gameName' does not exist on type '{ chil... Remove this comment to see the full error message
export default React.memo(function Completed({ gameName, dispatch }) {
  const playAgainButton = useRef(null);
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  useEffect(() => {
    if (playAgainButton) {
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      playAgainButton.current.focus();
    }
  }, []);

  useEffect(() => {
    // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
    Confetti.setupCanvas({ sparsity: 960, colors: 5 }, "you-win", particles);
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
        Confetti.setupCanvas(
          { sparsity: 170, colors: 4 },
          "you-win",
          // @ts-expect-error TS(7005) FIXME: Variable 'particles' implicitly has an 'any[]' typ... Remove this comment to see the full error message
          particles
        );
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
        id="you-win"
        tabIndex={0}
        onClick={restartConfetti}
        onKeyDown={restartConfetti}
        className="w-100 pt1"
      >
        <div className="w-100 mw-48 mx-auto">
          <HappyRobot />
        </div>
        <p className="text-center w-100">You win!</p>
      </div>
      <p className="mx-auto text-center">
        <button
          ref={playAgainButton}
          className="button"
          onClick={(event) => handlePlayAgainClick(event, gameName, dispatch)}
        >
          Play again
        </button>
      </p>
      <p className="mx-auto text-center mt3">
        <Link to="/games" className="text-center py1">Games</Link>
      </p>
    </>
  );
});
