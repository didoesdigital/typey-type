import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import PseudoContentButton from './PseudoContentButton';
import RecommendationDescription from './RecommendationDescription';
import { getLessonIndexData } from './lessonIndexData';
import { IconExternal, IconCheckmark, IconTriangleRight } from './Icon';
import { Link, Redirect } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashWarning: '',
      loadingLessonIndex: true,
      loadingLessonIndexError: false,
      reducedSaveAndLoad: false,
      showLoadInput: false,
      progressPercent: 0,
      yourWordCount: 0,
      yourSeenWordCount: 0,
      yourMemorisedWordCount: 0,
      toRecommendedNextLesson: false
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    getLessonIndexData().then((lessonIndex) => {
      if (this.props.recommendationHistory && this.props.recommendationHistory['previousStep'] === null) {
        this.props.updateRecommendationHistory(this.props.recommendationHistory, lessonIndex);
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

    this.setState({
      progressPercent: progressPercent,
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

  showLoadInput() {
    this.setState({showLoadInput: true});
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
    } catch (error) {
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
    let labelString = this.props.recommendedNextLesson.studyType;
    if (!labelString) { labelString = "BAD_INPUT"; }

    if (skipButtonPressed === false) {
      GoogleAnalytics.event({
        category: 'Recommendations',
        action: 'Skip recommended',
        label: labelString
      });
    }

    this.props.updateRecommendationHistory(this.props.recommendationHistory);

    if (skipButtonPressed) {
      if (this.recommendationSkipButton) {
        this.recommendationSkipButton.focus();
      }
    }
  }

  render () {
    if (this.state.toRecommendedNextLesson === true) {
      return <Redirect push to={this.props.recommendedNextLesson.link} />
    }

    let lessonsProgressFromTypeyType = this.props.lessonsProgress;
    const linkList = this.props.lessonIndex.map( (lesson) => {
      let lessonsubtitle = '';
      let lessonWordCount = 0;
      let lessonWordCountInIndex = '';
      let numberOfWordsSeenOrMemorised = 0;
      let lessonCompletion;
      if (lesson.subtitle.length > 0) {
        lessonsubtitle = ': '+lesson.subtitle;
      }
      if (lesson.wordCount && lesson.wordCount > 0) {
        lessonWordCount = lesson.wordCount;
        lessonWordCountInIndex = '' + lessonWordCount;
      }
      if (lessonsProgressFromTypeyType && lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path]) {
        let seen = lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path].numberOfWordsSeen || 0;
        let memorised = lessonsProgressFromTypeyType[process.env.PUBLIC_URL + "/lessons" + lesson.path].numberOfWordsMemorised || 0;
        numberOfWordsSeenOrMemorised = seen + memorised;
        if ((numberOfWordsSeenOrMemorised >= lessonWordCountInIndex) || (numberOfWordsSeenOrMemorised > 100)) {
          if (numberOfWordsSeenOrMemorised >= lessonWordCountInIndex) { numberOfWordsSeenOrMemorised = lessonWordCountInIndex; }
          lessonCompletion = (
            <Tooltip
              title="100 words done or lesson complete"
              className=""
              animation="shift"
              arrow="true"
              duration="200"
              tabIndex="0"
              tag="span"
              theme="didoesdigital didoesdigital-sm"
              trigger="mouseenter focus click"
              onShow={this.props.setAnnouncementMessage}
            >
              <IconCheckmark ariaHidden="true" role="presentation" className="svg-icon-wrapper svg-baseline progress-circle color-green-bright" iconWidth="16" iconHeight="16" iconTitle="" />
              <span className="visually-hidden">100 words done or lesson complete</span>
            </Tooltip>
          );
        } else if (numberOfWordsSeenOrMemorised > 0) {
          lessonCompletion = (
                <Tooltip
                  title="In progress"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital didoesdigital-sm"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconTriangleRight ariaHidden="true" role="presentation" className="svg-icon-wrapper svg-baseline progress-circle color-purple-bright" iconTitle="" />
                  <span className="visually-hidden">In progress</span>
                </Tooltip>
          );
        } else {
          lessonCompletion = (
                <Tooltip
                  title="Unstarted"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital didoesdigital-sm"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <div aria-hidden="true" className="svg-icon-wrapper svg-baseline progress-circle color-purple-bright o-30" />
                  <span className="visually-hidden">Unstarted</span>
                </Tooltip>
          );
        }
      } else {
          lessonCompletion = (
            <div aria-hidden="true" className="svg-icon-wrapper svg-baseline color-purple-bright o-30" />
        );
      }
      if (lesson.category === "Fundamentals") {
        return(
          <li className="unstyled-list-item mb1" key={ lesson.path }>{lessonCompletion} <Link to={`/lessons${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link> · <small>{numberOfWordsSeenOrMemorised} of {lessonWordCountInIndex}</small></li>
        )
      } else if (lesson.category === "Drills" && lesson.title.startsWith("Top 100")) {
        return(
          <li className="unstyled-list-item mb1" key={ lesson.path }>{lessonCompletion} <Link to={`/lessons${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link> · <small>{numberOfWordsSeenOrMemorised} of {lessonWordCountInIndex}</small></li>
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

    let saveAndLoadPanels = (
      <div className={this.state.reducedSaveAndLoad ? "visually-hidden" : "progress-layout pl3 pr3 pt3 mx-auto mw-1024"}>
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
            <label htmlFor="metWords-from-personal-store" className="inline-block mb05">Enter your progress here:</label>
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
      <button onClick={this.showLoadInput.bind(this)} className="de-emphasized-button mr2">
        Load
      </button>
    );

    if (this.state.reducedSaveAndLoad) {
      if (this.state.showLoadInput) {
        loadForm = (
          <React.Fragment>
            <label htmlFor="metWords-from-personal-store--small" className="inline-block mb05 visually-hidden">Enter your progress here:</label>
            <textarea
              id="metwords-from-personal-store--small"
              className="js-metwords-from-personal-store progress-textarea db w-100 mr1"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              style={{maxWidth: '200px', maxHeight: '40px'}}
              rows="1"
            />
            <PseudoContentButton className="link-button load-progress mr3" onClick={this.restoreButtonOnClickFunction.bind(this)}>Load</PseudoContentButton>
          </React.Fragment>
        );
      }
      reducedSaveAndLoadForms = (
        <div className="flex mb3">
          <div className="flex">
            {loadForm}
          </div>
          <PseudoContentButton className="js-clipboard-button link-button copy-to-clipboard" dataClipboardTarget="#js-metwords-from-typey-type">Copy</PseudoContentButton>
        </div>
      );
    }

    let discoverParams = '?recommended=true&study=discover&limitNumberOfWords=15&repetitions=5&newWords=1&seenWords=0&retainedWords=0&showStrokes=1&hideStrokesOnLastRepetition=1&sortOrder=sortOff&startFromWord=1';

    // console.log("Your total word count: " + yourWordCount);
    // console.log("Your seen word count: " + yourSeenWordCount);
    // console.log("Your memorised word count: " + yourMemorisedWordCount);
    // TODO: write a pluralisation function for this monstrosity and add tests
    let progressSummaryAndLinks = (
      <p>You’ve successfully typed {this.state.yourWordCount} words without hints or misstrokes.</p>
    );
    if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount === 0) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} word without misstrokes. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount === 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount > 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 0 && this.state.yourMemorisedWordCount === 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} word without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 0 && this.state.yourMemorisedWordCount > 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount === 0) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount === 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/'>Practice&nbsp;all your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount > 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/'>Practice&nbsp;all your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + discoverParams}>Discover new words</Link>.</p>
      );
    }

    let recommendedNextLesson;
    let recommendedNextLessonHeading;
    let recommendedLink;
    let recommendedLinkTitle;
    let metadataStats;
    let studyType;
    let recommendedNextLessonCallToActionButton;

    if (this.props.recommendedNextLesson !== undefined && !this.state.loadingLessonIndex) {
      metadataStats = (
        <React.Fragment>
          {this.props.recommendedNextLesson.limitNumberOfWords} words | {this.props.recommendedNextLesson.repetitions} repetitions
        </React.Fragment>
      );

      studyType = this.props.recommendedNextLesson.studyType;
      if (studyType === "error") {
        metadataStats = (
          <React.Fragment>
            No recommendation.
          </React.Fragment>
        );
      }
      else if (studyType === "wildcard") {
        metadataStats = (
          <React.Fragment>
            External link.
          </React.Fragment>
        );
      }
      else if (studyType === "game") {
        metadataStats = (
          <React.Fragment>
            Increase your speed while breaking cargo
          </React.Fragment>
        );
      }
      else if (studyType === "compete") {
        metadataStats = (
          <React.Fragment>
            Increase your speed while racing against others
          </React.Fragment>
        );
      }
      else if (studyType === "break") {
        metadataStats = (
          <React.Fragment>
            Take 5&nbsp;minutes or come&nbsp;back in 4+&nbsp;hours.
          </React.Fragment>
        );
      }
      else if (this.props.recommendedNextLesson.repetitions === 1) {
        metadataStats = (
          <React.Fragment>
            {this.props.recommendedNextLesson.limitNumberOfWords} words | {this.props.recommendedNextLesson.repetitions} repetition
          </React.Fragment>
        );
      }

      if (this.props.recommendedNextLesson && this.props.recommendedNextLesson.lessonTitle && this.props.recommendedNextLesson.lessonTitle.length < 10) {
        metadataStats = (
          <React.Fragment>
            {this.props.recommendedNextLesson.limitNumberOfWords} words <br /> {this.props.recommendedNextLesson.repetitions} repetitions
          </React.Fragment>
        );
        if (this.props.recommendedNextLesson.repetitions === 1) {
          metadataStats = (
            <React.Fragment>
              {this.props.recommendedNextLesson.limitNumberOfWords} words <br /> {this.props.recommendedNextLesson.repetitions} repetition
            </React.Fragment>
          );
        }
      }

      switch (this.props.recommendedNextLesson.studyType) {
        case "error":
          recommendedNextLessonCallToActionButton = "Practice";
          recommendedNextLessonHeading = <h3>Recommended: error</h3>;
          break;
        case "practice":
          recommendedNextLessonCallToActionButton = "Practice";
          recommendedNextLessonHeading = <h3>Recommended: practice</h3>;
          break;
        case "drill":
          recommendedNextLessonCallToActionButton = "Drill";
          recommendedNextLessonHeading = <h3>Recommended: drill</h3>;
          break;
        case "revise":
          recommendedNextLessonCallToActionButton = "Revise";
          recommendedNextLessonHeading = <h3>Recommended: revise</h3>;
          break;
        case "discover":
          recommendedNextLessonCallToActionButton = "Discover";
          recommendedNextLessonHeading = <h3>Recommended: discover</h3>;
          break;
        case "break":
          recommendedNextLessonCallToActionButton = "Take a break";
          recommendedNextLessonHeading = <h3>Recommended: break</h3>;
          break;
        case "game":
          recommendedNextLessonCallToActionButton = "Play";
          recommendedNextLessonHeading = <h3>Recommended: game</h3>;
          break;
        case "compete":
          recommendedNextLessonCallToActionButton = "Compete";
          recommendedNextLessonHeading = <h3>Recommended: compete</h3>;
          break;
        default:
          recommendedNextLessonCallToActionButton = "Start now";
          recommendedNextLessonHeading = <h3>Recommended: practice</h3>;
          break;
      }

      if (this.props.recommendedNextLesson.link.startsWith('http')) {
        recommendedLink = (
          <GoogleAnalytics.OutboundLink
            eventLabel={recommendedNextLessonCallToActionButton}
            aria-label={recommendedNextLessonCallToActionButton + " (external link opens in new tab)"}
            to={this.props.recommendedNextLesson.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.startRecommendedStep.bind(this)}
            className="link-button dib"
            style={{lineHeight: 2}}
          >
            {recommendedNextLessonCallToActionButton}
            <Tooltip
              title="(external link opens in new tab)"
              className=""
              animation="shift"
              arrow="true"
              duration="200"
              tabIndex="0"
              tag="span"
              theme="didoesdigital"
              trigger="mouseenter focus click"
              onShow={this.props.setAnnouncementMessage}
            >
              <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
            </Tooltip>
          </GoogleAnalytics.OutboundLink>
        );
      } else {
        recommendedLink = (
          <Link onClick={this.startRecommendedStep.bind(this)} to={this.props.recommendedNextLesson.link} className="link-button dib" style={{lineHeight: 2}}>{recommendedNextLessonCallToActionButton}</Link>
        );
      }

      if (studyType === "error") {
        recommendedLinkTitle = "Unable to load recommendation";
        recommendedLink = <a href="." className="link-button dib" style={{lineHeight: 2}}>Refresh</a>
      } else {
        recommendedLinkTitle = this.props.recommendedNextLesson.linkTitle;
      }

      recommendedNextLesson = (
          <div className="mw-384 w-336 order-1">
            {recommendedNextLessonHeading}
            <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
              <p className="text-right"><strong>{recommendedLinkTitle}</strong></p>
              <p className="text-right de-emphasized">{metadataStats}</p>
              <div className="flex flex-wrap justify-end">
                <button onClick={this.recommendAnotherLesson} ref={(skipButton) => { this.recommendationSkipButton = skipButton; }} className="de-emphasized-button pl3 pr3">Skip</button>
                <div className="text-right">
                  {recommendedLink}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap content-start-ns">
              <div className="flex flex-wrap">
                <RecommendationDescription
                  studyType={this.props.recommendedNextLesson.studyType}
                  setAnnouncementMessage={this.props.setAnnouncementMessage}
                />
              </div>
            </div>
          </div>
      );
    } else {
      recommendedNextLesson = (
          <div className="mw-384 w-336 order-1">
            <h3>Recommended…</h3>
            <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
              <p className="text-right"><strong>Loading…</strong></p>
              <p className="text-right de-emphasized"></p>
              <div className="flex flex-wrap justify-end">
                <button onClick={this.recommendAnotherLesson} ref={(skipButton) => { this.recommendationSkipButton = skipButton; }} className="de-emphasized-button pl3 pr3">Skip</button>
                <div className="text-right">
                  <button disabled className="link-button dib" style={{lineHeight: 2}}>Loading…</button>
                </div>
              </div>
            </div>
          </div>
      );
    }


    return (
      <div>
        <main id="main">
          <div className="subheader">
            <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1 self-center">
                <header className="flex items-baseline">
                  <h2 id="progress" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Progress</h2>
                </header>
              </div>
            </div>
          </div>

          {saveAndLoadPanels}

          <div className={this.state.reducedSaveAndLoad ? "p3 mx-auto mw-1024 mt3" : "p3 mx-auto mw-1024"}>
            <div className="flex justify-between">
              <h2 className="mb0">Your progress</h2>
              {reducedSaveAndLoadForms}
            </div>
            {progressSummaryAndLinks}
            <p className={ this.state.flashWarning.length > 0 ? "bg-warning pl1 pr1" : "hide" }>{this.state.flashWarning}</p>


            <div className="flex flex-wrap justify-between">
              {recommendedNextLesson}
              <div className="mw-568">
                <h3>Lessons progress</h3>
                <ul className="unstyled-list">{linkList}</ul>
              </div>
            </div>

            <h3>Vocabulary progress</h3>
            <p>Words you’ve seen and times you’ve typed them well:</p>
            <p id="js-metwords-from-typey-type" className="w-100 mt3 mb3 quote wrap"><small>{metWordsFromTypeyType}</small></p>
          </div>
        </main>
      </div>
    )
  }
}

export default Progress;
