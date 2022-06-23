import React, { useEffect, useReducer, useState } from "react";
import { actions } from "../utilities/gameActions";
import { initConfig, gameReducer } from "./gameReducer";
import Completed from "../components/Completed";
import Intro from "../components/Intro";
import RoundProgress from "../components/RoundProgress";
import StenoLayoutDiagram from "../../../StenoLayout/AmericanStenoDiagram";
import Stroke from "../../../utils/stroke";
import { mapBriefToAmericanStenoKeys as mapBriefsFunction } from "../../../utils/typey-type";
import Puzzle from "./Puzzle";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";
import { choosePuzzleKey } from "./utilities";

const unambiguousRightHandKeysRegExp = new RegExp(/^-[EUFBLGDZ]$/);

const gameName = "KAOES";
const introText =
  "The mischievous steno robots have hidden all the steno keys. You need to find where they belong on the steno diagram.";

export default function Game() {
  const [puzzleText, setPuzzleText] = useState("");
  const [stenoStroke, setStenoStroke] = useState(new Stroke());
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined, // init state
    initConfig
  );
  useEffect(() => {
    setPuzzleText(choosePuzzleKey(""));
  }, []);

  const onClickHandler = (key) => {
    const tmpBoard = new Stroke();
    const clickedKey = tmpBoard.set(key).toString();
    console.log("Puzzle text: ", puzzleText);
    console.log("Clicked: ", clickedKey);
    if (puzzleText === clickedKey) {
      console.log("Setting a new puzzle and clearing the steno stroke…");

      const newPuzzleText = choosePuzzleKey(clickedKey);
      console.log("newPuzzleText", newPuzzleText);
      setPuzzleText(newPuzzleText);
      // setPuzzleText(choosePuzzleKey(clickedKey));

      setStenoStroke(new Stroke());
      dispatch({ type: actions.moveToNextRound });
    } else {
      console.log("Adding the clicked key to the steno board diagram…");
      setStenoStroke(stenoStroke.set(key));
    }
  };

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
            <Puzzle
              puzzleText={
                unambiguousRightHandKeysRegExp.test(puzzleText)
                  ? puzzleText.replace("-", "")
                  : puzzleText
              }
            />
            <div className="flex flex-wrap flex-grow justify-center">
              <StenoLayoutDiagram
                id="stenoDiagram"
                {...mapBriefsFunction(stenoStroke.toString())}
                handleOnClick={onClickHandler}
                brief={puzzleText}
                diagramWidth="440"
                hideLetters={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
