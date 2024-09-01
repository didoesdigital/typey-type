import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import GoogleAnalytics from "react-ga4";
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
import { mapQWERTYKeysToStenoStroke } from "../../../utils/typey-type";

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

export default function Game({ changeInputForKAOES, inputForKAOES }) {
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

  /** @param typedStenoKey { string } - string hopefully containing a raw steno or qwerty steno */
  const onChangeTextInput = (typedStenoKey) => {
    setTypedText(typedStenoKey);
    const trimmedTypedKey = typedStenoKey.trim();

    // Raw steno:
    const upperTrimmedKey = trimmedTypedKey.toUpperCase();
    const rawStenoKeyNumber = stenoTypedTextToKeysMapping[upperTrimmedKey] ?? 0;
    const tmpBoard = new Stroke();
    const rawStenoKey = tmpBoard.set(rawStenoKeyNumber);

    // QWERTY steno:
    const qwertyStenoTypedKey = mapQWERTYKeysToStenoStroke(trimmedTypedKey);

    const typedKeyStroke =
      inputForKAOES === "qwerty" ? qwertyStenoTypedKey : rawStenoKey;
    const comparableTypedKeyString = typedKeyStroke.toString();
    const comparableTypedKeyNumber =
      inputForKAOES === "qwerty"
        ? stenoTypedTextToKeysMapping[comparableTypedKeyString] ?? 0
        : rawStenoKeyNumber;

    if (puzzleText === comparableTypedKeyString) {
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(typedStenoKey);
      restartConfetti();
      setPuzzleText(choosePuzzleKey(comparableTypedKeyString));
      setStenoStroke(new Stroke());
      setRightWrongColor(rightColor);
      dispatch({ type: actions.roundCompleted });
    } else {
      // NOTE: we don't auto-clear just *any* incorrect steno input because we
      // need to allow multi-character keys like "-R" to be typed. Qwerty steno
      // is always 1 char so we auto-clear that incorrect input to make it
      // easier for people to try again with another character. For people
      // using raw steno and raw-steno.json with no * stroke for =undo, we
      // auto-clear incorrect input ending in ` *`
      if (inputForKAOES === "qwerty") {
        setTypedText("");
      } else {
        if (typedStenoKey.endsWith(" *")) {
          setTypedText("");
        }
      }

      setStenoStroke(stenoStroke.set(comparableTypedKeyNumber));
      setRightWrongColor(wrongColor);
    }
    setPreviousStenoStroke(tmpBoard.set(comparableTypedKeyNumber));
    dispatch({ type: actions.makeGuess });
  };

  const trackDownloadDictionary = () => {
    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label: "Raw steno dictionary",
    });
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
                  // NOTE: this is a hack to show "∞" when current round is higher than expected
                  round={state.roundIndex + 1 > 9 ? -1 : state.roundIndex + 1}
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
              <div className="flex flex-wrap items-center ml2">
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
                <div className="pt3">
                  <fieldset>
                    <legend>Raw or QWERTY steno input </legend>
                    <div className="flex flex-wrap">
                      <div className="flex justify-between">
                        <p className="radio mr3 mb0">
                          <label htmlFor="raw" className="">
                            <input
                              type="radio"
                              name="raw"
                              id="raw"
                              onChange={changeInputForKAOES}
                              checked={inputForKAOES === "raw"}
                            />{" "}
                            Raw (e.g.{" "}
                            <kbd className="steno-stroke steno-stroke--subtle">
                              -R
                            </kbd>
                            )
                          </label>
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="radio mr3 mb0">
                          <label htmlFor="qwerty" className="">
                            <input
                              type="radio"
                              name="qwerty"
                              id="qwerty"
                              onChange={changeInputForKAOES}
                              checked={inputForKAOES === "qwerty"}
                            />{" "}
                            QWERTY (e.g. "j")
                          </label>
                        </p>
                      </div>
                    </div>
                  </fieldset>
                  <div>
                    <button
                      className="de-emphasized-button text-small"
                      onClick={handleOpenModal}
                    >
                      Help with settings
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
                          You can practice memorising the keys by clicking on
                          the diagram or typing.
                        </p>
                        <h4>Raw steno</h4>
                        <p>
                          When the “Raw steno” setting is on, you need to type
                          “-T” to prove that you know that key. The dash is
                          necessary for keys on the right-hand side of the
                          board. There are 2 main options to type “raw steno”
                          keys like that:
                        </p>
                        <ol>
                          <li>
                            <a
                              href={
                                process.env.PUBLIC_URL +
                                "/dictionaries/didoesdigital/raw-steno.json"
                              }
                              download={"raw-steno.json"}
                              onClick={trackDownloadDictionary}
                            >
                              Download a dictionary to type raw steno
                            </a>{" "}
                            and set it as the highest priority dictionary in
                            Plover. When you're done playing the KAOES game,
                            disable the raw steno dictionary. Typey Type will
                            clear incorrect raw steno input ending in “&nbsp;*”.
                          </li>
                          <li>
                            Turn off all of your steno dictionaries to produce
                            raw steno output. That way, when you press the{" "}
                            <kbd className="steno-stroke steno-stroke--subtle">
                              -T
                            </kbd>{" "}
                            key, the steno engine will output “-T” instead of
                            “the”. Because the “*” key in Plover does undo by
                            default, you may still need to click the “*” key or
                            otherwise find a way to write “*”.
                          </li>
                        </ol>

                        <h4>QWERTY steno</h4>
                        <p>
                          When the “QWERTY steno” setting is on, type regular
                          QWERTY letters in the equivalent position of the
                          matching steno key. For example, to press the right{" "}
                          <kbd className="steno-stroke steno-stroke--subtle">
                            -R
                          </kbd>{" "}
                          key, type “j” on the keyboard.
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
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
