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
const rightColor = "#5598E2";
const wrongColor = "#E26F99";
const neutralDarkColor = "#868091";
const neutralLightColor = "#F2F1F4";

export default function Game() {
  const [puzzleText, setPuzzleText] = useState("");
  const [stenoStroke, setStenoStroke] = useState(new Stroke());
  const [previousStenoStroke, setPreviousStenoStroke] = useState(new Stroke());
  const [rightWrongColor, setRightWrongColor] = useState("#898989");
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
      setRightWrongColor(rightColor);
      dispatch({ type: actions.moveToNextRound });
    } else {
      console.log("Adding the clicked key to the steno board diagram…");
      setStenoStroke(stenoStroke.set(key));
      setRightWrongColor(wrongColor);
    }
    setPreviousStenoStroke(tmpBoard.set(key));
    console.log("CLICKED");
  };

  console.log(previousStenoStroke);
  const teft = { ...mapBriefsFunction(previousStenoStroke.toString()) };
  console.log(teft);

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
                <TransitionGroup
                  className={""}
                  component={"div"}
                  key={previousStenoStroke.toString()}
                >
                  <CSSTransition
                    timeout={5000}
                    classNames="key-dissolve"
                    appear={true}
                  >
                    <div className="absolute pointer-none">
                      <StenoLayoutDiagram
                        id="duplicateStenoDiagram"
                        {...mapBriefsFunction(previousStenoStroke.toString())}
                        handleOnClick={undefined}
                        brief={`duplicate-${puzzleText}`}
                        diagramWidth="440"
                        onStrokeColor={rightWrongColor}
                        offStrokeColor="transparent"
                        onTextColor="#fff"
                        offTextColor="transparent"
                        onKeyColor={rightWrongColor}
                        offKeyColor="transparent"
                      />
                    </div>
                  </CSSTransition>
                </TransitionGroup>
                <StenoLayoutDiagram
                  id="stenoDiagram"
                  {...mapBriefsFunction(stenoStroke.toString())}
                  handleOnClick={onClickHandler}
                  brief={puzzleText}
                  diagramWidth="440"
                  hideLetters={true}
                  onStrokeColor={neutralDarkColor}
                  offStrokeColor={neutralDarkColor}
                  onTextColor="#fff"
                  offTextColor="#fff"
                  onKeyColor={neutralDarkColor}
                  offKeyColor={neutralLightColor}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
