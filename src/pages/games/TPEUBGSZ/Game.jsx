import React, { useEffect, useReducer, useState } from "react";
import { actions } from "../utilities/gameActions";
import { initConfig, gameReducer } from "./gameReducer";
import Completed from "../components/Completed";
import Hint from "../components/Hint";
import Input from "../components/Input";
import Intro from "../components/Intro";
import Puzzle from "./Puzzle";
import RoundProgress from "../components/RoundProgress";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

import { makeUpAWordAndHint } from "./Utilities";

const gameName = "TPEUBGSZ";
const introText =
  "Oh no! The steno robots have broken English! They’ve destroyed most of the useful words. The only bits left are prefixes and suffixes. And robot sounds. Let’s stick them together to make some new words for the robots.";

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
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-TPEUBGSZ-game" className="text-center mb3">
          TPEUBGSZ game
        </h3>
        {state.gameComplete ? (
          <Completed gameName={gameName} dispatch={dispatch} />
        ) : (
          <>
            <div className="flex flex-wrap">
              <Intro
                introText={introText}
                robot={
                  <ThinkingRobot
                    id="thinking-robot-TPEUBGSZ"
                    role="img"
                    aria-labelledby="thinking-robot-title"
                  />
                }
              />
              <RoundProgress round={state.roundIndex + 1} />
            </div>
            <Puzzle puzzleText={puzzleText} />
            <Input
              onChangeInput={onChangeInput}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              round={state.roundIndex + 1}
              typedText={typedText}
              gameName={gameName}
            />
            <Hint
              currentStroke={currentStroke}
              gameName={gameName}
              setShowHint={setShowHint}
              showHint={showHint}
            />
          </>
        )}
      </div>
    </div>
  );
}
