import React, { useCallback, useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga4";
import { actions as SHUFLactions } from "../SHUFL/gameActions";
import { actions as TPEUBGSZactions } from "../TPEUBGSZ/gameActions";
import { ReactComponent as AlertRobot } from "../../../images/AlertRobot.svg";
import * as Confetti from "../../../utils/confetti.js";

const particles = [];
const ConfettiConfig = { sparsity: 480, colors: 2 };

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
  gameName,
  level,
  dispatch,
}) {
  const actionbutton = useRef(null);
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  useEffect(() => {
    if (actionbutton) {
      actionbutton.current.focus();
    }
  }, []);

  useEffect(() => {
    Confetti.setupCanvas(ConfettiConfig, "level-completed", particles);
    if (canvasRef.current) {
      Confetti.restartAnimation(
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
        particles.splice(0);
        Confetti.cancelAnimation();
        Confetti.setupCanvas(ConfettiConfig, "level-completed", particles);
        Confetti.restartAnimation(
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
