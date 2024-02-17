import React, { FC, useCallback, useRef } from "react";
import {
  useTPEURPBGSApi,
  useTPEURPBGSData,
} from "./TPEURPBGSContext/useTPEURPBGS";
import CustomFingerDrills from "./CustomFingerDrills";
import { fallbackMaterial } from "./gameReducer";

const TPEURPBGSNotStarted: FC = () => {
  const { isGameComplete, isGameStarted } = useTPEURPBGSData();
  const { gameStarted, materialSet } = useTPEURPBGSApi();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const clickStartHandler = useCallback(() => {
    gameStarted();
    materialSet(inputRef.current?.value || fallbackMaterial);
  }, [gameStarted, materialSet]);

  if (isGameStarted || isGameComplete) {
    return null;
  }

  return (
    <>
      <CustomFingerDrills inputRef={inputRef} />
      <p className="de-emphasized mt1">
        Enter some finger combos you want to alternate between smoothly without
        hesitating. Pro tip: turn off all your steno dictionaries to output
        “raw” steno.
      </p>
      <button className="button mr2" onClick={clickStartHandler}>
        Start
      </button>
    </>
  );
};
export default TPEURPBGSNotStarted;
