import React, { useEffect, useReducer, useState } from "react";
import { actions } from "./gameActions";
import { initConfig, gameReducer } from "./gameReducer";
import { ReactComponent as RaverRobot } from "../../../images/RaverRobot.svg";
import SHUFLInput from "./SHUFLInput";
import SHUFLPuzzle from "./SHUFLPuzzle";
import Completed from "./Completed";
import RoundProgress from "./RoundProgress";
import { createStrokeHintForPhrase } from "../../../utils/transformingDictionaries";

import {
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./SHUFLUtilities";

export const SHUFLDispatch = React.createContext(null);

export default function SHUFLGame({
  globalLookupDictionary,
  startingMetWordsToday,
  updateMetWords,
}) {
  const [material, setMaterial] = useState([]);
  const [puzzleText, setPuzzleText] = useState("");
  const [rightAnswers, setRightAnswers] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [currentStroke, setCurrentStroke] = useState("");
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
          <SHUFLDispatch.Provider value={dispatch}>
            <Completed />
          </SHUFLDispatch.Provider>
        ) : (
          <>
            <div className="flex flex-wrap">
              <div className="mw-844 mr3 flex-grow">
                <div className="flex">
                  <div className="w-100 mw-48 mr3">
                    <RaverRobot id="raver-robot-SHUFL" />
                  </div>
                  <p>
                    The steno robots have been dancing too much and shuffled all
                    the letters out of order! You need to type the correct word
                    to get them all back in order.
                  </p>
                </div>
              </div>
              <RoundProgress round={state.roundIndex + 1} />
            </div>
            <SHUFLPuzzle puzzleText={puzzleText} />
            <SHUFLInput
              typedText={typedText}
              onChangeSHUFLInput={onChangeSHUFLInput}
            />
            {!showHint && (
              <p className="mt3 text-center">
                <a
                  href="#hint"
                  className="dib"
                  onClick={() => setShowHint(true)}
                >
                  Hint?
                </a>
              </p>
            )}
            <div
              className={`flex justify-center${showHint ? " mt3" : ""}`}
              id="hint"
              tabIndex={-1}
            >
              <pre
                className={`overflow-auto mw-408 text-small flex${
                  showHint ? "" : " hide"
                }`}
                aria-hidden={!showHint}
              >
                <span
                  className="steno-stroke pa05 text-small"
                  role="note"
                  aria-label={[...currentStroke].join(" ").replace("-", "dash")}
                >
                  {[...currentStroke].map((item, i) => (
                    <React.Fragment key={i}>{item}</React.Fragment>
                  ))}
                </span>
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
