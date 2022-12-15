import React, { Component } from 'react';
import PARAMS from './../utils/params.js';
import GoogleAnalytics from 'react-ga';
import ErrorBoundary from './ErrorBoundary'
import PseudoContentButton from './PseudoContentButton';
import FlashcardsBox from '../pages/progress/components/FlashcardsBox';
import NumericInput from 'react-numeric-input';
import RecommendationBox from '../pages/progress/components/RecommendationBox';
import RecentLessons from '../pages/progress/components/RecentLessons';
import * as Confetti from './../utils/confetti';
import { getLessonIndexData } from './../utils/lessonIndexData';
import { IconCheckmark, IconTriangleRight } from './Icon';
import { Link, Redirect } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import trimAndSumUniqMetWords from '../utils/trimAndSumUniqMetWords';
import { ReactComponent as AlertRobot } from '../images/AlertRobot.svg';
import { ReactComponent as BoredRobot } from '../images/BoredRobot.svg';
import { ReactComponent as HappyRobot } from '../images/HappyRobot.svg';

let particles = [];

const ProgressTooltip = ({ title, onShow, children }) => {
  return (
    // @ts-ignore
    <Tooltip
      title={title}
      className=""
      animation="shift"
      arrow="true"
      duration="200"
      tabIndex={0}
      tag="span"
      theme="didoesdigital didoesdigital-sm"
      trigger="mouseenter focus click"
      onShow={onShow}
    >
      {children}
    </Tooltip>
  );
};

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
      reformattedProgress: {},
      yourWordCount: 0,
      yourSeenWordCount: 0,
      yourMemorisedWordCount: 0,
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
      yourSeenWordCount: this.props.yourSeenWordCount,
      yourMemorisedWordCount: this.props.yourMemorisedWordCount
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

  downloadReformattedProgress() {
    let spacePlacement = this.props.userSettings.spacePlacement;
    let reformattedProgress = trimAndSumUniqMetWords(this.props.metWords);

    if (spacePlacement === "spaceBeforeOutput") {
      reformattedProgress = Object.fromEntries(Object.entries(reformattedProgress).map(([word, count]) => [" " + word, count]));
    }
    else if (spacePlacement === "spaceAfterOutput") {
      reformattedProgress = Object.fromEntries(Object.entries(reformattedProgress).map(([word, count]) => [word + " ", count]));
    }

    this.setState({reformattedProgress: reformattedProgress});

    GoogleAnalytics.event({
      category: 'Downloads',
      action: 'Click',
      label: 'typey-type-reformatted-progress.json',
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

  revealCompletedGoals(oldGoal, newGoal) {
    if (oldGoal && newGoal) {
      Confetti.setupCanvas({sparsity: 240, colors: 5}, 'js-confetti-target', particles);
    }
    else {
      Confetti.setupCanvas({sparsity: 960, colors: 2}, 'js-confetti-target', particles);
    }
    Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight );

    let oldWordsGoalUnveiled = this.props.oldWordsGoalUnveiled;
    let newWordsGoalUnveiled = this.props.newWordsGoalUnveiled;
    if (this.state.oldWordsGoalMet) {
      oldWordsGoalUnveiled = true;
    }
    if (this.state.newWordsGoalMet) {
      newWordsGoalUnveiled = true;
    }
    this.props.updateUserGoalsUnveiled(oldWordsGoalUnveiled, newWordsGoalUnveiled);
    const element = document.getElementById('js-todays-efforts');
    if (element) { element.focus(); }
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

  renderTodaysEffortsGoals(userGoalsWords, todayWordCount) {
    return (
      <React.Fragment>
        {userGoalsWords}{this.renderTodaysEffortsDoneness(userGoalsWords, todayWordCount)}
      </React.Fragment>
    );
  }

  renderTodaysEffortsDoneness(userGoalsWords, todayWordCount) {
    if (userGoalsWords <= todayWordCount) {
      return (
        <React.Fragment>
          <span aria-hidden="true"> •</span> Done!
        </React.Fragment>
      );
    }
    else {
      return null;
    }
  }

  progressIconClasses(color, opacity) {
    return (
      `color-${color}-bright ` +
      `o-${opacity} ` +
      "progress-circle " +
      "svg-baseline " +
      "svg-icon-wrapper"
    );
  }

  unstarted() {
    return (
      <ProgressTooltip
        title="Unstarted"
        onShow={this.props.setAnnouncementMessage}
      >
        <div
          aria-hidden="true"
          className={this.progressIconClasses("purple", 30)}
        />
        <span className="visually-hidden">Unstarted</span>
      </ProgressTooltip>
    );
  }

  inProgress() {
    return (
      <ProgressTooltip
        title="In progress"
        onShow={this.props.setAnnouncementMessage}
      >
        <IconTriangleRight
          ariaHidden="true"
          role="presentation"
          className={this.progressIconClasses("purple", 100)}
          iconTitle=""
        />
        <span className="visually-hidden">In progress</span>
      </ProgressTooltip>
    );
  }

  lessonComplete() {
    return (
      <ProgressTooltip
        title="100 words done or lesson complete"
        onShow={this.props.setAnnouncementMessage}
      >
        <IconCheckmark
          ariaHidden="true"
          role="presentation"
          className={this.progressIconClasses("green", 100)}
          iconWidth="16"
          iconHeight="16"
          iconTitle=""
        />
        <span className="visually-hidden">
          100 words done or lesson complete
        </span>
      </ProgressTooltip>
    );
  }

  restartConfetti(event) {
    if (event && ((event.keyCode && event.keyCode === 13) || event.type === "click")) {
      particles.splice(0);
      Confetti.cancelAnimation();
      Confetti.setupCanvas({sparsity: 60, colors: 5, positioningRandomness: 600}, 'js-page-confetti-target', particles);
      Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight);
    }
  }

  formatSpacePlacementValue(userSettings) {
    if (!userSettings?.spacePlacement) {
      return "not set"
    }

    switch (userSettings.spacePlacement) {
      case "spaceBeforeOutput":
        return "Space before output"
      case "spaceAfterOutput":
        return "Space after output"
      case "spaceOff":
        return "Ignore spaces"
      case "spaceExact":
        return "Exact spacing"

      default:
        return "not set"
    }
  }

  makeDownloadHref(json) {
    if (Blob !== undefined) {
      return URL.createObjectURL(new Blob([JSON.stringify(json)], {type: "text/json"}));
    }
    else {
      return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    }
  }

  render () {
    var grabStyle = function() {return false};
    if (this.state.toRecommendedNextLesson === true) {
      return <Redirect push to={this.props.recommendedNextLesson.link} />
    }

    if (this.state.toFlashcardsNextLesson === true) {
      return <Redirect push to={this.props.flashcardsNextLesson.link} />
    }

    let skipButtonId = "js-flashcards-skip-button";
    let mobileSkipButtonId = "js-mobile-flashcards-skip-button";

    let lessonsProgressFromTypeyType = this.props.lessonsProgress;
    const linkList = this.props.lessonIndex.map( (lesson) => {
      let lessonsubtitle = '';
      let wordCountDenominator = 0;
      let numberOfWordsSeenOrMemorised = 0;
      let lessonCompletion;
      if (lesson.subtitle && lesson.subtitle.length > 0) {
        lessonsubtitle = ': '+lesson.subtitle;
      }
      if (lesson.wordCount && lesson.wordCount > 0) {
        wordCountDenominator = lesson.wordCount;
      }
      if (lessonsProgressFromTypeyType && lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path]) {
        let toDiscover = lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path]?.numberOfWordsToDiscover || 0;
        let seen = lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path]?.numberOfWordsSeen || 0;
        let memorised = lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path]?.numberOfWordsMemorised || 0;
        numberOfWordsSeenOrMemorised = seen + memorised;
        wordCountDenominator = seen + memorised + toDiscover;
        if ((numberOfWordsSeenOrMemorised >= wordCountDenominator) || (numberOfWordsSeenOrMemorised > 100)) {
          if (numberOfWordsSeenOrMemorised >= wordCountDenominator) { numberOfWordsSeenOrMemorised = wordCountDenominator; }
          lessonCompletion = this.lessonComplete();
        } else if (numberOfWordsSeenOrMemorised > 0) {
          lessonCompletion = this.inProgress();
        } else {
          lessonCompletion = this.unstarted();
        }
      } else {
        lessonCompletion = this.unstarted();
      }
      if (lesson.category === "Fundamentals" || (lesson.category === "Drills" && lesson.title.startsWith("Top 100")) || (lesson.category === "Drills" && lesson.title.startsWith("Top 200"))) {
        return(
          <li className="unstyled-list-item mb1" key={ lesson.path }>{lessonCompletion} <Link to={`/lessons${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link> · <small>{numberOfWordsSeenOrMemorised} of {wordCountDenominator}</small></li>
        )
      } else {
        return "";
      }
    });

    let metWordsFromTypeyType = JSON.stringify(this.props.metWords);
    // let yourWordCount = Object.keys(this.props.metWords).length || 0;
    // let yourSeenWordCount = Math.round(Object.values(this.props.metWords).filter( timesSeen => timesSeen > 0 && timesSeen < 30).length) || 0;
    // let yourMemorisedWordCount = Math.round(Object.values(this.props.metWords).filter( timesSeen => timesSeen > 29).length) || 0;
    // let progressPercent = Math.round(Object.keys(this.props.metWords).length / 10000 * 100) || 0;

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

    // TODO: write a pluralisation function for this monstrosity and add tests
    let progressSummaryAndLinks = (
      <p>You’ve successfully typed {this.state.yourWordCount} words without hints or misstrokes.</p>
    );

    if (this.state.yourSeenWordCount >= 10000) {
      if (this.state.yourMemorisedWordCount >= 10000) {
        progressSummaryAndLinks = (
          <React.Fragment>
            <p>Woohoo! You rock! What a magnificent effort to memorise 10,000 words. You are an expert stenographer now! You’ve successfully typed {this.state.yourWordCount} words without misstrokes. It’s time to <button className="button-that-looks-like-a-link" ref={(celebrateButton) => { this.celebrateButton = celebrateButton; }} id="celebrate-button" onClick={this.restartConfetti.bind(this)} onKeyDown={this.restartConfetti.bind(this)}>celebrate!</button></p>
            <p><Link to='/lessons/progress/'>Practice&nbsp;your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>.</p>
          </React.Fragment>
        );
      }
      else {
        progressSummaryAndLinks = (
          <React.Fragment>
            <p>Woohoo! You rock! You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You are an accomplished stenographer now! You’ve completed 100% of 10,000 words. It’s time to <button className="button-that-looks-like-a-link" ref={(celebrateButton) => { this.celebrateButton = celebrateButton; }} id="celebrate-button" onClick={this.restartConfetti.bind(this)} onKeyDown={this.restartConfetti.bind(this)}>celebrate!</button></p>
            <p><Link to='/lessons/progress/'>Practice&nbsp;your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>.</p>
          </React.Fragment>
        );
      }
    }
    else {
      if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount === 0) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} word without misstrokes. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount === 1) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount > 1) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount === 0 && this.state.yourMemorisedWordCount === 1) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} word without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount === 0 && this.state.yourMemorisedWordCount > 1) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount === 0) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount === 1) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/'>Practice&nbsp;your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
      if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount > 1) {
        progressSummaryAndLinks = (
          <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/'>Practice&nbsp;your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&' + PARAMS.discoverParams}>Discover new words</Link>.</p>
        );
      }
    }

    let showFlashcards = true;

    let date = new Date();
    let dashifiedDate = date.toDateString().replace(/ /g,'-').toLowerCase();

    const downloadProgressHref = this.makeDownloadHref(this.props.metWords);
    const downloadReformattedProgressHref = this.makeDownloadHref(this.state.reformattedProgress);

    let oldWordsNumericInput = (
      <NumericInput
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={false}
        className="form-control w-100"
        disabled={!this.state.showSetGoalsForm}
        id="userGoalInputOldWords"
        max={10000}
        min={1}
        name="userGoalInputOldWords"
        onChange={this.handleOldWordsGoalInputChange.bind(this)}
        precision={0}
        spellCheck="false"
        step={1}
        style={grabStyle()}
        type="number"
        value={this.state.userGoalInputOldWords}
        snap
      />
    );

    let newWordsNumericInput = (
      <NumericInput
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={false}
        className="form-control w-100"
        disabled={!this.state.showSetGoalsForm}
        id="userGoalInputNewWords"
        max={10000}
        min={1}
        name="userGoalInputNewWords"
        onChange={this.handleNewWordsGoalInputChange.bind(this)}
        precision={0}
        spellCheck="false"
        step={1}
        style={grabStyle()}
        type="number"
        value={this.state.userGoalInputNewWords}
        snap
      />
    );

    let todaysEffortsOrGoals;
    if (this.state.showSetGoalsForm) {
      todaysEffortsOrGoals = (
        <React.Fragment>
          <form onSubmit={this.saveGoals.bind(this)}>
            <div className="pt4 pb4">
              <div className="mb3">
                <label className="pb1" id="js-first-interactive-form-field-element" htmlFor="userGoalInputOldWords">Old words goal</label>
                { oldWordsNumericInput }
                <div className="mt1 text-small de-emphasized">
                  (50–200 recommended)
                </div>
              </div>
              <div className="mb3">
                <label className="pb1" htmlFor="userGoalInputNewWords">New words goal</label>
                { newWordsNumericInput }
                <div className="mt1 text-small de-emphasized">
                  (5–40 recommended)
                </div>
              </div>
              <div className="flex flex-wrap justify-end">
                <button onClick={this.cancelSetGoals.bind(this)} className="button button--secondary mr2 dib">Cancel</button>
                <button onClick={this.saveGoals.bind(this)} className="button mr2 dib">Save goals</button>
              </div>
            </div>
          </form>
        </React.Fragment>
      );
    }
    else if (
      (this.state.oldWordsGoalMet && !this.props.oldWordsGoalUnveiled) ||
      (this.state.newWordsGoalMet && !this.props.newWordsGoalUnveiled)
    ) {
      todaysEffortsOrGoals = (
        <React.Fragment>
          <div className="inline-flex flex-column items-center pt4 pb4 bb b--brand-primary-tint w-100">
            <div className="todays-effort-reveal-robot">
              <AlertRobot />
            </div>
            You completed a goal!
            <button onClick={this.revealCompletedGoals.bind(this, this.state.oldWordsGoalMet && !this.props.oldWordsGoalUnveiled, this.state.newWordsGoalMet && !this.props.newWordsGoalUnveiled)} className="button button--secondary mt3 dib">Reveal</button>
          </div>
        </React.Fragment>
      );
    }
    else {
      let yourOldWordsGoal = this.renderTodaysEffortsGoals(this.props.userGoals.oldWords, this.state.todayOldWordCount);
      let yourNewWordsGoal = this.renderTodaysEffortsGoals(this.props.userGoals.newWords, this.state.todayNewWordCount);
      let todaysEffortsOldGoalsRow = (
          <div className="inline-flex items-center pt4 pb4 bb b--brand-primary-tint w-100">
            <div className="flex todays-effort-goal-robot">{ this.props.userGoals.oldWords <= this.state.todayOldWordCount ? <HappyRobot /> : <BoredRobot /> }</div>
            <div className="stat__number stat__number--display mr1">{this.state.todayOldWordCount}</div>
            <div>
              Old {this.state.todayOldWordCount !== 1 ? "words" : "word"}<br />
              <span className="text-small">Your goal: {yourOldWordsGoal}</span>
            </div>
          </div>
      );

      if (!this.props.startingMetWordsToday || Object.keys(this.props.startingMetWordsToday).length < 15) {
        todaysEffortsOldGoalsRow = null;
      }

      todaysEffortsOrGoals = (
        <React.Fragment>
          {todaysEffortsOldGoalsRow}
          <div className="inline-flex items-center pt4 pb4 bb b--brand-primary-tint w-100">
            <div className="flex todays-effort-goal-robot">{ this.props.userGoals.newWords <= this.state.todayNewWordCount ? <HappyRobot /> : <BoredRobot /> }</div>
            <div className="stat__number stat__number--display mr1">{this.state.todayNewWordCount}</div>
            <div>
              New {this.state.todayNewWordCount !== 1 ? "words" : "word"}<br />
              <span className="text-small">Your goal: {yourNewWordsGoal}</span>
            </div>
          </div>
          <div className="text-right">
            <button id="js-set-goals-button" onClick={this.showSetGoalsForm.bind(this)} className="button button--secondary mt3 dib">Set goals</button>
          </div>
        </React.Fragment>
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
                <a href={downloadProgressHref} download={"typey-type-progress-" + dashifiedDate + ".json"} onClick={this.downloadProgress.bind(this)} className="link-button link-button-ghost table-cell mr1">Download progress file</a>
              </div>
            </div>
          </div>
          <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} className="fixed celebration-canvas top-0 left-0 pointer-none" />

          { showFlashcards ?
            <div className="p3 mx-auto mw-1024 show-sm-only">
              <div className="mw100 w-336">
                <h3>Flashcards</h3>
                <ErrorBoundary relative={true}>
                  <div className="clearfix mb2 mt2">
                    <label className="mb1 db" htmlFor="smFlashcardsCourseLevel">Choose flashcard level</label>
                    <select id="smFlashcardsCourseLevel" name="flashcardsCourseLevel" value={this.props.globalUserSettings.flashcardsCourseLevel} onChange={this.props.changeFlashcardCourseLevel} className="form-control form-control--large mw100 w-336">
                      <option value="noviceCourse">Novice</option>
                      <option value="beginnerCourse">Beginner</option>
                      <option value="competentCourse">Competent</option>
                      <option value="proficientCourse">Proficient</option>
                      <option value="expertCourse">Expert</option>
                    </select>
                  </div>
                  <FlashcardsBox
                    skipButtonId={mobileSkipButtonId}
                    flashcardsNextLesson={this.props.flashcardsNextLesson}
                    loadingLessonIndex={this.state.loadingLessonIndex}
                    startFlashcards={this.startFlashcards.bind(this)}
                    onSkip={this.onSkipFlashcards.bind(this)}
                  />
                </ErrorBoundary>
              </div>
            </div>
            :
            null
          }

          {saveAndLoadPanels}

          <div className={this.state.reducedSaveAndLoad ? "p3 mx-auto mw-1024 mt3" : "p3 mx-auto mw-1024"}>
            <div className="flex justify-between">
              <h2 className="mb0">Your progress</h2>
              {reducedSaveAndLoadForms}
            </div>

            {progressSummaryAndLinks}

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
                <h3 className="mt0 mb0 pt5 pb1 bb b--brand-primary-tint" id="js-todays-efforts" tabIndex={-1}>Today’s efforts</h3>
                {todaysEffortsOrGoals}
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
                { showFlashcards ?
                  <div className="mx-auto hide-sm-only">
                    <div className="mw100">
                      <h3>Flashcards</h3>
                      <ErrorBoundary relative={true}>
                        <div className="clearfix mb2 mt2">
                          <label className="mb1 db" htmlFor="mdFlashcardsCourseLevel">Choose flashcard level</label>
                          <select id="mdFlashcardsCourseLevel" name="flashcardsCourseLevel" value={this.props.globalUserSettings.flashcardsCourseLevel} onChange={this.props.changeFlashcardCourseLevel} className="form-control form-control--large mw100 w-336">
                            <option value="noviceCourse">Novice</option>
                            <option value="beginnerCourse">Beginner</option>
                            <option value="competentCourse">Competent</option>
                            <option value="proficientCourse">Proficient</option>
                            <option value="expertCourse">Expert</option>
                          </select>
                        </div>
                        <FlashcardsBox
                          skipButtonId={skipButtonId}
                          flashcardsNextLesson={this.props.flashcardsNextLesson}
                          loadingLessonIndex={this.state.loadingLessonIndex}
                          startFlashcards={this.startFlashcards.bind(this)}
                          onSkip={this.onSkipFlashcards.bind(this)}
                        />
                      </ErrorBoundary>
                    </div>
                  </div>
                  :
                  null
                }
              </div>
              <div className="mw-568">
                <h3>Lessons progress</h3>
                <ul className="unstyled-list">{linkList}</ul>
                <p>There are more <Link to='/lessons'>Lessons</Link>, including lessons with sentences.</p>
              </div>
            </div>

            <h3 id="vocabulary-progress">Vocabulary progress</h3>
            <p className="bg-slat pl1 pr1">If you’ve changed your spacing settings, you can download a reformatted “progress file” to match your new setting. After downloading it, if you're happy it looks good you can load it back into Typey Type. Then visit each lesson to update lesson progress. Your current spacing setting is: {this.formatSpacePlacementValue(this.props.userSettings)}. <a href={downloadReformattedProgressHref} download={"typey-type-reformatted-progress-" + dashifiedDate + ".json"} onClick={this.downloadReformattedProgress.bind(this)}>Download reformatted progress file</a></p>
            <p>Words you’ve seen and times you’ve typed them well:</p>
            <p id="js-metwords-from-typey-type" className="w-100 mt3 mb3 quote break-words whitespace-break-spaces"><small>{metWordsFromTypeyType}</small></p>
          </div>
        </main>
      </div>
    )
  }
}

export default Progress;
