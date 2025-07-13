import React, { useEffect, useReducer, useState } from "react";
import { actions } from "./gameActions";
import { initConfig, gameReducer, roundToWin, levelToWin } from "./gameReducer";
import Completed from "../components/Completed";
import Hint from "../components/Hint";
import Input from "../components/Input";
import Intro from "../components/Intro";
import GameProgress from "../components/GameProgress";
import LevelCompleted from "../utilities/LevelCompleted";
import Puzzle from "./Puzzle";
import { ReactComponent as RaverRobot } from "../../../images/RaverRobot.svg";

const gameName = "SHUFL";
const introText =
  "The steno robots have been dancing too much and shuffled all the letters! You need to type the correct word to get them all back in order.";

export default function Game({
  // @ts-expect-error TS(7031) FIXME: Binding element 'globalLookupDictionary' implicitl... Remove this comment to see the full error message
  globalLookupDictionary,
  // @ts-expect-error TS(7031) FIXME: Binding element 'globalLookupDictionaryLoaded' imp... Remove this comment to see the full error message
  globalLookupDictionaryLoaded,
  // @ts-expect-error TS(7031) FIXME: Binding element 'startingMetWordsToday' implicitly... Remove this comment to see the full error message
  startingMetWordsToday,
  // @ts-expect-error TS(7031) FIXME: Binding element 'updateMetWords' implicitly has an... Remove this comment to see the full error message
  updateMetWords,
}) {
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
    // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
    dispatch({
      type: actions.gameStarted,
      payload: { startingMetWordsToday, globalLookupDictionary },
    });
    setShowHint(false);
  }, [startingMetWordsToday, globalLookupDictionary]);

  // @ts-expect-error TS(7006) FIXME: Parameter 'inputText' implicitly has an 'any' type... Remove this comment to see the full error message
  const onChangeSHUFLInput = (inputText) => {
    setTypedText(inputText);
    if (gameState.rightAnswers.includes(inputText.trim().toLowerCase())) {
      updateMetWords(inputText.trim());
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(inputText);
      setShowHint(false);
      // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
      dispatch({ type: actions.roundCompleted });
    }

    if (process.env.NODE_ENV === "development")
      console.log(gameState.rightAnswers);
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-SHUFL-game" className="text-center mb3">
          SHUFL game
        </h3>
        {gameState.gameComplete ? (
          <Completed gameName={gameName} dispatch={dispatch} />
        ) : (
          <>
            <div className="flex flex-wrap">
              <Intro
                introText={introText}
                robot={
                  <RaverRobot
                    id="raver-robot-SHUFL"
                    role="img"
                    aria-labelledby="raver-robot-title"
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
            {!globalLookupDictionaryLoaded ? (
              <p className="text-center de-emphasized pt6">
                Loading dictionaries…
              </p>
            ) : gameState.levelComplete ? (
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
                  onChangeInput={onChangeSHUFLInput}
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
            href="https://forms.gle/wtU8phNLPpDsGdCZ7"
            className="mt0"
            target="_blank"
            rel="noopener noreferrer"
            id="ga--SHUFL--give-feedback"
          >
            Give feedback (form opens in new tab)
          </a>
        </p>
      </div>
    </div>
  );
}
