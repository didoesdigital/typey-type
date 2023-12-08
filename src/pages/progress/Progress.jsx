import React, { useEffect, useRef, useState } from "react";
import GoogleAnalytics from "react-ga4";
import ErrorBoundary from "../../components/ErrorBoundary";
import PseudoContentButton from "../../components/PseudoContentButton";
import RecommendationBox from "./components/RecommendationBox";
import RecentLessons from "./components/RecentLessons";
import * as Confetti from "../../utils/confetti";
import { getLessonIndexData } from "../../utils/lessonIndexData";
import { Link, Redirect } from "react-router-dom";
import FlashcardsSection from "./components/FlashcardsSection";
import TodaysEffortsOrGoals from "./components/TodaysEffortsOrGoals";
import ReformatProgress from "./components/ReformatProgress";
import ProgressSummaryAndLinks from "./components/ProgressSummaryAndLinks";
import LessonsProgress from "./components/LessonsProgress";
import DownloadProgressButton from "./components/DownloadProgressButton";
import Subheader from "../../components/Subheader";

const skipButtonId = "js-flashcards-skip-button";
const mobileSkipButtonId = "js-mobile-flashcards-skip-button";

let particles = [];

// type Props = {
//   changeFlashcardCourseLevel: any,
//   flashcardsNextLesson: any,
//   globalUserSettings: any,
//   lessonIndex: any,
//   lessonsProgress: any,
//   metWords: any,
//   newWordsGoalUnveiled: any,
//   oldWordsGoalUnveiled: any,
//   recentLessonHistory: any,
//   recommendationHistory: any,
//   recommendedNextLesson: any,
//   setPersonalPreferences: any,
//   startingMetWordsToday: any,
//   updateFlashcardsRecommendation: any,
//   updateRecommendationHistory: any,
//   updateStartingMetWordsAndCounts: any,
//   updateUserGoals: any,
//   updateUserGoalsUnveiled: any,
//   userGoals: any,
//   userSetting: UserSettings,
//   yourMemorisedWordCount: any,
//   yourSeenWordCount: any,
// }

