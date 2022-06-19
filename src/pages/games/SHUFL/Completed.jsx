import React, { useContext } from "react";
import { actions } from "./gameActions";
import { SHUFLDispatch } from "./SHUFLGame";

export default function SHUFLPuzzle() {
  const dispatch = useContext(SHUFLDispatch);
  return (
    <p>
      You win!{" "}
      <button
        onClick={() => {
          dispatch({ type: actions.restartGame });
        }}
      >
        Restart
      </button>
    </p>
  );
}
