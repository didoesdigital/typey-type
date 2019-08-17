import React, { Component } from 'react';
import * as PARAMS from './../params.js';
import AnimateHeight from 'react-animate-height';
import GoogleAnalytics from 'react-ga';
import ErrorBoundary from './ErrorBoundary'
import PseudoContentButton from './PseudoContentButton';
import FlashcardsBox from './FlashcardsBox';
import RecommendationBox from './../RecommendationBox';
import { getLessonIndexData } from './../lessonIndexData';
import { IconCheckmark, IconTriangleRight, IconExternal } from './Icon';
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
      showRecommendationsSurveyLink: true,
      progressPercent: 0,
      yourWordCount: 0,
      yourSeenWordCount: 0,
      yourMemorisedWordCount: 0,
      toRecommendedNextLesson: false,
      toFlashcardsNextLesson: false
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

  moreFlashcards = (skipButtonPressed = true) => {
    let labelString = this.props.flashcardsNextLesson.link;
    if (!labelString) { labelString = "BAD_INPUT"; }

    if (skipButtonPressed) {
      GoogleAnalytics.event({
        category: 'Flashcards',
        action: 'Skip recommended flashcards',
        label: labelString
      });
    }

    if (skipButtonPressed) {
      const element = document.getElementById('js-skip-flashcards-button');
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

  render () {
    if (this.state.toRecommendedNextLesson === true) {
      return <Redirect push to={this.props.recommendedNextLesson.link} />
    }

    if (this.state.toFlashcardsNextLesson === true) {
      return <Redirect push to={this.props.flashcardsNextLesson.link} />
    }

    let lessonsProgressFromTypeyType = this.props.lessonsProgress;
    const linkList = this.props.lessonIndex.map( (lesson) => {
      let lessonsubtitle = '';
      let lessonWordCount = 0;
      let lessonWordCountInIndex = '';
      let numberOfWordsSeenOrMemorised = 0;
      let lessonCompletion;
      if (lesson.subtitle && lesson.subtitle.length > 0) {
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
      if (lesson.category === "Fundamentals" || (lesson.category === "Drills" && lesson.title.startsWith("Top 100")) || (lesson.category === "Drills" && lesson.title.startsWith("Top 200"))) {
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

    // console.log("Your total word count: " + yourWordCount);
    // console.log("Your seen word count: " + yourSeenWordCount);
    // console.log("Your memorised word count: " + yourMemorisedWordCount);
    // TODO: write a pluralisation function for this monstrosity and add tests
    let progressSummaryAndLinks = (
      <p>You’ve successfully typed {this.state.yourWordCount} words without hints or misstrokes.</p>
    );
    if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount === 0) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} word without misstrokes. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount === 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 1 && this.state.yourMemorisedWordCount > 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 0 && this.state.yourMemorisedWordCount === 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} word without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount === 0 && this.state.yourMemorisedWordCount > 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount === 0) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount === 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/'>Practice&nbsp;your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised word</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }
    if (this.state.yourSeenWordCount > 1 && this.state.yourMemorisedWordCount > 1) {
      progressSummaryAndLinks = (
        <p>You’ve successfully typed {this.state.yourWordCount} words without misstrokes. You’re {this.state.progressPercent}% of the way to 10,000 words. <Link to='/lessons/progress/'>Practice&nbsp;your words</Link>. <Link to='/lessons/progress/memorised/'>Drill&nbsp;{this.state.yourMemorisedWordCount} memorised words</Link>. <Link to='/lessons/progress/seen/'>Revise&nbsp;{this.state.yourSeenWordCount} seen words</Link>. <Link to={'/lessons/drills/top-10000-project-gutenberg-words/' + PARAMS.discoverParams}>Discover new words</Link>.</p>
      );
    }

    let showFlashcards = true;

    let date = new Date();
    let dashifiedDate = date.toDateString().replace(/ /g,'-').toLowerCase();
    let downloadProgressHref;

    if (Blob !== undefined) {
      let blob = new Blob([JSON.stringify(this.props.metWords)], {type: "text/json"});
      downloadProgressHref = URL.createObjectURL(blob);
    }
    else {
      downloadProgressHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.metWords));
    }

    return (
      <div>
        <main id="main">
          <div className="subheader">
            <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1 self-center">
                <header className="flex items-baseline">
                  <h2 id="progress" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Progress</h2>
                </header>
              </div>
              <div className="flex mxn2">
                <a href={downloadProgressHref} download={"typey-type-progress-" + dashifiedDate + ".json"} onClick={this.downloadProgress.bind(this)} className="link-button link-button-ghost table-cell mr1">Download progress file</a>
              </div>
            </div>
          </div>

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
                    flashcardsNextLesson={this.props.flashcardsNextLesson}
                    setAnnouncementMessage={this.props.setAnnouncementMessage}
                    loadingLessonIndex={this.state.loadingLessonIndex}
                    startFlashcards={this.startFlashcards.bind(this)}
                    moreFlashcards={this.moreFlashcards}
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
            <p className={ this.state.flashWarning.length > 0 ? "bg-warning pl1 pr1" : "hide" }>{this.state.flashWarning}</p>


            <div className="flex flex-wrap justify-between">
              <div className="mw-384 w-336 order-1">
                <ErrorBoundary relative={true}>
                  <AnimateHeight
                    duration={ 300 }
                    height={ this.state.showRecommendationsSurveyLink ? 'auto' : '0' }
                    ease={'cubic-bezier(0.645, 0.045, 0.355, 1)'}
                  >
                    <div className={this.state.showRecommendationsSurveyLink ? "recommendation-survey-link--shown" : "recommendation-survey-link--hidden"}>
                      <p className="panel p3 mb3 mt4 relative">
                        <span className="bg-danger">Help improve Typey Type!</span>
                        <button onClick={this.hideRecommendationsSurveyLink.bind(this)} className="hide-recommendation-link absolute right-0 p0 mr1">Hide</button>
                        <br />
                        <GoogleAnalytics.OutboundLink
                          eventLabel="Recommendations survey"
                          aria-label="Survey about Typey Type recommendations (external link opens in new tab)"
                          to="https://docs.google.com/forms/d/e/1FAIpQLSf3XiHpSUTdgkGERdpoyqAIFA8t9YOGs8TvuU_d0bfsRe2vQA/viewform?usp=sf_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={this.state.showRecommendationsSurveyLink ? '0' : '-1'}
                        >
                          Give feedback on these <span className="nowrap">recommendations
                            <Tooltip
                              title="Opens in new tab"
                              className=""
                              animation="shift"
                              arrow="true"
                              duration="200"
                              tabIndex={this.state.showRecommendationsSurveyLink ? '0' : '-1'}
                              tag="span"
                              theme="didoesdigital"
                              trigger={this.state.showRecommendationsSurveyLink ? 'mouseenter focus click' : ''}
                              onShow={this.props.setAnnouncementMessage}
                            >
                              <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                            </Tooltip>
                          </span>
                        </GoogleAnalytics.OutboundLink>
                      </p>
                    </div>
                  </AnimateHeight>
                  <RecommendationBox
                    recommendedNextLesson={this.props.recommendedNextLesson}
                    setAnnouncementMessage={this.props.setAnnouncementMessage}
                    loadingLessonIndex={this.state.loadingLessonIndex}
                    startRecommendedStep={this.startRecommendedStep.bind(this)}
                    recommendAnotherLesson={this.recommendAnotherLesson}
                  />
                </ErrorBoundary>

                { showFlashcards ?
                  <div className="mx-auto hide-sm-only">
                    <div className="mw100 w-336">
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
                          flashcardsNextLesson={this.props.flashcardsNextLesson}
                          setAnnouncementMessage={this.props.setAnnouncementMessage}
                          loadingLessonIndex={this.state.loadingLessonIndex}
                          startFlashcards={this.startFlashcards.bind(this)}
                          moreFlashcards={this.moreFlashcards}
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
