import React, { useEffect, useReducer, useState } from "react";
import { actions } from "./gameActions";
import { initConfig, gameReducer, roundToWin, levelToWin } from "./gameReducer";
import Completed from "../components/Completed";
import Hint from "../components/Hint";
import Input from "../components/Input";
import Intro from "../components/Intro";
import LevelCompleted from "../utilities/LevelCompleted";
import Puzzle from "./Puzzle";
import GameProgress from "../components/GameProgress";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

const gameName = "TPEUBGSZ";
const introText =
  "Oh no! The steno robots have broken English! They’ve destroyed most of the useful words. The only bits left are prefixes and suffixes. And robot sounds. Let’s stick them together to make some new words for the robots.";

// @ts-expect-error TS(7031) FIXME: Binding element 'startingMetWordsToday' implicitly... Remove this comment to see the full error message
export default function Game({ startingMetWordsToday }) {
  const [typedText, setTypedText] = useState("");
  const [previousCompletedPhraseAsTyped, setPreviousCompletedPhraseAsTyped] =
    useState("");
  const [showHint, setShowHint] = useState(false);
  const [gameState, dispatch] = useReducer(
    gameReducer,
    undefined, // init state
    initConfig
  );

  useEffect(() => {
    setShowHint(false);
    const numberOfMetWords = Object.keys(startingMetWordsToday).length;
    // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
    dispatch({
      type: actions.gameStarted,
      payload: { numberOfMetWords },
    });
    setShowHint(false);
  }, [startingMetWordsToday]);

  // @ts-expect-error TS(7006) FIXME: Parameter 'inputText' implicitly has an 'any' type... Remove this comment to see the full error message
  const onChangeInput = (inputText) => {
    setTypedText(inputText);
    if (gameState.puzzleText === inputText.trim()) {
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(inputText);
      setShowHint(false);
      // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
      dispatch({ type: actions.roundCompleted });
    }
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-TPEUBGSZ-game" className="text-center mb3">
          TPEUBGSZ game
        </h3>
        {gameState.gameComplete ? (
          // @ts-expect-error TS(2322) FIXME: Type '{ gameName: string; dispatch: DispatchWithou... Remove this comment to see the full error message
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
              <GameProgress
                level={gameState.level}
                levelToWin={levelToWin}
                round={gameState.roundIndex + 1}
                roundToWin={roundToWin}
              />
            </div>
            {gameState.levelComplete ? (
              <LevelCompleted
                // @ts-expect-error TS(2322) FIXME: Type '{ dispatch: DispatchWithoutAction; gameName:... Remove this comment to see the full error message
                dispatch={dispatch}
                gameName={gameName}
                level={gameState.level}
              />
            ) : (
              <>
                <Puzzle puzzleText={gameState.puzzleText} />
                <Input
                  onChangeInput={onChangeInput}
                  previousCompletedPhraseAsTyped={
                    previousCompletedPhraseAsTyped
                  }
                  round={gameState.roundIndex + 1}
                  typedText={typedText}
                  gameName={gameName}
                />
                <Hint
                  currentStroke={gameState.currentHint}
                  gameName={gameName}
                  setShowHint={setShowHint}
                  showHint={showHint}
                />
              </>
            )}
          </>
        )}
        <p className="text-center mt10 text-small">
          Got a suggestion?{" "}
          <a
            href="https://forms.gle/P1tMjotG2w17CyyNA"
            className="mt0"
            target="_blank"
            rel="noopener noreferrer"
            id="ga--TPEUBGSZ--give-feedback"
          >
            Give feedback (form opens in new tab)
          </a>
        </p>
      </div>
    </div>
  );
}
