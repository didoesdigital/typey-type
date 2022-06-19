import React, { useContext, useEffect, useRef } from "react";
import { actions } from "./gameActions";
import { SHUFLDispatch } from "./SHUFLGame";
import { ReactComponent as HappyRobot } from "../../../images/HappyRobot.svg";

export default function SHUFLPuzzle() {
  const playAgainButton = useRef(null);
  useEffect(() => {
    if (playAgainButton) {
      playAgainButton.current.focus();
    }
  }, []);

  const dispatch = useContext(SHUFLDispatch);
  return (
    <>
      <div className="w-100 mw-48 mx-auto">
        <HappyRobot />
      </div>
      <p className="text-center">You win! </p>
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
