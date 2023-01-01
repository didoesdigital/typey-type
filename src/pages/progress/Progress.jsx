import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import ErrorBoundary from '../../components/ErrorBoundary'
import PseudoContentButton from '../../components/PseudoContentButton';
import RecommendationBox from './components/RecommendationBox';
import RecentLessons from './components/RecentLessons';
import * as Confetti from '../../utils/confetti';
import { getLessonIndexData } from '../../utils/lessonIndexData';
import { Link, Redirect } from 'react-router-dom';
import FlashcardsSection from './components/FlashcardsSection';
import TodaysEffortsOrGoals from './components/TodaysEffortsOrGoals';
import formatProgressFileDownloadName from "./utils/formatProgressFileDownloadName";
import makeDownloadHref from './utils/makeDownloadHref';
import ReformatProgress from './components/ReformatProgress';
import ProgressSummaryAndLinks from "./components/ProgressSummaryAndLinks";
import LessonsProgress from "./components/LessonsProgress";

let particles = [];

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: Math.floor(window.innerWidth),
      canvasHeight: Math.floor(window.innerHeight),
      flashWarning: '',
      loadingLessonIndex: true,
      loadingLessonIndexError: false,
      reducedSaveAndLoad: false,
      showLoadInput: false,
      showRecommendationsSurveyLink: true,
      showSetGoalsForm: false,
      progressPercent: 0,
      yourWordCount: 0,
      todayNewWordCount: 0,
      todayOldWordCount: 0,
      toRecommendedNextLesson: false,
      toFlashcardsNextLesson: false,
      oldWordsGoalMet: false,
      newWordsGoalMet: false,
      userGoalInputOldWords: 50,
      userGoalInputNewWords: 15,
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    getLessonIndexData().then((lessonIndex) => {
      if (this.props.recommendationHistory && this.props.recommendationHistory['currentStep'] === null) {
        this.props.updateRecommendationHistory(this.props.recommendationHistory, lessonIndex);
        this.props.updateFlashcardsRecommendation();
      }
      this.setState({ loadingLessonIndex: false });
    }).catch((e) => {
      this.setState({ loadingLessonIndexError: true });
    });

    this.setState({ showLoadInput: false, toRecommendedNextLesson: false });

    if (Object.keys(this.props.metWords).length > 2000) {
      this.setState({reducedSaveAndLoad: true});
    } else {
      this.setState({
        reducedSaveAndLoad: false,
        showLoadInput: false
      });
    }

    let yourWordCount = Object.keys(this.props.metWords).length || 0;
    let progressPercent = Math.round(Object.keys(this.props.metWords).length / 10000 * 100) || 0;

    let todayOldWords = {};
    for (const [phrase, timesSeen] of Object.entries(this.props.metWords)) {
      if (this.props.startingMetWordsToday[phrase] && (timesSeen - this.props.startingMetWordsToday[phrase] > 0)) {
        todayOldWords[phrase] = timesSeen;
      }
    }

    let todayNewWords = {};
    for (const [phrase, timesSeen] of Object.entries(this.props.metWords)) {
      if (!this.props.startingMetWordsToday[phrase] && timesSeen > 0) {
        todayNewWords[phrase] = timesSeen;
      }
    }

    let todayNewWordCount = 0;
    todayNewWordCount = Object.entries(todayNewWords).length;
    let todayOldWordCount = 0;
    todayOldWordCount = Object.entries(todayOldWords).length;

    let oldWordsGoalMet = this.state.oldWordsGoalMet;
    let newWordsGoalMet = this.state.newWordsGoalMet;

    if (this.props.userGoals.oldWords <= todayOldWordCount) {
      oldWordsGoalMet = true;
    }
    if (this.props.userGoals.newWords <= todayNewWordCount) {
      newWordsGoalMet = true;
    }

    this.setState({
      oldWordsGoalMet: oldWordsGoalMet,
      newWordsGoalMet: newWordsGoalMet,
      progressPercent: progressPercent,
      todayNewWordCount: todayNewWordCount,
      todayOldWordCount: todayOldWordCount,
      yourWordCount: yourWordCount,
    });
  }

  componentWillUnmount() {
    this.setState({
      loadingLessonIndex: false,
      loadingLessonIndexError: false
    });
  }

  downloadProgress() {
    GoogleAnalytics.event({
      category: 'Downloads',
      action: 'Click',
      label: 'typey-type-progress.json',
    });
  }

  startRecommendedStep(e) {

    let labelString = this.props.recommendedNextLesson.link;
    if (!labelString) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Recommendations',
      action: 'Start recommended step',
      label: labelString
    });

    if (this.props.recommendedNextLesson.link && this.props.recommendedNextLesson.link.startsWith("http")) {
      // lets external link open in a new tab
      this.props.updateRecommendationHistory(this.props.recommendationHistory);
    }
    else {
      // does not navigate using link but instead allows Router Redirect
      e.preventDefault();
      this.setState({ toRecommendedNextLesson: true }, () => {
        this.props.updateRecommendationHistory(this.props.recommendationHistory);
      });
    }
  }

  startFlashcards(e) {

    let labelString = this.props.flashcardsNextLesson.link;
    if (!labelString) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Flashcards',
      action: 'Start recommended flashcards',
      label: labelString
    });

    // does not navigate using link but instead allows Router Redirect
    e.preventDefault();
    this.setState({ toFlashcardsNextLesson: true }, () => {
      this.props.updateFlashcardsRecommendation();
    });
  }


  showLoadInput() {
    this.setState({showLoadInput: true});
    window.setTimeout(function ()
    {
      const element = document.getElementById('js-metwords-from-personal-store--small');
      if (element) { element.focus(); }
    }, 0);
  }

  restoreButtonOnClickFunction() {
    let textareas = document.querySelectorAll(".js-metwords-from-personal-store");
    let textareaContents;
    if (textareas.length > 1) {
      textareaContents = textareas[1];
    } else {
      textareaContents = textareas[0];
    }
    this.props.setPersonalPreferences(textareaContents.value);
    // this.props.setAnnouncementMessage(this, "teft");
    this.setState({flashWarning: "To update your lesson progress, visit the lessons."});

    let numberOfMetWords = '0';
    try {
      numberOfMetWords = Object.keys(JSON.parse(textareaContents.value)).length.toString();

      this.props.updateStartingMetWordsAndCounts(JSON.parse(textareaContents.value));

      this.props.updateUserGoalsUnveiled(false, false);
      this.setState({
        todayOldWordCount: 0,
        todayNewWordCount: 0,
        oldWordsGoalMet: false,
        newWordsGoalMet: false,
      });
    }
    catch (error) {
      numberOfMetWords = 'BAD_PROGRESS_INPUT'
    }
    if (textareaContents.value === '' || textareaContents.value === ' ') {
      numberOfMetWords = 'EMPTY_PROGRESS_INPUT'
    }

    GoogleAnalytics.event({
      category: 'Progress',
      action: 'Update progress',
      label: 'Load met words: ' + numberOfMetWords
    });
  };

  recommendAnotherLesson = (skipButtonPressed = true) => {
    let labelString = this.props.recommendedNextLesson.link;
    if (!labelString) { labelString = "BAD_INPUT"; }

    if (skipButtonPressed) {
      GoogleAnalytics.event({
        category: 'Recommendations',
        action: 'Skip recommended',
        label: labelString
      });
    }

    if (skipButtonPressed) {
      const element = document.getElementById('js-skip-button');
      if (element) { element.focus(); }
    }

    this.props.updateRecommendationHistory(this.props.recommendationHistory);
  }

  onSkipFlashcards (event) {
    let labelString = this.props.flashcardsNextLesson.link;
    if (!labelString) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Flashcards',
      action: 'Skip recommended flashcards',
      label: labelString
    });

    if (event && event.target && event.target.id) {
      const element = document.getElementById(event.target.id);
      if (element) { element.focus(); }
    }

    this.props.updateFlashcardsRecommendation();
  }

  hideRecommendationsSurveyLink(event) {
    GoogleAnalytics.event({
      category: 'Surveys',
      action: 'Hide recommendations survey link',
      label: 'Hidden'
    });

    this.setState({showRecommendationsSurveyLink: false});
  }

  saveGoals(event) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: 'Progress',
      action: 'Save goals',
      label: 'true'
    });

    let currentNewWords = this.state.userGoalInputNewWords;
    let currentOldWords = this.state.userGoalInputOldWords;

    let userGoals = {
      newWords: currentNewWords,
      oldWords: currentOldWords
    }

    if (isNaN(currentOldWords) || currentOldWords === null) {
      userGoals['oldWords'] = this.props.userGoals.oldWords || 1;
    }
    if (isNaN(currentNewWords) || currentNewWords === null) {
      userGoals['newWords'] = this.props.userGoals.newWords || 1;
    }

    let oldWordsGoalUnveiled = this.props.oldWordsGoalUnveiled;
    let newWordsGoalUnveiled = this.props.newWordsGoalUnveiled;
    if (currentOldWords > this.props.userGoals.oldWords) {
      oldWordsGoalUnveiled = false;
    }
    if (currentNewWords > this.props.userGoals.newWords) {
      newWordsGoalUnveiled = false;
    }
    this.props.updateUserGoalsUnveiled(oldWordsGoalUnveiled, newWordsGoalUnveiled);

    let oldWordsGoalMet = this.state.oldWordsGoalMet;
    let newWordsGoalMet = this.state.newWordsGoalMet;
    if (this.state.todayOldWordCount < userGoals['oldWords']) {
      oldWordsGoalMet = false;
    }
    if (this.state.todayNewWordCount < userGoals['newWords']) {
      newWordsGoalMet = false;
    }

    this.props.updateUserGoals(userGoals);
    this.setState({
      oldWordsGoalMet: oldWordsGoalMet,
      newWordsGoalMet: newWordsGoalMet,
      showSetGoalsForm: false
    }, () => {
      const element = document.getElementById('js-set-goals-button');
      if (element) { element.focus(); }
    });
  }

  cancelSetGoals(event) {
    event.preventDefault();

    GoogleAnalytics.event({
      category: 'Progress',
      action: 'Cancel set goals',
      label: 'true'
    });

    this.setState({
      showSetGoalsForm: false
    }, () => {
      const element = document.getElementById('js-set-goals-button');
      if (element) { element.focus(); }
    });
  }

  showSetGoalsForm(event) {
    GoogleAnalytics.event({
      category: 'Progress',
      action: 'Show set goals form',
      label: 'true'
    });

    this.setState({
      showSetGoalsForm: true,
      userGoalInputOldWords: this.props.userGoals.oldWords,
      userGoalInputNewWords: this.props.userGoals.newWords
    }, () => {
      const element = document.getElementById('js-first-interactive-form-field-element');
      if (element) { element.focus(); }
    });
  }

  celebrateCompletedGoals(oldGoal, newGoal) {
    if (oldGoal && newGoal) {
      Confetti.setupCanvas({sparsity: 240, colors: 5}, 'js-confetti-target', particles);
    }
    else {
      Confetti.setupCanvas({sparsity: 960, colors: 2}, 'js-confetti-target', particles);
    }
    Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight );
  }

  handleOldWordsGoalInputChange(event) {
    this.setState({userGoalInputOldWords: event});

    let labelString = event;
    if (!event) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Progress',
      action: 'Change old words goal',
      label: labelString
    });

    return event;
  }

  handleNewWordsGoalInputChange(event) {
    this.setState({userGoalInputNewWords: event});

    let labelString = event;
    if (!event) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Progress',
      action: 'Change new words goal',
      label: labelString
    });

    return event;
  }

  restartConfetti(event) {
    if (event && ((event.keyCode && event.keyCode === 13) || event.type === "click")) {
      particles.splice(0);
      Confetti.cancelAnimation();
      Confetti.setupCanvas({sparsity: 60, colors: 5, positioningRandomness: 600}, 'js-page-confetti-target', particles);
      Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight);
    }
  }

  render () {
    if (this.state.toRecommendedNextLesson === true) {
      return <Redirect push to={this.props.recommendedNextLesson.link} />
    }

    if (this.state.toFlashcardsNextLesson === true) {
      return <Redirect push to={this.props.flashcardsNextLesson.link} />
    }

    let skipButtonId = "js-flashcards-skip-button";
    let mobileSkipButtonId = "js-mobile-flashcards-skip-button";

    let metWordsFromTypeyType = JSON.stringify(this.props.metWords);

    let saveAndLoadPanels = this.state.reducedSaveAndLoad ? null : (
      <div className="progress-layout pl3 pr3 pt3 mx-auto mw-1024">
        <div className="panel p3 mb3">
          <h2>Save your progress</h2>
          <p>Typey&nbsp;Type saves your brief progress in your browser’s local storage.<strong className="bg-danger"> You’ll lose your progress if you clear your browsing data (history, cookies, and cache).</strong> If you share this device with other people or use Typey&nbsp;Type across several devices and browsers, you should save your progress elsewhere. Copy your progress to your clipboard and save it in a text file somewhere safe. When you return, enter your progress to load it back into Typey&nbsp;Type.</p>
          <p className="mb0">
            <PseudoContentButton className="js-clipboard-button link-button copy-to-clipboard" dataClipboardTarget="#js-metwords-from-typey-type">Copy progress to clipboard</PseudoContentButton>
          </p>
        </div>

        <div className="panel p3 mb3">
          <h2 className="mt0">Load your progress</h2>
          <p className="mt2 mb3">
            Restore your progress from a previous session by entering your saved progress and loading it into Typey&nbsp;Type. You can also clear your progress by loading in empty curly braces, <code>{"{}"}</code>.
          </p>
          <p className="mt4 mb0">
            <label htmlFor="metwords-from-personal-store" className="inline-block mb05">Enter your progress here:</label>
            <textarea
              id="metwords-from-personal-store"
              className="js-metwords-from-personal-store progress-textarea db w-100"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              rows="2"
            />
          </p>
          <p className="mt2 mb0">
            <PseudoContentButton className="link-button load-progress" onClick={this.restoreButtonOnClickFunction.bind(this)}>Load progress from text</PseudoContentButton>
          </p>
        </div>
      </div>
    );

    let reducedSaveAndLoadForms;
    let loadForm = (
      <button onClick={this.showLoadInput.bind(this)} className="button button--secondary mr2" aria-label="Show progress loading form">
        Load
      </button>
    );

    if (this.state.reducedSaveAndLoad) {
      if (this.state.showLoadInput) {
        loadForm = (
          <React.Fragment>
            <label htmlFor="js-metwords-from-personal-store--small" className="inline-block mb05 visually-hidden">Enter your progress here:</label>
            <textarea
              id="js-metwords-from-personal-store--small"
              className="js-metwords-from-personal-store progress-textarea db w-100 mr1"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              style={{maxWidth: '200px', maxHeight: '40px'}}
              rows="1"
            />
            <PseudoContentButton className="link-button load-progress mr2" onClick={this.restoreButtonOnClickFunction.bind(this)} aria-label="Load progress from text">Load</PseudoContentButton>
          </React.Fragment>
        );
      }
      reducedSaveAndLoadForms = (
        <div className="flex mb3">
          <div className="flex">
            {loadForm}
          </div>
          <PseudoContentButton className="js-clipboard-button link-button copy-to-clipboard" dataClipboardTarget="#js-metwords-from-typey-type" aria-label="Copy progress to clipboard">Copy</PseudoContentButton>
        </div>
      );
    }


    return (
      <div>
        <main id="main">
          <div className="subheader" id="js-page-confetti-target">
            <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
              <div className="flex mr1 self-center">
                <header className="flex items-center min-h-40">
                  <h2 id="progress" ref={(heading) => { this.mainHeading = heading; }} tabIndex={-1}>Progress</h2>
                </header>
              </div>
              <div className="flex mxn2">
                <a href={makeDownloadHref(this.props.metWords)} download={formatProgressFileDownloadName("typey-type-progress-")} onClick={this.downloadProgress.bind(this)} className="link-button link-button-ghost table-cell mr1">Download progress file</a>
              </div>
            </div>
          </div>
          <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} className="fixed celebration-canvas top-0 left-0 pointer-none" />

          <FlashcardsSection
            showOnSmallScreen={true}
            changeFlashcardCourseLevel={this.props.changeFlashcardCourseLevel}
            flashcardsCourseLevel={this.props.globalUserSettings.flashcardsCourseLevel}
            flashcardsNextLesson={this.props.flashcardsNextLesson}
            loadingLessonIndex={this.state.loadingLessonIndex}
            onSkipFlashcards={this.onSkipFlashcards.bind(this)}
            skipButtonId={mobileSkipButtonId}
            startFlashcards={this.startFlashcards.bind(this)}
          />

          {saveAndLoadPanels}

          <div className={this.state.reducedSaveAndLoad ? "p3 mx-auto mw-1024 mt3" : "p3 mx-auto mw-1024"}>
            <div className="flex justify-between">
              <h2 className="mb0">Your progress</h2>
              {reducedSaveAndLoadForms}
            </div>

            <ProgressSummaryAndLinks
              metWords={this.props.metWords}
              restartConfetti={this.restartConfetti.bind(this)}
              yourMemorisedWordCount={this.props.yourMemorisedWordCount}
              yourSeenWordCount={this.props.yourSeenWordCount}
            />

            <div className="flex flex-wrap justify-between pt3">
              <div className="mw-568 mr3 flex-grow nt-1">
                <ErrorBoundary relative={true}>
                  <RecommendationBox
                    recommendedNextLesson={this.props.recommendedNextLesson}
                    setAnnouncementMessage={this.props.setAnnouncementMessage}
                    loadingLessonIndex={this.state.loadingLessonIndex}
                    startRecommendedStep={this.startRecommendedStep.bind(this)}
                    recommendAnotherLesson={this.recommendAnotherLesson}
                  />
                </ErrorBoundary>
              </div>

              <div className="mw-368 flex-grow" id="js-confetti-target">
                <TodaysEffortsOrGoals
                  cancelSetGoals={this.cancelSetGoals.bind(this)}
                  handleNewWordsGoalInputChange={this.handleNewWordsGoalInputChange.bind(this)}
                  handleOldWordsGoalInputChange={this.handleOldWordsGoalInputChange.bind(this)}
                  newWordsGoalMet={this.state.newWordsGoalMet}
                  newWordsGoalUnveiled={this.props.newWordsGoalUnveiled}
                  oldWordsGoalMet={this.state.oldWordsGoalMet}
                  oldWordsGoalUnveiled={this.props.oldWordsGoalUnveiled}
                  celebrateCompletedGoals={this.celebrateCompletedGoals.bind(this)}
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

            <p className={ this.state.flashWarning.length > 0 ? "bg-warning pl1 pr1" : "hide" } aria-live="polite">{this.state.flashWarning}</p>

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
                  changeFlashcardCourseLevel={this.props.changeFlashcardCourseLevel}
                  flashcardsCourseLevel={this.props.globalUserSettings.flashcardsCourseLevel}
                  flashcardsNextLesson={this.props.flashcardsNextLesson}
                  loadingLessonIndex={this.state.loadingLessonIndex}
                  onSkipFlashcards={this.onSkipFlashcards.bind(this)}
                  skipButtonId={skipButtonId}
                  startFlashcards={this.startFlashcards.bind(this)}
                />
              </div>
              <div className="mw-568">
                <h3>Lessons progress</h3>
                <ul className="unstyled-list">
                  <LessonsProgress
                    lessonIndex={this.props.lessonIndex}
                    lessonsProgress={this.props.lessonsProgress}
                    setAnnouncementMessage={this.props.setAnnouncementMessage}
                  />
                </ul>
                <p>There are more <Link to='/lessons'>Lessons</Link>, including lessons with sentences.</p>
              </div>
            </div>

            <h3 id="vocabulary-progress">Vocabulary progress</h3>
            <ReformatProgress
              metWords={this.props.metWords}
              userSettings={this.props.userSettings}
            />
            <p>Words you’ve seen and times you’ve typed them well:</p>
            <p id="js-metwords-from-typey-type" className="w-100 mt3 mb3 quote break-words whitespace-break-spaces"><small>{metWordsFromTypeyType}</small></p>
          </div>
        </main>
      </div>
    )
  }
}

export default Progress;
