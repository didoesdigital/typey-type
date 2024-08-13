import React, { Suspense, useEffect, useRef, useState } from "react";
import GoogleAnalytics from "react-ga4";
import ErrorBoundary from "../../components/ErrorBoundary";
import PseudoContentButton from "../../components/PseudoContentButton";
import RecommendationBox from "./components/RecommendationBox";
import RecentLessons from "./components/RecentLessons";
import * as Confetti from "../../utils/confetti";
import { useLessonIndex } from "../../states/lessonIndexState";
import { Link } from "react-router-dom";
import FlashcardsSection from "./components/FlashcardsSection";
import TodaysEffortsOrGoals from "./components/TodaysEffortsOrGoals";
import ReformatProgress from "./components/ReformatProgress";
import ProgressSummaryAndLinks from "./components/ProgressSummaryAndLinks";
import LessonsProgress from "./components/LessonsProgress";
import DownloadProgressButton from "./components/DownloadProgressButton";
import Subheader from "../../components/Subheader";
import { MetWords } from "../../types";
import BackupBanner from "./components/BackupBanner";
import BackupModal from "./components/BackupModal";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtom, useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import { globalUserSettingsState } from "../../states/globalUserSettingsState";
import { useUpdateFlashcardsRecommendation } from "../../states/flashcardsProgressState";
import {
  newWordsGoalUnveiledState,
  oldWordsGoalUnveiledState,
  userGoalsState,
} from "../../states/userGoalsState";
import RecommendationBoxFallback from "./components/RecommendationBoxFallback";

const skipButtonId = "js-flashcards-skip-button";
const mobileSkipButtonId = "js-mobile-flashcards-skip-button";

let particles: any[] = [];

type Props = {
  lessonsProgress: any;
  metWords: MetWords;
  startingMetWordsToday: any;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
};