const Progress = (props) => {
  const mainHeading = useRef(null);
  const canvas = useRef(null);
  const firstGoalsRender = useRef(true);
  const firstRecommendationBoxRender = useRef(true);

  const [canvasWidth] = useState(Math.floor(window.innerWidth));
  const [canvasHeight] = useState(Math.floor(window.innerHeight));
  const [flashWarning, setFlashWarning] = useState("");
  const [loadingLessonIndex, setLoadingLessonIndex] = useState(true);
  const [reducedSaveAndLoad] = useState(
    Object.keys(props.metWords).length > 2000 ? true : false
  );
  const [showLoadInput, setShowLoadInput] = useState(false);
  const [toRecommendedNextLesson, setToRecommendedNextLesson] = useState(false);
  const [showSetGoalsForm, setShowSetGoalsForm] = useState(false);
  const [todayNewWordCount, setTodayNewWordCount] = useState(0);
  const [todayOldWordCount, setTodayOldWordCount] = useState(0);
  const [oldWordsGoalMet, setOldWordsGoalMet] = useState(false);
  const [newWordsGoalMet, setNewWordsGoalMet] = useState(false);
  const [userGoalInputOldWords, setUserGoalInputOldWords] = useState(50);
  const [userGoalInputNewWords, setUserGoalInputNewWords] = useState(15);

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }

    getLessonIndexData()
      .then((lessonIndex) => {
        if (props.recommendationHistory?.["currentStep"] === null) {
          props.updateRecommendationHistory(
            props.recommendationHistory,
            lessonIndex
          );
          props.updateFlashcardsRecommendation();
        }
        setLoadingLessonIndex(false);
      })
      .catch((e) => {
        console.error(e);
      });

    const [todayOldWordCountToUpdate, todayNewWordCountToUpdate] =
      Object.entries(props.metWords).reduce(
        (accumulator, [phrase, timesSeen]) => {
          if (
            props.startingMetWordsToday[phrase] &&
            timesSeen - props.startingMetWordsToday[phrase] > 0
          ) {
            accumulator[0] += 1;
          } else if (!props.startingMetWordsToday[phrase] && timesSeen > 0) {
            accumulator[1] += 1;
          }
          return accumulator;
        },
        [0, 0]
      );

    const oldWordsGoalMetToUpdate =
      props.userGoals.oldWords <= todayOldWordCountToUpdate
        ? true
        : oldWordsGoalMet;
    const newWordsGoalMetToUpdate =
      props.userGoals.newWords <= todayNewWordCountToUpdate
        ? true
        : newWordsGoalMet;

    setOldWordsGoalMet(oldWordsGoalMetToUpdate);
    setNewWordsGoalMet(newWordsGoalMetToUpdate);
    setTodayNewWordCount(todayNewWordCountToUpdate);
    setTodayOldWordCount(todayOldWordCountToUpdate);
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstGoalsRender.current) {
      firstGoalsRender.current = false;
    } else {
      if (showSetGoalsForm) {
        const element = document.getElementById(
          "js-first-interactive-form-field-element"
        );
        if (element) {
          element.focus();
        }
      } else if (!showSetGoalsForm) {
        const element = document.getElementById("js-set-goals-button");
        if (element) {
          element.focus();
        }
      }
    }
  }, [showSetGoalsForm]);

  useEffect(() => {
    if (reducedSaveAndLoad && showLoadInput) {
      const element = document.getElementById(
        "js-metwords-from-personal-store--small"
      );
      if (element) {
        element.focus();
      }
    }
  }, [reducedSaveAndLoad, showLoadInput]);

  useEffect(() => {
    return () => {
      setLoadingLessonIndex(false);
    };
  }, []);

  function startRecommendedStep(e) {
    GoogleAnalytics.event({
      category: "Recommendations",
      action: "Start recommended step",
      label: props.recommendedNextLesson.link || "BAD_INPUT",
    });

    if (props.recommendedNextLesson.link?.startsWith("http")) {
      // lets external link open in a new tab
      props.updateRecommendationHistory(props.recommendationHistory);
    } else {
      setToRecommendedNextLesson(true);
      // does not navigate using link but instead allows Router Redirect
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (firstRecommendationBoxRender.current) {
      firstRecommendationBoxRender.current = false;
    } else {
      props.updateRecommendationHistory(props.recommendationHistory);
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toRecommendedNextLesson]);

  function showLoadInputFn() {
    setShowLoadInput(true);
  }

  function handleLoadProgress() {
    const textareas = document.querySelectorAll(
      ".js-metwords-from-personal-store"
    );
    const textareaContents = textareas.length > 1 ? textareas[1] : textareas[0];

    props.setPersonalPreferences(textareaContents.value);
    setFlashWarning("To update your lesson progress, visit the lessons.");

    let numberOfMetWords = "0";
    try {
      const parsedMetWords = JSON.parse(textareaContents.value);
      numberOfMetWords = Object.keys(parsedMetWords).length.toString();

      props.updateStartingMetWordsAndCounts(parsedMetWords);

      props.updateUserGoalsUnveiled(false, false);
      setTodayOldWordCount(0);
      setTodayNewWordCount(0);
      setOldWordsGoalMet(false);
      setNewWordsGoalMet(false);
    } catch (error) {
      numberOfMetWords = "BAD_PROGRESS_INPUT";
    }

    if (textareaContents.value === "" || textareaContents.value === " ") {
      numberOfMetWords = "EMPTY_PROGRESS_INPUT";
    }

    GoogleAnalytics.event({
      category: "Progress",
      action: "Update progress",
      label: "Load met words: " + numberOfMetWords,
    });
  }

  function saveGoals(event) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: "Progress",
      action: "Save goals",
      label: "true",
    });

    const currentNewWords = userGoalInputNewWords;
    const currentOldWords = userGoalInputOldWords;

    const userGoalsToUpdate = {
      newWords: currentNewWords,
      oldWords: currentOldWords,
    };

    if (isNaN(currentOldWords) || currentOldWords === null) {
      userGoalsToUpdate["oldWords"] = props.userGoals.oldWords || 1;
    }
    if (isNaN(currentNewWords) || currentNewWords === null) {
      userGoalsToUpdate["newWords"] = props.userGoals.newWords || 1;
    }

    const oldWordsGoalUnveiledToUpdate =
      currentOldWords > props.userGoals.oldWords
        ? false
        : props.oldWordsGoalUnveiled;
    const newWordsGoalUnveiledToUpdate =
      currentNewWords > props.userGoals.newWords
        ? false
        : props.newWordsGoalUnveiled;

    props.updateUserGoalsUnveiled(
      oldWordsGoalUnveiledToUpdate,
      newWordsGoalUnveiledToUpdate
    );

    const oldWordsGoalMetToUpdate =
      todayOldWordCount < userGoalsToUpdate["oldWords"]
        ? false
        : oldWordsGoalMet;
    const newWordsGoalMetToUpdate =
      todayNewWordCount < userGoalsToUpdate["newWords"]
        ? false
        : newWordsGoalMet;

    props.updateUserGoals(userGoalsToUpdate);

    setOldWordsGoalMet(oldWordsGoalMetToUpdate);
    setNewWordsGoalMet(newWordsGoalMetToUpdate);
    setShowSetGoalsForm(false);
  }

  function cancelSetGoals(event) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: "Progress",
      action: "Cancel set goals",
      label: "true",
    });

    setShowSetGoalsForm(false);
  }

  function showSetGoalsFormFn(event) {
    GoogleAnalytics.event({
      category: "Progress",
      action: "Show set goals form",
      label: "true",
    });

    setShowSetGoalsForm(true);
    setUserGoalInputOldWords(props.userGoals.oldWords);
    setUserGoalInputNewWords(props.userGoals.newWords);
  }

  function celebrateCompletedGoals(oldGoal, newGoal) {
    if (oldGoal && newGoal) {
      Confetti.setupCanvas(
        { sparsity: 240, colors: 5 },
        "js-confetti-target",
        particles
      );
    } else {
      Confetti.setupCanvas(
        { sparsity: 960, colors: 2 },
        "js-confetti-target",
        particles
      );
    }
    Confetti.restartAnimation(
      particles,
      canvas.current,
      canvasWidth,
      canvasHeight
    );
  }

  function handleOldWordsGoalInputChange(event) {
    setUserGoalInputOldWords(event);

    GoogleAnalytics.event({
      category: "Progress",
      action: "Change old words goal",
      label: event || "BAD_INPUT",
    });

    return event;
  }

  function handleNewWordsGoalInputChange(event) {
    setUserGoalInputNewWords(event);

    GoogleAnalytics.event({
      category: "Progress",
      action: "Change new words goal",
      label: event || "BAD_INPUT",
    });

    return event;
  }

  function restartConfetti(event) {
    if (
      event &&
      ((event.keyCode && event.keyCode === 13) || event.type === "click")
    ) {
      particles.splice(0);
      Confetti.cancelAnimation();
      Confetti.setupCanvas(
        { sparsity: 60, colors: 5, positioningRandomness: 600 },
        "js-page-confetti-target",
        particles
      );
      Confetti.restartAnimation(
        particles,
        canvas.current,
        canvasWidth,
        canvasHeight
      );
    }
  }

  if (toRecommendedNextLesson === true) {
    return <Redirect push to={props.recommendedNextLesson.link} />;
  }

  const loadForm =
    reducedSaveAndLoad && showLoadInput ? (
      <React.Fragment>
        <label
          htmlFor="js-metwords-from-personal-store--small"
          className="inline-block mb05 visually-hidden"
        >
          Enter your progress here:
        </label>
        <textarea
          id="js-metwords-from-personal-store--small"
          className="js-metwords-from-personal-store progress-textarea bg-info dark:text-coolgrey-900 px1 py05 bw-1 b--solid br-4 db w-100 mr1"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          style={{ maxWidth: "200px", maxHeight: "40px" }}
          rows={1}
        />
        <PseudoContentButton
          className="link-button load-progress mr2"
          onClick={handleLoadProgress.bind(this)}
          aria-label="Load progress from text"
        >
          Load
        </PseudoContentButton>
      </React.Fragment>
    ) : (
      <button
        onClick={showLoadInputFn.bind(this)}
        className="button button--secondary mr2"
        aria-label="Show progress loading form"
      >
        Load
      </button>
    );

  return (
    <div>
      <main id="main">
        <Subheader id="js-page-confetti-target">
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2 id="progress" ref={mainHeading} tabIndex={-1}>
                Progress
              </h2>
            </header>
          </div>
          <div className="flex mxn2">
            <DownloadProgressButton metWords={props.metWords} />
          </div>
        </Subheader>
        <canvas
          ref={canvas}
          width={canvasWidth}
          height={canvasHeight}
          className="fixed celebration-canvas top-0 left-0 pointer-none"
        />

        <FlashcardsSection
          showOnSmallScreen={true}
          changeFlashcardCourseLevel={props.changeFlashcardCourseLevel}
          flashcardsCourseLevel={props.globalUserSettings.flashcardsCourseLevel}
          flashcardsNextLesson={props.flashcardsNextLesson}
          loadingLessonIndex={loadingLessonIndex}
          skipButtonId={mobileSkipButtonId}
          updateFlashcardsRecommendation={props.updateFlashcardsRecommendation}
        />

        {reducedSaveAndLoad ? null : (
          <div className="progress-layout pl3 pr3 pt3 mx-auto mw-1024">
            <div className="panel bg-white dark:bg-coolgrey-1000 p3 mb3">
              <h2>Save your progress</h2>
              <p>
                Typey&nbsp;Type saves your brief progress in your browser’s
                local storage.
                <strong className="bg-danger dark:text-coolgrey-900">
                  {" "}
                  You’ll lose your progress if you clear your browsing data
                  (history, cookies, and cache).
                </strong>{" "}
                If you share this device with other people or use
                Typey&nbsp;Type across several devices and browsers, you should
                save your progress elsewhere. Copy your progress to your
                clipboard and save it in a text file somewhere safe. When you
                return, enter your progress to load it back into
                Typey&nbsp;Type.
              </p>
              <p className="mb0">
                <PseudoContentButton
                  className="js-clipboard-button link-button copy-to-clipboard"
                  dataClipboardTarget="#js-metwords-from-typey-type"
                >
                  Copy progress to clipboard
                </PseudoContentButton>
              </p>
            </div>

            <div className="panel bg-white dark:bg-coolgrey-1000 p3 mb3">
              <h2 className="mt0">Load your progress</h2>
              <p className="mt2 mb3">
                Restore your progress from a previous session by entering your
                saved progress and loading it into Typey&nbsp;Type. You can also
                clear your progress by loading in empty curly braces,{" "}
                <code>{"{}"}</code>.
              </p>
              <p className="mt4 mb0">
                <label
                  htmlFor="metwords-from-personal-store"
                  className="inline-block mb05"
                >
                  Enter your progress here:
                </label>
                <textarea
                  id="metwords-from-personal-store"
                  className="js-metwords-from-personal-store progress-textarea bg-info dark:text-coolgrey-900 px1 py05 bw-1 b--solid br-4 db w-100"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  rows={2}
                />
              </p>
              <p className="mt2 mb0">
                <PseudoContentButton
                  className="link-button load-progress"
                  onClick={handleLoadProgress.bind(this)}
                >
                  Load progress from text
                </PseudoContentButton>
              </p>
            </div>
          </div>
        )}

        <div
          className={`p3 mx-auto mw-1024${reducedSaveAndLoad ? " mt3" : ""}`}
        >
          <div className="flex justify-between">
            <h2 className="mb0">Your progress</h2>
            <div className="flex mb3">
              <div className="flex">{loadForm}</div>
              <PseudoContentButton
                className="js-clipboard-button link-button copy-to-clipboard"
                dataClipboardTarget="#js-metwords-from-typey-type"
                aria-label="Copy progress to clipboard"
              >
                Copy
              </PseudoContentButton>
            </div>
          </div>

          <ProgressSummaryAndLinks
            metWords={props.metWords}
            restartConfetti={restartConfetti.bind(this)}
            yourMemorisedWordCount={props.yourMemorisedWordCount}
            yourSeenWordCount={props.yourSeenWordCount}
            userSettings={props.userSettings}
          />

          <div className="flex flex-wrap justify-between pt3">
            <div className="mw-568 mr3 flex-grow nt-1">
              <ErrorBoundary relative={true}>
                <RecommendationBox
                  recommendedNextLesson={props.recommendedNextLesson}
                  loadingLessonIndex={loadingLessonIndex}
                  startRecommendedStep={startRecommendedStep.bind(this)}
                  recommendationHistory={props.recommendationHistory}
                  updateRecommendationHistory={
                    props.updateRecommendationHistory
                  }
                />
              </ErrorBoundary>
            </div>

            <div className="mw-368 flex-grow" id="js-confetti-target">
              <TodaysEffortsOrGoals
                cancelSetGoals={cancelSetGoals.bind(this)}
                handleNewWordsGoalInputChange={handleNewWordsGoalInputChange.bind(
                  this
                )}
                handleOldWordsGoalInputChange={handleOldWordsGoalInputChange.bind(
                  this
                )}
                newWordsGoalMet={newWordsGoalMet}
                newWordsGoalUnveiled={props.newWordsGoalUnveiled}
                oldWordsGoalMet={oldWordsGoalMet}
                oldWordsGoalUnveiled={props.oldWordsGoalUnveiled}
                celebrateCompletedGoals={celebrateCompletedGoals.bind(this)}
                saveGoals={saveGoals.bind(this)}
                showSetGoalsForm={showSetGoalsForm}
                showSetGoalsFormFn={showSetGoalsFormFn.bind(this)}
                startingMetWordsToday={props.startingMetWordsToday}
                todayNewWordCount={todayNewWordCount}
                todayOldWordCount={todayOldWordCount}
                updateUserGoalsUnveiled={props.updateUserGoalsUnveiled}
                userGoalInputOldWords={userGoalInputOldWords}
                userGoalInputNewWords={userGoalInputNewWords}
                userGoals={props.userGoals}
              />
            </div>
          </div>

          <p
            className={flashWarning.length > 0 ? "bg-warning pl1 pr1" : "hide"}
            aria-live="polite"
          >
            {flashWarning}
          </p>

          <div className="flex flex-wrap justify-between">
            <div className="mw-368 flex-grow order-1">
              <ErrorBoundary relative={true}>
                <RecentLessons
                  lessonIndex={props.lessonIndex}
                  recentLessonHistory={props.recentLessonHistory}
                />
              </ErrorBoundary>
              <FlashcardsSection
                showOnSmallScreen={false}
                changeFlashcardCourseLevel={props.changeFlashcardCourseLevel}
                flashcardsCourseLevel={
                  props.globalUserSettings.flashcardsCourseLevel
                }
                flashcardsNextLesson={props.flashcardsNextLesson}
                loadingLessonIndex={loadingLessonIndex}
                skipButtonId={skipButtonId}
                updateFlashcardsRecommendation={
                  props.updateFlashcardsRecommendation
                }
              />
            </div>
            <div className="mw-568">
              <h3>Lessons progress</h3>
              <ul className="unstyled-list">
                <LessonsProgress
                  lessonIndex={props.lessonIndex}
                  lessonsProgress={props.lessonsProgress}
                />
              </ul>
              <p>
                There are more <Link to="/lessons">Lessons</Link>, including
                lessons with sentences.
              </p>
            </div>
          </div>

          <h3 id="vocabulary-progress">Vocabulary progress</h3>
          <ReformatProgress
            metWords={props.metWords}
            userSettings={props.userSettings}
          />
          <p>Words you’ve seen and times you’ve typed them well:</p>
          <p
            id="js-metwords-from-typey-type"
            className="w-100 mt3 mb3 quote break-words whitespace-break-spaces"
          >
            <small>{JSON.stringify(props.metWords)}</small>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Progress;
