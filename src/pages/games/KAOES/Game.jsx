import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as Confetti from "../../../utils/confetti.js";
import { actions } from "../utilities/gameActions";
import { initConfig, gameReducer, roundToWin } from "./gameReducer";
import Completed from "../components/Completed";
import Intro from "../components/Intro";
import Input from "../components/Input";
import GameProgress from "../components/GameProgress";
import StenoLayoutDiagram from "../../../StenoLayout/AmericanStenoDiagram";
import Stroke from "../../../utils/stroke";
import mapBriefsFunction from '../../../utils/stenoLayouts/mapBriefToAmericanStenoKeys';
import Puzzle from "./Puzzle";
import { ReactComponent as MischievousRobot } from "../../../images/MischievousRobot.svg";
import { choosePuzzleKey, prettyKey } from "./utilities";
import * as stroke from "../../../utils/stroke";

const stenoTypedTextToKeysMapping = {
  "-Z": stroke.Z,
  "-D": stroke.D,
  "-S": stroke.RS,
  "-T": stroke.RT,
  "-G": stroke.G,
  "-L": stroke.L,
  "-B": stroke.B,
  "-P": stroke.RP,
  "-R": stroke.RR,
  "-F": stroke.F,
  "U": stroke.U,
  "E": stroke.E,
  "*": stroke.STAR,
  "O": stroke.O,
  "A": stroke.A,
  "R": stroke.R,
  "H": stroke.H,
  "W": stroke.W,
  "P": stroke.P,
  "K": stroke.K,
  "T": stroke.T,
  "S": stroke.S,
  "#": stroke.HASH,
  "Z": stroke.Z,
  "D": stroke.D,
  "G": stroke.G,
  "L": stroke.L,
  "B": stroke.B,
  "F": stroke.F,
};

const particles = [];
const gameName = "KAOES";
const introText =
  "The mischievous steno robots have hidden all the steno keys. You need to find where they belong on the steno diagram.";
const rightColor = "#1F74D1";
const wrongColor = "#953159";
const neutralDarkColor = "#504C57";
const neutralLightColor = "#F2F1F4";
const diagramWidth = 568;

export default function Game() {
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  const [previousCompletedPhraseAsTyped, setPreviousCompletedPhraseAsTyped] =
    useState("");
  const [typedText, setTypedText] = useState("");

  const [puzzleText, setPuzzleText] = useState("");
  const [stenoStroke, setStenoStroke] = useState(new Stroke());
  const [previousStenoStroke, setPreviousStenoStroke] = useState(new Stroke());
  const [rightWrongColor, setRightWrongColor] = useState(neutralDarkColor);
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined, // init state
    initConfig
  );
  useEffect(() => {
    setPuzzleText(choosePuzzleKey(""));
  }, []);

  const restartConfetti = useCallback(() => {
    particles.splice(0);
    Confetti.cancelAnimation();
    Confetti.setupCanvas({ sparsity: 240, colors: 4 }, "good-guess", particles);
    Confetti.restartAnimation(
      particles,
      canvasRef.current,
      canvasWidth,
      canvasHeight
    );
  }, [canvasRef, canvasWidth, canvasHeight]);

  const onClickHandler = (key) => {
    if (!key) {
      return;
    }
    const tmpBoard = new Stroke();
    const clickedKey = tmpBoard.set(key).toString();
    if (puzzleText === clickedKey) {
      setPreviousCompletedPhraseAsTyped("");
      restartConfetti();
      setPuzzleText(choosePuzzleKey(clickedKey));
      setStenoStroke(new Stroke());
      setRightWrongColor(rightColor);
      dispatch({ type: actions.roundCompleted });
    } else {
      setStenoStroke(stenoStroke.set(key));
      setRightWrongColor(wrongColor);
    }
    setPreviousStenoStroke(tmpBoard.set(key));
    dispatch({ type: actions.makeGuess });
  };

  const onChangeTextInput = (typedStenoKey) => {
    setTypedText(typedStenoKey);
    const trimmedTypedKey = typedStenoKey.trim().toUpperCase();
    const key = stenoTypedTextToKeysMapping[trimmedTypedKey]
      ? stenoTypedTextToKeysMapping[trimmedTypedKey]
      : "";

    const tmpBoard = new Stroke();
    const clickedKey = tmpBoard.set(key).toString();

    if (puzzleText === clickedKey) {
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(typedStenoKey);
      restartConfetti();
      setPuzzleText(choosePuzzleKey(clickedKey));
      setStenoStroke(new Stroke());
      setRightWrongColor(rightColor);
      dispatch({ type: actions.roundCompleted });
    } else {
      setStenoStroke(stenoStroke.set(key));
      setRightWrongColor(wrongColor);
    }
    setPreviousStenoStroke(tmpBoard.set(key));
    dispatch({ type: actions.makeGuess });
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <h3 id="typey-type-SHUFL-game" className="text-center mb3">
          KAOES game
        </h3>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="fixed top-0 left-0 celebration-canvas pointer-none"
        />
        {state.gameComplete ? (
          <Completed gameName={gameName} dispatch={dispatch} />
        ) : (
          <>
            <div className="flex flex-wrap pb1">
              <Intro
                introText={introText}
                robot={
                  <MischievousRobot
                    id="mischievous-robot-KAOES"
                    role="img"
                    aria-labelledby="mischievous-robot-title"
                  />
                }
              />
              <div id={"good-guess"} className="flex flex-grow">
                <GameProgress
                  round={state.roundIndex + 1}
                  roundToWin={roundToWin}
                />
              </div>
            </div>
            <Puzzle puzzleText={prettyKey(puzzleText)} />
            <div className="flex flex-wrap flex-grow justify-center pt1 pb3">
              <div className="inline-flex relative mx-auto mw100">
                <TransitionGroup
                  className={
                    "duplicate-steno-diagram absolute pointer-none w-100"
                  }
                  component={"div"}
                  key={previousStenoStroke.toString()}
                >
                  <CSSTransition
                    timeout={5000}
                    classNames="key-dissolve"
                    appear={true}
                  >
                    <div className="avoid-transition-classes-clashing-on-child-component">
                      <StenoLayoutDiagram
                        id="duplicateStenoDiagram"
                        {...mapBriefsFunction(
                          state.firstGuess ? "" : previousStenoStroke.toString()
                        )}
                        brief={`duplicate-${puzzleText}`}
                        classes="w-100 steno-diagram-svg"
                        diagramWidth={diagramWidth}
                        handleOnClick={undefined}
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
                  classes="steno-diagram-svg"
                  id="stenoDiagram"
                  {...mapBriefsFunction(stenoStroke.toString())}
                  handleOnClick={onClickHandler}
                  brief={puzzleText}
                  diagramWidth={diagramWidth}
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
        <Input
          onChangeInput={onChangeTextInput}
          previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
          round={state.roundIndex + 1}
          typedText={typedText}
          gameName={gameName}
        />
        <p
          className={`text-center text-small ${
            state.gameComplete ? "mt10" : "mt1 mb0"
          }`}
        >
          Got a suggestion?{" "}
          <a
            href="https://forms.gle/L8vGQTtLwKujLtFb7"
            className="mt0"
            target="_blank"
            rel="noopener noreferrer"
            id="ga--KAOES--give-feedback"
          >
            Give feedback (form opens in new tab)
          </a>
        </p>
      </div>
    </div>
  );
}
