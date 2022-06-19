import React, { useContext } from "react";
import { actions } from "./gameActions";
import { SHUFLDispatch } from "./SHUFLGame";

export default function SHUFLPuzzle() {
  const dispatch = useContext(SHUFLDispatch);
  return (
    <>
      <p className="text-center">You win! </p>
      <p className="mx-auto text-center">
        <button
          className="button"
          onClick={() => {
            dispatch({ type: actions.restartGame });
          }}
        >
          Restart
        </button>
      </p>
    </>
  );
}
