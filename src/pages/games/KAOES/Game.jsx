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
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

// import {
//   getRightAnswers,
//   pickAWord,
//   selectMaterial,
//   shuffleWord,
// } from "./utilities";

const gameName = "KAOES";
const introText =
  "The mischievous steno robots have hidden all the steno keys. You need to find where they belong on the steno diagram.";

export default function Game() {
  // const [material, setMaterial] = useState([]);
  const [puzzleText, setPuzzleText] = useState("-P");
  // const [rightAnswers, setRightAnswers] = useState([]);
  // const [typedText, setTypedText] = useState("");
  // const [currentStroke, setCurrentStroke] = useState("");
  // const [previousCompletedPhraseAsTyped, setPreviousCompletedPhraseAsTyped] =
  //   useState("");
  // const [showHint, setShowHint] = useState(false);
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined, // init state
    initConfig
  );

  // useEffect(() => {
  //   const filteredMetWords = selectMaterial(startingMetWordsToday);
  //   setMaterial(filteredMetWords);
  //   const pickedWord = pickAWord(filteredMetWords);
  //   setPuzzleText(shuffleWord(pickedWord));
  //   setCurrentStroke(
  //     createStrokeHintForPhrase(pickedWord.trim(), globalLookupDictionary)
  //   );
  //   setShowHint(false);
  //   setRightAnswers(getRightAnswers(filteredMetWords, pickedWord));
  // }, [startingMetWordsToday, globalLookupDictionary]);

  // const onChangeInput = (inputText) => {
  //   // setTypedText(inputText);
  //   // if (rightAnswers.includes(inputText.trim())) {
  //   //   updateMetWords(inputText);
  //   //   setTypedText("");
  //   //   setPreviousCompletedPhraseAsTyped(inputText);
  //   //   const pickedWord = pickAWord(material);
  //   //   setPuzzleText(shuffleWord(pickedWord));
  //   //   setCurrentStroke(
  //   //     createStrokeHintForPhrase(pickedWord.trim(), globalLookupDictionary)
  //   //   );
  //   //   setShowHint(false);
  //   //   setRightAnswers(getRightAnswers(material, pickedWord));
  //     dispatch({ type: actions.moveToNextRound });
  //   }
  // };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-SHUFL-game" className="text-center mb3">
          KAOES game
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
                    role="image"
                    aria-labelledby="thinking-robot-title"
                  />
                }
              />
              <RoundProgress round={state.roundIndex + 1} />
            </div>
            <Puzzle puzzleText={puzzleText} />
            Diagram goes here
          </>
        )}
      </div>
    </div>
  );
}
