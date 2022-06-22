import React, { useEffect, useReducer, useState } from "react";
import { actions } from "../utilities/gameActions";
import { initConfig, gameReducer } from "./gameReducer";
import Completed from "../components/Completed";
import Hint from "../components/Hint";
import Input from "../components/Input";
import Intro from "../components/Intro";
import RoundProgress from "../components/RoundProgress";
import Puzzle from "./Puzzle";
import { ReactComponent as RaverRobot } from "../../../images/RaverRobot.svg";
import { createStrokeHintForPhrase } from "../../../utils/transformingDictionaries";

import {
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./utilities";

const gameName = "SHUFL";
const introText =
  "The steno robots have been dancing too much and shuffled all the letters out of order! You need to type the correct word to get them all back in order.";

export default function Game({
  globalLookupDictionary,
  startingMetWordsToday,
  updateMetWords,
}) {
  const [material, setMaterial] = useState([]);
  const [puzzleText, setPuzzleText] = useState("");
  const [rightAnswers, setRightAnswers] = useState([]);
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
    const filteredMetWords = selectMaterial(startingMetWordsToday);
    setMaterial(filteredMetWords);
    const pickedWord = pickAWord(filteredMetWords);
    setPuzzleText(shuffleWord(pickedWord));
    setCurrentStroke(
      createStrokeHintForPhrase(pickedWord.trim(), globalLookupDictionary)
    );
    setShowHint(false);
    setRightAnswers(getRightAnswers(filteredMetWords, pickedWord));
  }, [startingMetWordsToday, globalLookupDictionary]);

  const onChangeSHUFLInput = (inputText) => {
    setTypedText(inputText);
    if (rightAnswers.includes(inputText.trim())) {
      updateMetWords(inputText);
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(inputText);
      const pickedWord = pickAWord(material);
      setPuzzleText(shuffleWord(pickedWord));
      setCurrentStroke(
        createStrokeHintForPhrase(pickedWord.trim(), globalLookupDictionary)
      );
      setShowHint(false);
      setRightAnswers(getRightAnswers(material, pickedWord));
      dispatch({ type: actions.moveToNextRound });
    }

    if (process.env.NODE_ENV === "development") console.log(rightAnswers);
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-SHUFL-game" className="text-center mb3">
          SHUFL game
        </h3>
        {state.gameComplete ? (
          <Completed gameName={gameName} dispatch={dispatch} />
        ) : (
          <>
            <div className="flex flex-wrap">
              <Intro
                introText={introText}
                robot={
                  <RaverRobot
                    id="raver-robot-SHUFL"
                    role="image"
                    aria-labelledby="raver-robot-title"
                  />
                }
              />
              <RoundProgress round={state.roundIndex + 1} />
            </div>
            <Puzzle puzzleText={puzzleText} />
            <Input
              onChangeInput={onChangeSHUFLInput}
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
