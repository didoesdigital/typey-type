import React, { useEffect, useReducer, useState } from "react";
import { actions } from "../utilities/gameActions";
import { initConfig, gameReducer } from "./gameReducer";
import Completed from "../components/Completed";
import Hint from "../components/Hint";
import Input from "./Input";
import Intro from "./Intro";
import Puzzle from "./Puzzle";
import RoundProgress from "./RoundProgress";
import { createStrokeHintForPhrase } from "../../../utils/transformingDictionaries";

import {
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./utilities";

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
          <Completed gameName="SHUFL" dispatch={dispatch} />
        ) : (
          <>
            <div className="flex flex-wrap">
              <Intro />
              <RoundProgress round={state.roundIndex + 1} />
            </div>
            <Puzzle puzzleText={puzzleText} />
            <Input
              onChangeSHUFLInput={onChangeSHUFLInput}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              round={state.roundIndex + 1}
              typedText={typedText}
            />
            <Hint
              currentStroke={currentStroke}
              gameName="SHUFL"
              setShowHint={setShowHint}
              showHint={showHint}
            />
          </>
        )}
      </div>
    </div>
  );
}
