import React, { useEffect, useReducer, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
import { choosePuzzleKey, prettyKey } from "./utilities";

const gameName = "KAOES";
const introText =
  "The mischievous steno robots have hidden all the steno keys. You need to find where they belong on the steno diagram.";

export default function Game() {
  const [puzzleText, setPuzzleText] = useState("");
  const [stenoStroke, setStenoStroke] = useState(new Stroke());
  const [previousClickedKey, setPreviousClickedKey] = useState("");
  const [keyX, setKeyX] = useState(0);
  const [keyY, setKeyY] = useState(0);
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined, // init state
    initConfig
  );
  useEffect(() => {
    setPuzzleText(choosePuzzleKey(""));
  }, []);

  const onClickHandler = (key, event) => {
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
    console.log("CLICKED");
    // console.log(event.target.offsetLeft);
    // console.log(event.target.offsetTop);
    console.log(event.target);
    setPreviousClickedKey(clickedKey);
    console.log(document.getElementById(event.target.id));
    // console.log(document.getElementById(event.target.id).getBBox().x);
    console.log(document.getElementById(event.target.id).getBBox().x);
    const keyElement = document.getElementById(event.target.id);
    const keyBBox = keyElement ? keyElement.getBBox() : { x: 0, y: 0 };
    const keyPosition = [keyBBox.x * 2.04651163, keyBBox.y * 2.03960396 + 5];
    setKeyX(keyPosition[0]);
    setKeyY(keyPosition[1]);
    // setKeyX(document.getElementById(event.target.id).getBBox().x * 2.04651163);
    // setKeyY(document.getElementById(event.target.id).getBBox().y * 2.03960396);
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
            <div className="flex flex-wrap pb3">
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
            <Puzzle puzzleText={prettyKey(puzzleText)} />
            <div className="flex flex-wrap flex-grow justify-center py3">
              <div className="inline-flex relative mx-auto">
                <div
                  id="duplicateKey"
                  className="absolute flex items-center justify-center pointer-none"
                  style={{
                    transform: `translate(${keyX}px, ${keyY}px)`,
                    width: "9.37%",
                  }}
                >
                  <p
                    className="lede text-center mb0 color-white"
                    style={{
                      fontSize: "47px",
                      fontWeight: "700",
                      lineHeight: 1,
                    }}
                  >
                    <TransitionGroup
                      className={""}
                      component={"span"}
                      key={previousClickedKey}
                    >
                      <CSSTransition
                        timeout={5000}
                        classNames="key-dissolve"
                        appear={true}
                      >
                        <span>{previousClickedKey.replace("-", "")}</span>
                      </CSSTransition>
                    </TransitionGroup>
                  </p>
                </div>
                <StenoLayoutDiagram
                  id="stenoDiagram"
                  {...mapBriefsFunction(stenoStroke.toString())}
                  handleOnClick={onClickHandler}
                  brief={puzzleText}
                  diagramWidth="440"
                  hideLetters={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
