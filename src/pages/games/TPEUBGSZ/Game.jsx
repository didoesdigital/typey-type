import React, { useEffect, useReducer, useState } from "react";
import { actions } from "./gameActions";
import { initConfig, gameReducer } from "./gameReducer";
import Hint from "./Hint";
import Input from "./Input";
import Intro from "./Intro";
import Puzzle from "./Puzzle";
import Completed from "./Completed";
import RoundProgress from "./RoundProgress";

import { makeUpAWordAndHint } from "./Utilities";

export const TPEUBGSZDispatch = React.createContext(null);

export default function Game() {
  const [puzzleText, setPuzzleText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [currentStroke, setCurrentStroke] = useState("");
  const [previousCompletedPhraseAsTyped, setPreviousCompletedPhraseAsTyped] =
    useState("");
  const [showHint, setShowHint] = useState(false);
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined, // init state
    initConfig
  );

  useEffect(() => {
    const [madeUpWord, hint] = makeUpAWordAndHint();
    setPuzzleText(madeUpWord);
    setCurrentStroke(hint);
    setShowHint(false);
  }, []);

  const onChangeInput = (inputText) => {
    setTypedText(inputText);
    if (puzzleText === inputText.trim()) {
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(inputText);
      const [madeUpWord, hint] = makeUpAWordAndHint();
      setPuzzleText(madeUpWord);
      setCurrentStroke(hint);
      setShowHint(false);
      dispatch({ type: actions.moveToNextRound });
    }

    if (process.env.NODE_ENV === "development") console.log(puzzleText);
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-TPEUBGSZ-game" className="text-center mb3">
          TPEUBGSZ game
        </h3>
        {state.gameComplete ? (
          <TPEUBGSZDispatch.Provider value={dispatch}>
            <Completed />
          </TPEUBGSZDispatch.Provider>
        ) : (
          <>
            <div className="flex flex-wrap">
              <Intro />
              <RoundProgress round={state.roundIndex + 1} />
            </div>
            <Puzzle puzzleText={puzzleText} />
            <Input
              onChangeInput={onChangeInput}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              round={state.roundIndex + 1}
              typedText={typedText}
            />
            <Hint
              currentStroke={currentStroke}
              setShowHint={setShowHint}
              showHint={showHint}
            />
          </>
        )}
      </div>
    </div>
  );
}
