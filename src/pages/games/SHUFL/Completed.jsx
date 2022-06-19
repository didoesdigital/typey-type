import React, { useContext, useEffect, useRef } from "react";
import { actions } from "./gameActions";
import { SHUFLDispatch } from "./SHUFLGame";
import { ReactComponent as HappyRobot } from "../../../images/HappyRobot.svg";
import * as Confetti from "../../../utils/confetti.js";

const particles = [];

export default function SHUFLPuzzle() {
  const playAgainButton = useRef(null);
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  useEffect(() => {
    if (playAgainButton) {
      playAgainButton.current.focus();
    }
  }, []);

  useEffect(() => {
    Confetti.setupCanvas({ sparsity: 170, colors: 4 }, "you-win", particles);
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

  const dispatch = useContext(SHUFLDispatch);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="fixed celebration-canvas top-0 left-0 pointer-none"
      />
      <div className="w-100 mw-48 mx-auto">
        <HappyRobot />
      </div>
      <p id="you-win" className="text-center w-100">
        You win!
      </p>
      <p className="mx-auto text-center">
        <button
          ref={playAgainButton}
          className="button"
          onClick={() => {
            dispatch({ type: actions.restartGame });
          }}
        >
          Play again
        </button>
      </p>
    </>
  );
}
