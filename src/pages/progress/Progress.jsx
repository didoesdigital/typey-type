import React, { Component } from "react";
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

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: Math.floor(window.innerWidth),
      canvasHeight: Math.floor(window.innerHeight),
      flashWarning: "",
      loadingLessonIndex: true,
      reducedSaveAndLoad: false,
      showLoadInput: false,
      showSetGoalsForm: false,
      progressPercent: 0,
      yourWordCount: 0,
      todayNewWordCount: 0,
      todayOldWordCount: 0,
      toRecommendedNextLesson: false,
      oldWordsGoalMet: false,
      newWordsGoalMet: false,
      userGoalInputOldWords: 50,
      userGoalInputNewWords: 15,
    };
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    getLessonIndexData()
      .then((lessonIndex) => {
        if (this.props.recommendationHistory?.["currentStep"] === null) {
          this.props.updateRecommendationHistory(
            this.props.recommendationHistory,
            lessonIndex
          );
          this.props.updateFlashcardsRecommendation();
        }
        this.setState({ loadingLessonIndex: false });
      })
      .catch((e) => {
        console.error(e);
      });

    if (Object.keys(this.props.metWords).length > 2000) {
      this.setState({ reducedSaveAndLoad: true });
    } else {
      this.setState({
        reducedSaveAndLoad: false,
      });
    }

    const yourWordCount = Object.keys(this.props.metWords).length || 0;
    const progressPercent =
      Math.round((Object.keys(this.props.metWords).length / 10000) * 100) || 0;

    let todayOldWords = {};
    for (const [phrase, timesSeen] of Object.entries(this.props.metWords)) {
      if (
        this.props.startingMetWordsToday[phrase] &&
        timesSeen - this.props.startingMetWordsToday[phrase] > 0
      ) {
        todayOldWords[phrase] = timesSeen;
      }
    }

    let todayNewWords = {};
    for (const [phrase, timesSeen] of Object.entries(this.props.metWords)) {
      if (!this.props.startingMetWordsToday[phrase] && timesSeen > 0) {
        todayNewWords[phrase] = timesSeen;
      }
    }

    const todayNewWordCount = Object.entries(todayNewWords).length;
    const todayOldWordCount = Object.entries(todayOldWords).length;

    const oldWordsGoalMet =
      this.props.userGoals.oldWords <= todayOldWordCount
        ? true
        : this.state.oldWordsGoalMet;
    const newWordsGoalMet =
      this.props.userGoals.newWords <= todayNewWordCount
        ? true
        : this.state.newWordsGoalMet;

    this.setState({
      oldWordsGoalMet,
      newWordsGoalMet,
      progressPercent,
      todayNewWordCount,
      todayOldWordCount,
      yourWordCount,
    });
  }

  componentWillUnmount() {
    this.setState({
      loadingLessonIndex: false,
    });
  }

  startRecommendedStep(e) {
    let labelString = this.props.recommendedNextLesson.link;
    if (!labelString) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Recommendations",
      action: "Start recommended step",
      label: labelString,
    });

    if (
      this.props.recommendedNextLesson.link &&
      this.props.recommendedNextLesson.link.startsWith("http")
    ) {
      // lets external link open in a new tab
      this.props.updateRecommendationHistory(this.props.recommendationHistory);
    } else {
      // does not navigate using link but instead allows Router Redirect
      e.preventDefault();
      this.setState({ toRecommendedNextLesson: true }, () => {
        this.props.updateRecommendationHistory(
          this.props.recommendationHistory
        );
      });
    }
  }

  showLoadInputFn() {
    this.setState({ showLoadInput: true });
    window.setTimeout(function () {
      const element = document.getElementById(
        "js-metwords-from-personal-store--small"
      );
      if (element) {
        element.focus();
      }
    }, 0);
  }

  restoreButtonOnClickFunction() {
    const textareas = document.querySelectorAll(
      ".js-metwords-from-personal-store"
    );
    const textareaContents = textareas.length > 1 ? textareas[1] : textareas[0];

    this.props.setPersonalPreferences(textareaContents.value);
    this.setState({
      flashWarning: "To update your lesson progress, visit the lessons.",
    });

    let numberOfMetWords = "0";
    try {
      const parsedMetWords = JSON.parse(textareaContents.value);
      numberOfMetWords = Object.keys(parsedMetWords).length.toString();

      this.props.updateStartingMetWordsAndCounts(parsedMetWords);

      this.props.updateUserGoalsUnveiled(false, false);
      this.setState({
        todayOldWordCount: 0,
        todayNewWordCount: 0,
        oldWordsGoalMet: false,
        newWordsGoalMet: false,
      });
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

  saveGoals(event) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: "Progress",
      action: "Save goals",
      label: "true",
    });

    const currentNewWords = this.state.userGoalInputNewWords;
    const currentOldWords = this.state.userGoalInputOldWords;

    const userGoalsToUpdate = {
      newWords: currentNewWords,
      oldWords: currentOldWords,
    };

    if (isNaN(currentOldWords) || currentOldWords === null) {
      userGoalsToUpdate["oldWords"] =
        this.props.userGoalsToUpdate.oldWords || 1;
    }
    if (isNaN(currentNewWords) || currentNewWords === null) {
      userGoalsToUpdate["newWords"] =
        this.props.userGoalsToUpdate.newWords || 1;
    }

    let oldWordsGoalUnveiledToUpdate = this.props.oldWordsGoalUnveiled;
    let newWordsGoalUnveiledToUpdate = this.props.newWordsGoalUnveiled;
    if (currentOldWords > this.props.userGoals.oldWords) {
      oldWordsGoalUnveiledToUpdate = false;
    }
    if (currentNewWords > this.props.userGoals.newWords) {
      newWordsGoalUnveiledToUpdate = false;
    }
    this.props.updateUserGoalsUnveiled(
      oldWordsGoalUnveiledToUpdate,
      newWordsGoalUnveiledToUpdate
    );

    let oldWordsGoalMet = this.state.oldWordsGoalMet;
    let newWordsGoalMet = this.state.newWordsGoalMet;
    if (this.state.todayOldWordCount < userGoalsToUpdate["oldWords"]) {
      oldWordsGoalMet = false;
    }
    if (this.state.todayNewWordCount < userGoalsToUpdate["newWords"]) {
      newWordsGoalMet = false;
    }

    this.props.updateUserGoals(userGoalsToUpdate);
    this.setState(
      {
        oldWordsGoalMet: oldWordsGoalMet,
        newWordsGoalMet: newWordsGoalMet,
        showSetGoalsForm: false,
      },
      () => {
        const element = document.getElementById("js-set-goals-button");
        if (element) {
          element.focus();
        }
      }
    );
  }

  cancelSetGoals(event) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: "Progress",
      action: "Cancel set goals",
      label: "true",
    });

    this.setState(
      {
        showSetGoalsForm: false,
      },
      () => {
        const element = document.getElementById("js-set-goals-button");
        if (element) {
          element.focus();
        }
      }
    );
  }

  showSetGoalsForm(event) {
    GoogleAnalytics.event({
      category: "Progress",
      action: "Show set goals form",
      label: "true",
    });

    this.setState(
      {
        showSetGoalsForm: true,
        userGoalInputOldWords: this.props.userGoals.oldWords,
        userGoalInputNewWords: this.props.userGoals.newWords,
      },
      () => {
        const element = document.getElementById(
          "js-first-interactive-form-field-element"
        );
        if (element) {
          element.focus();
        }
      }
    );
  }

  celebrateCompletedGoals(oldGoal, newGoal) {
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
      this.refs.canvas,
      this.state.canvasWidth,
      this.state.canvasHeight
    );
  }

  handleOldWordsGoalInputChange(event) {
    this.setState({ userGoalInputOldWords: event });

    let labelString = event;
    if (!event) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Progress",
      action: "Change old words goal",
      label: labelString,
    });

    return event;
  }

  handleNewWordsGoalInputChange(event) {
    this.setState({ userGoalInputNewWords: event });

    let labelString = event;
    if (!event) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Progress",
      action: "Change new words goal",
      label: labelString,
    });

    return event;
  }

  restartConfetti(event) {
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
        this.refs.canvas,
        this.state.canvasWidth,
        this.state.canvasHeight
      );
    }
  }

  render() {
    if (this.state.toRecommendedNextLesson === true) {
      return <Redirect push to={this.props.recommendedNextLesson.link} />;
    }

    let metWordsFromTypeyType = JSON.stringify(this.props.metWords);

    let saveAndLoadPanels = this.state.reducedSaveAndLoad ? null : (
      <div className="progress-layout pl3 pr3 pt3 mx-auto mw-1024">
        <div className="panel bg-white dark:bg-coolgrey-1000 p3 mb3">
          <h2>Save your progress</h2>
          <p>
            Typey&nbsp;Type saves your brief progress in your browser’s local
            storage.
            <strong className="bg-danger dark:text-coolgrey-900">
              {" "}
              You’ll lose your progress if you clear your browsing data
              (history, cookies, and cache).
            </strong>{" "}
            If you share this device with other people or use Typey&nbsp;Type
            across several devices and browsers, you should save your progress
            elsewhere. Copy your progress to your clipboard and save it in a
            text file somewhere safe. When you return, enter your progress to
            load it back into Typey&nbsp;Type.
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
            Restore your progress from a previous session by entering your saved
            progress and loading it into Typey&nbsp;Type. You can also clear
            your progress by loading in empty curly braces, <code>{"{}"}</code>.
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
              onClick={this.restoreButtonOnClickFunction.bind(this)}
            >
              Load progress from text
            </PseudoContentButton>
          </p>
        </div>
      </div>
    );

    let reducedSaveAndLoadForms;
    let loadForm = (
      <button
        onClick={this.showLoadInputFn.bind(this)}
        className="button button--secondary mr2"
        aria-label="Show progress loading form"
      >
        Load
      </button>
    );

    if (this.state.reducedSaveAndLoad) {
      if (this.state.showLoadInput) {
        loadForm = (
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
              onClick={this.restoreButtonOnClickFunction.bind(this)}
              aria-label="Load progress from text"
            >
              Load
            </PseudoContentButton>
          </React.Fragment>
        );
      }
      reducedSaveAndLoadForms = (
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
      );
    }

    return (
      <div>
        <main id="main">
          <Subheader id="js-page-confetti-target">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2
                  id="progress"
                  ref={(heading) => {
                    this.mainHeading = heading;
                  }}
                  tabIndex={-1}
                >
                  Progress
                </h2>
              </header>
            </div>
            <div className="flex mxn2">
              <DownloadProgressButton metWords={this.props.metWords} />
            </div>
          </Subheader>
          <canvas
            ref="canvas"
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
            className="fixed celebration-canvas top-0 left-0 pointer-none"
          />

          <FlashcardsSection
            showOnSmallScreen={true}
            changeFlashcardCourseLevel={this.props.changeFlashcardCourseLevel}
            flashcardsCourseLevel={
              this.props.globalUserSettings.flashcardsCourseLevel
            }
            flashcardsNextLesson={this.props.flashcardsNextLesson}
            loadingLessonIndex={this.state.loadingLessonIndex}
            skipButtonId={mobileSkipButtonId}
            updateFlashcardsRecommendation={
              this.props.updateFlashcardsRecommendation
            }
          />

          {saveAndLoadPanels}

          <div
            className={
              this.state.reducedSaveAndLoad
                ? "p3 mx-auto mw-1024 mt3"
                : "p3 mx-auto mw-1024"
            }
          >
            <div className="flex justify-between">
              <h2 className="mb0">Your progress</h2>
              {reducedSaveAndLoadForms}
            </div>

            <ProgressSummaryAndLinks
              metWords={this.props.metWords}
              restartConfetti={this.restartConfetti.bind(this)}
              yourMemorisedWordCount={this.props.yourMemorisedWordCount}
              yourSeenWordCount={this.props.yourSeenWordCount}
              userSettings={this.props.userSettings}
            />

            <div className="flex flex-wrap justify-between pt3">
              <div className="mw-568 mr3 flex-grow nt-1">
                <ErrorBoundary relative={true}>
                  <RecommendationBox
                    recommendedNextLesson={this.props.recommendedNextLesson}
                    loadingLessonIndex={this.state.loadingLessonIndex}
                    startRecommendedStep={this.startRecommendedStep.bind(this)}
                    recommendationHistory={this.props.recommendationHistory}
                    updateRecommendationHistory={
                      this.props.updateRecommendationHistory
                    }
                  />
                </ErrorBoundary>
              </div>

              <div className="mw-368 flex-grow" id="js-confetti-target">
                <TodaysEffortsOrGoals
                  cancelSetGoals={this.cancelSetGoals.bind(this)}
                  handleNewWordsGoalInputChange={this.handleNewWordsGoalInputChange.bind(
                    this
                  )}
                  handleOldWordsGoalInputChange={this.handleOldWordsGoalInputChange.bind(
                    this
                  )}
                  newWordsGoalMet={this.state.newWordsGoalMet}
                  newWordsGoalUnveiled={this.props.newWordsGoalUnveiled}
                  oldWordsGoalMet={this.state.oldWordsGoalMet}
                  oldWordsGoalUnveiled={this.props.oldWordsGoalUnveiled}
                  celebrateCompletedGoals={this.celebrateCompletedGoals.bind(
                    this
                  )}
                  saveGoals={this.saveGoals.bind(this)}
                  showSetGoalsForm={this.state.showSetGoalsForm}
                  showSetGoalsFormFn={this.showSetGoalsForm.bind(this)}
                  startingMetWordsToday={this.props.startingMetWordsToday}
                  todayNewWordCount={this.state.todayNewWordCount}
                  todayOldWordCount={this.state.todayOldWordCount}
                  updateUserGoalsUnveiled={this.props.updateUserGoalsUnveiled}
                  userGoalInputOldWords={this.state.userGoalInputOldWords}
                  userGoalInputNewWords={this.state.userGoalInputNewWords}
                  userGoals={this.props.userGoals}
                />
              </div>
            </div>

            <p
              className={
                this.state.flashWarning.length > 0
                  ? "bg-warning pl1 pr1"
                  : "hide"
              }
              aria-live="polite"
            >
              {this.state.flashWarning}
            </p>

            <div className="flex flex-wrap justify-between">
              <div className="mw-368 flex-grow order-1">
                <ErrorBoundary relative={true}>
                  <RecentLessons
                    lessonIndex={this.props.lessonIndex}
                    recentLessonHistory={this.props.recentLessonHistory}
                  />
                </ErrorBoundary>
                <FlashcardsSection
                  showOnSmallScreen={false}
                  changeFlashcardCourseLevel={
                    this.props.changeFlashcardCourseLevel
                  }
                  flashcardsCourseLevel={
                    this.props.globalUserSettings.flashcardsCourseLevel
                  }
                  flashcardsNextLesson={this.props.flashcardsNextLesson}
                  loadingLessonIndex={this.state.loadingLessonIndex}
                  skipButtonId={skipButtonId}
                  updateFlashcardsRecommendation={
                    this.props.updateFlashcardsRecommendation
                  }
                />
              </div>
              <div className="mw-568">
                <h3>Lessons progress</h3>
                <ul className="unstyled-list">
                  <LessonsProgress
                    lessonIndex={this.props.lessonIndex}
                    lessonsProgress={this.props.lessonsProgress}
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
              metWords={this.props.metWords}
              userSettings={this.props.userSettings}
            />
            <p>Words you’ve seen and times you’ve typed them well:</p>
            <p
              id="js-metwords-from-typey-type"
              className="w-100 mt3 mb3 quote break-words whitespace-break-spaces"
            >
              <small>{metWordsFromTypeyType}</small>
            </p>
          </div>
        </main>
      </div>
    );
  }
}

export default Progress;