const Progress = (props: Props) => {
  const { setPersonalPreferences, updateStartingMetWordsAndCounts } =
    useAppMethods();
  const globalUserSettings = useAtomValue(globalUserSettingsState);
  const userSettings = useAtomValue(userSettingsState);
  const lessonIndex = useLessonIndex();
  const updateFlashcardsRecommendation = useUpdateFlashcardsRecommendation();
  const [userGoals, setUserGoals] = useAtom(userGoalsState);
  const [oldWordsGoalUnveiled, setOldWordsGoalUnveiled] = useAtom(
    oldWordsGoalUnveiledState
  );
  const [newWordsGoalUnveiled, setNewWordsGoalUnveiled] = useAtom(
    newWordsGoalUnveiledState
  );
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const canvas = useRef(null);
  const firstGoalsRender = useRef(true);

  const [canvasWidth] = useState(Math.floor(window.innerWidth));
  const [canvasHeight] = useState(Math.floor(window.innerHeight));
  const [flashWarning, setFlashWarning] = useState("");
  const [showLoadInput, setShowLoadInput] = useState(false);
  const [showSetGoalsForm, setShowSetGoalsForm] = useState(false);
  const [todayNewWordCount, setTodayNewWordCount] = useState(0);
  const [todayOldWordCount, setTodayOldWordCount] = useState(0);
  const [oldWordsGoalMet, setOldWordsGoalMet] = useState(false);
  const [newWordsGoalMet, setNewWordsGoalMet] = useState(false);
  const [userGoalInputOldWords, setUserGoalInputOldWords] = useState(50);
  const [userGoalInputNewWords, setUserGoalInputNewWords] = useState(15);
  const [isBackupModalOpen, setBackupModalOpen] = useState(false);

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }

    try {
      updateFlashcardsRecommendation();
    } catch (e: any) {
      console.error(e);
    }

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
      userGoals.oldWords <= todayOldWordCountToUpdate ? true : oldWordsGoalMet;
    const newWordsGoalMetToUpdate =
      userGoals.newWords <= todayNewWordCountToUpdate ? true : newWordsGoalMet;

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
    if (showLoadInput) {
      const element = document.getElementById(
        "js-metwords-from-personal-store--small"
      );
      if (element) {
        element.focus();
      }
    }
  }, [showLoadInput]);

  function showLoadInputFn() {
    setShowLoadInput(true);
  }

  function handleLoadProgress() {
    const textareas = document.querySelectorAll(
      ".js-metwords-from-personal-store"
    );
    const textareaContents: HTMLTextAreaElement = (
      textareas.length > 1 ? textareas[1] : textareas[0]
    ) as HTMLTextAreaElement;

    setPersonalPreferences(textareaContents.value);
    setFlashWarning("To update your lesson progress, visit the lessons.");

    let numberOfMetWords = "0";
    try {
      const parsedMetWords = JSON.parse(textareaContents.value);
      numberOfMetWords = Object.keys(parsedMetWords).length.toString();

      updateStartingMetWordsAndCounts(parsedMetWords);

      setOldWordsGoalUnveiled(false);
      setNewWordsGoalUnveiled(false);
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

  function saveGoals(event: any) {
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
      userGoalsToUpdate["oldWords"] = userGoals.oldWords || 1;
    }
    if (isNaN(currentNewWords) || currentNewWords === null) {
      userGoalsToUpdate["newWords"] = userGoals.newWords || 1;
    }

    const oldWordsGoalUnveiledToUpdate =
      currentOldWords > userGoals.oldWords ? false : oldWordsGoalUnveiled;
    const newWordsGoalUnveiledToUpdate =
      currentNewWords > userGoals.newWords ? false : newWordsGoalUnveiled;

    setOldWordsGoalUnveiled(oldWordsGoalUnveiledToUpdate);
    setNewWordsGoalUnveiled(newWordsGoalUnveiledToUpdate);

    const oldWordsGoalMetToUpdate =
      todayOldWordCount < userGoalsToUpdate["oldWords"]
        ? false
        : oldWordsGoalMet;
    const newWordsGoalMetToUpdate =
      todayNewWordCount < userGoalsToUpdate["newWords"]
        ? false
        : newWordsGoalMet;

    setUserGoals(userGoalsToUpdate);

    setOldWordsGoalMet(oldWordsGoalMetToUpdate);
    setNewWordsGoalMet(newWordsGoalMetToUpdate);
    setShowSetGoalsForm(false);
  }

  function cancelSetGoals(event: any) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: "Progress",
      action: "Cancel set goals",
      label: "true",
    });

    setShowSetGoalsForm(false);
  }

  function showSetGoalsFormFn() {
    GoogleAnalytics.event({
      category: "Progress",
      action: "Show set goals form",
      label: "true",
    });

    setShowSetGoalsForm(true);
    setUserGoalInputOldWords(userGoals.oldWords);
    setUserGoalInputNewWords(userGoals.newWords);
  }

  function celebrateCompletedGoals(oldGoal: any, newGoal: any) {
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

  function handleOldWordsGoalInputChange(event: any) {
    setUserGoalInputOldWords(event);

    GoogleAnalytics.event({
      category: "Progress",
      action: "Change old words goal",
      label: event || "BAD_INPUT",
    });

    return event;
  }

  function handleNewWordsGoalInputChange(event: any) {
    setUserGoalInputNewWords(event);

    GoogleAnalytics.event({
      category: "Progress",
      action: "Change new words goal",
      label: event || "BAD_INPUT",
    });

    return event;
  }

  function restartConfetti(event: any) {
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

  const loadForm = showLoadInput ? (
    <React.Fragment>
      <label
        htmlFor="js-metwords-from-personal-store--small"
        className="inline-block mb05 visually-hidden"
      >
        Enter your progress here:
      </label>
      <div className="flex flex-wrap" style={{ rowGap: "16px" }}>
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
          Load progress
        </PseudoContentButton>
      </div>
    </React.Fragment>
  ) : (
    <button
      onClick={showLoadInputFn.bind(this)}
      className="button button--secondary mr2"
      aria-label="Show progress loading form"
    >
      Load progress
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
          flashcardsCourseLevel={globalUserSettings.flashcardsCourseLevel}
          skipButtonId={mobileSkipButtonId}
          updateFlashcardsRecommendation={updateFlashcardsRecommendation}
        />

        <div className={`p3 mx-auto mw-1024 mt3`}>
          <div className="flex flex-wrap justify-between">
            <h2 className="mb0">Your progress</h2>
            <div
              className="flex flex-wrap mb3"
              style={{ columnGap: "16px", rowGap: "16px" }}
            >
              <button
                className="de-emphasized-button"
                style={{ textDecorationLine: "none" }}
                onClick={() => setBackupModalOpen(true)}
              >
                Learn more
              </button>
              <BackupModal
                isOpen={isBackupModalOpen}
                handleCloseModal={() => setBackupModalOpen(false)}
              />
              <div className="flex flex-wrap" style={{ rowGap: "16px" }}>
                <div className="flex">{loadForm}</div>
                <PseudoContentButton
                  className="js-clipboard-button link-button copy-to-clipboard"
                  dataClipboardTarget="#js-metwords-from-typey-type"
                  aria-label="Copy progress to clipboard"
                >
                  Copy progress
                </PseudoContentButton>
              </div>
            </div>
          </div>

          <BackupBanner />

          <ProgressSummaryAndLinks
            metWords={props.metWords}
            restartConfetti={restartConfetti.bind(this)}
            yourMemorisedWordCount={props.yourMemorisedWordCount}
            yourSeenWordCount={props.yourSeenWordCount}
            userSettings={userSettings}
          />

          <div className="flex flex-wrap justify-between pt3">
            <div className="mw-568 mr3 flex-grow nt-1">
              <ErrorBoundary relative={true}>
                <Suspense fallback={<RecommendationBoxFallback />}>
                  <RecommendationBox
                    lessonsProgress={props.lessonsProgress}
                    yourSeenWordCount={props.yourSeenWordCount}
                    yourMemorisedWordCount={props.yourMemorisedWordCount}
                    metWords={props.metWords}
                  />
                </Suspense>
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
                newWordsGoalUnveiled={newWordsGoalUnveiled}
                oldWordsGoalMet={oldWordsGoalMet}
                oldWordsGoalUnveiled={oldWordsGoalUnveiled}
                celebrateCompletedGoals={celebrateCompletedGoals.bind(this)}
                saveGoals={saveGoals.bind(this)}
                showSetGoalsForm={showSetGoalsForm}
                showSetGoalsFormFn={showSetGoalsFormFn.bind(this)}
                startingMetWordsToday={props.startingMetWordsToday}
                todayNewWordCount={todayNewWordCount}
                todayOldWordCount={todayOldWordCount}
                unveilOldWordsGoal={setOldWordsGoalUnveiled}
                unveilNewWordsGoal={setNewWordsGoalUnveiled}
                userGoalInputOldWords={userGoalInputOldWords}
                userGoalInputNewWords={userGoalInputNewWords}
                userGoals={userGoals}
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
                <RecentLessons lessonIndex={lessonIndex} />
              </ErrorBoundary>
              <FlashcardsSection
                showOnSmallScreen={false}
                flashcardsCourseLevel={globalUserSettings.flashcardsCourseLevel}
                skipButtonId={skipButtonId}
                updateFlashcardsRecommendation={updateFlashcardsRecommendation}
              />
            </div>
            <div className="mw-568">
              <h3>Lessons progress</h3>
              <ul className="unstyled-list">
                <LessonsProgress
                  lessonIndex={lessonIndex}
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
            userSettings={userSettings}
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
