import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import ReactModal from "react-modal";
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
import mapBriefsFunction from "../../../utils/stenoLayouts/mapBriefToAmericanStenoKeys";
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

const GiveKAOESfeedback = ({ idModifier = "" }) => (
  <p className={"text-center text-small"}>
    Got a suggestion?{" "}
    <a
      href="https://forms.gle/L8vGQTtLwKujLtFb7"
      className="mt0"
      target="_blank"
      rel="noopener noreferrer"
      id={`ga--KAOES--give-feedback${idModifier}`}
    >
      Give feedback (form opens in new tab)
    </a>
  </p>
);

export default function Game() {
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  const [previousCompletedPhraseAsTyped, setPreviousCompletedPhraseAsTyped] =
    useState("");
  const [typedText, setTypedText] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

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
    ReactModal.setAppElement("#js-app");
  }, []);

  const handleOpenModal = (event) => {
    event.preventDefault();
    setModalVisibility(true);
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    setModalVisibility(false);
  };

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
      : 0;

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
          <>
            <Completed gameName={gameName} dispatch={dispatch} />
            <div className="mt10">
              <GiveKAOESfeedback />
            </div>
          </>
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
            <div className="mw-320 mx-auto">
              <div className="flex flex-wrap items-center justify-center">
                <div className="mw-240">
                  <Input
                    onChangeInput={onChangeTextInput}
                    previousCompletedPhraseAsTyped={
                      previousCompletedPhraseAsTyped
                    }
                    round={state.roundIndex + 1}
                    typedText={typedText}
                    gameName={gameName}
                  />
                </div>
                <div className="ml1">
                  (
                  <button
                    className="de-emphasized-button text-small"
                    onClick={handleOpenModal}
                  >
                    help
                  </button>
                  <ReactModal
                    isOpen={modalVisibility}
                    aria={{
                      labelledby: "aria-modal-heading",
                      describedby: "aria-modal-description",
                    }}
                    ariaHideApp={true}
                    closeTimeoutMS={300}
                    role="dialog"
                    onRequestClose={handleCloseModal}
                    className={{
                      "base": "modal",
                      "afterOpen": "modal--after-open",
                      "beforeClose": "modal--before-close",
                    }}
                    overlayClassName={{
                      "base": "modal__overlay",
                      "afterOpen": "modal__overlay--after-open",
                      "beforeClose": "modal__overlay--before-close",
                    }}
                  >
                    <div className="fr">
                      <button
                        className="de-emphasized-button hide-md"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                    <h3 id="aria-modal-heading">Typed KAOES input</h3>
                    <div id="aria-modal-description">
                      <p>
                        To practice typing the keys instead of clicking on the
                        diagram, you can turn off all of your steno dictionaries
                        to produce raw steno output. That way, when you press
                        the{" "}
                        <kbd className="raw-steno-key raw-steno-key--subtle">
                          S
                        </kbd>{" "}
                        key, the steno engine will output “S” instead of “is”.
                        Likewise, pressing the{" "}
                        <kbd className="raw-steno-key raw-steno-key--subtle">
                          -T
                        </kbd>{" "}
                        key will output “-T” instead of “the”. The dash is
                        necessary for keys on the right-hand side of the board.
                      </p>
                      <div className={"mt1 mb0"}>
                        <GiveKAOESfeedback idModifier="--from-modal" />
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="button" onClick={handleCloseModal}>
                        OK
                      </button>
                    </div>
                  </ReactModal>
                  )
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
