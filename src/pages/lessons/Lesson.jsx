import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import queryString from 'query-string';
import DocumentTitle from 'react-document-title';
import ErrorBoundary from '../../components/ErrorBoundary'
import LessonNotFound from './LessonNotFound';
import LessonOverview from './LessonOverview';
import LessonSubheader from './components/LessonSubheader';
import Finished from './components/Finished';
import Flashcards from './flashcards/Flashcards';
import { loadPersonalPreferences } from '../../utils/typey-type';
import getLessonMetadata from './utilities/getLessonMetadata';
import MainLessonView from './MainLessonView';

const isCustom = (pathname) =>
  pathname === "/lessons/custom" || pathname === "/lessons/custom/setup";

const isFinished = (lesson, currentPhraseID) =>
  currentPhraseID === lesson?.presentedMaterial?.length || 0;

const isFlashcards = (pathname) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/flashcards");

const isOverview = (pathname) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/overview");

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.mainHeading = React.createRef();
    this.state = {
      hideOtherSettings: false
    }
  }

  componentDidMount() {
    // If cookies are disabled, attempting to access localStorage will cause an error.
    // The disabled cookie error will be handled in ErrorBoundary.
    // Wrapping this in a try/catch or removing the conditional would fail silently.
    // By checking here, we let people use the rest of the app but not lessons.
    if (window.localStorage) {
      if (this.props.location.pathname.startsWith('/lessons/progress/') && !this.props.location.pathname.includes('/lessons/progress/seen/') && !this.props.location.pathname.includes('/lessons/progress/memorised/')) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, true, true]
        this.props.setUpProgressRevisionLesson(loadedPersonalPreferences[0], loadedPersonalPreferences[1], newSeenOrMemorised);
      }
      else if (this.props.location.pathname.startsWith('/lessons/progress/seen/')) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, true, false]
        this.props.setUpProgressRevisionLesson(loadedPersonalPreferences[0], loadedPersonalPreferences[1], newSeenOrMemorised);
      }
      else if (this.props.location.pathname.startsWith('/lessons/progress/memorised/')) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, false, true]
        this.props.setUpProgressRevisionLesson(loadedPersonalPreferences[0], loadedPersonalPreferences[1], newSeenOrMemorised);
      }
      else if (this.props.location.pathname.startsWith('/lessons/custom') && (!this.props.location.pathname.startsWith('/lessons/custom/setup'))) {
        this.props.startCustomLesson();
      }
      else if(isOverview(this.props.location.pathname)) {
        // do nothing
      }
      else if(isFlashcards(this.props.location.pathname)) {
        // do nothing
      }
      else if((this.props.lesson.path!==this.props.location.pathname+'lesson.txt') && (this.props.location.pathname.startsWith('/lessons'))) {
        this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
      }

      const parsedParams = queryString.parse(this.props.location.search);
      let hasSettingsParams = false;

      if (Object.keys(parsedParams).some((param) => {
        return this.props.userSettings.hasOwnProperty(param);
        })) {
        hasSettingsParams = true;
      }

      if (hasSettingsParams) {
        this.props.setupLesson();
        hasSettingsParams = false;
      }
    }

    if (this.mainHeading?.current) {
      this.mainHeading?.current.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname.startsWith('/lessons/custom') && !this.props.location.pathname.startsWith('/lessons/custom/setup') && this.props.lesson.title !== "Custom") {
      this.props.startCustomLesson();
    } else if(isOverview(this.props.location.pathname)) {
      // do nothing
    } else if (isFlashcards(this.props.location.pathname)) {
      // do nothing
    } else if((prevProps.match.url!==this.props.match.url) && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }
    if (this.props.location.pathname.startsWith('/lessons/custom') && (prevProps.totalWordCount === 0 || prevProps.currentPhrase === "") && (this.props.totalWordCount > 0 || this.props.currentPhrase.length > 0)) {
      const yourTypedText = document.getElementById('your-typed-text');
      if (yourTypedText) {
        yourTypedText.focus();
      }
    }
  }

  componentWillUnmount() {
    this.props.stopLesson()
  }

  toggleHideOtherSettings() {
    let toggledHideOtherSettings = !this.state.hideOtherSettings;
    this.setState({
      hideOtherSettings: toggledHideOtherSettings
    });

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Toggle hide other settings',
      label: toggledHideOtherSettings.toString()
    });
  }

  render() {
    if (this.props.lessonNotFound) {
      return <LessonNotFound path={this.props.path} location={this.props.location} lessonIndex={this.props.lessonIndex} />
    }

    const lessonSubTitle = (this.props.lesson?.subtitle?.length > 0) ? `: ${this.props.lessonSubTitle}` : '';

    const createNewCustomLesson = isCustom(this.props.location.pathname) ? (
      <Link
        to="/lessons/custom/setup"
        onClick={this.props.stopLesson}
        className="link-button link-button-ghost table-cell mr1"
        role="button"
      >
        Edit custom lesson
      </Link>
    ) : (
      ""
    );

    const metadata = getLessonMetadata(
      this.props.lessonIndex,
      this.props.lesson.path
    );
    const overviewLink = metadata?.overview ?
      <Link to={this.props.location.pathname + 'overview'} className="link-button link-button-ghost table-cell">Overview</Link> :
      '';

    let propsLesson = this.props.lesson;
    if ((Object.keys(propsLesson).length === 0 && propsLesson.constructor === Object) || !propsLesson) {
      propsLesson = {
        sourceMaterial: [ {phrase: 'The', stroke: '-T'} ],
        presentedMaterial: [ {phrase: 'The', stroke: '-T'}, ],
        settings: { ignoredChars: '' },
        title: 'Steno', subtitle: '',
        path: ''
      };
    }

    if (this.props.lesson) {
      if (isFinished(this.props.lesson, this.props.currentPhraseID) && !isOverview(this.props.location.pathname) && !isFlashcards(this.props.location.pathname)) {
        return (
          <DocumentTitle title={'Typey Type | Lesson: ' + this.props.lesson.title}>
            <main id="main">
              <LessonSubheader
                createNewCustomLesson={createNewCustomLesson}
                handleStopLesson={this.props.handleStopLesson}
                lessonSubTitle={lessonSubTitle}
                lessonTitle={this.props.lessonTitle}
                overviewLink={overviewLink}
                path={this.props.path}
                restartLesson={this.props.restartLesson}
                ref={this.mainHeading}
              />
              <Finished
                actualText={this.props.actualText}
                changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                changeShowStrokesAs={this.props.changeShowStrokesAs}
                changeShowStrokesOnMisstroke={this.props.changeShowStrokesOnMisstroke}
                changeStenoLayout={this.props.changeStenoLayout}
                changeUserSetting={this.props.changeUserSetting}
                chooseStudy={this.props.chooseStudy}
                currentLessonStrokes={this.props.currentLessonStrokes}
                disableUserSettings={this.props.disableUserSettings}
                globalUserSettings={this.props.globalUserSettings}
                handleBeatsPerMinute={this.props.handleBeatsPerMinute}
                handleLimitWordsChange={this.props.handleLimitWordsChange}
                handleStartFromWordChange={this.props.handleStartFromWordChange}
                handleRepetitionsChange={this.props.handleRepetitionsChange}
                handleUpcomingWordsLayout={this.props.handleUpcomingWordsLayout}
                hideOtherSettings={this.state.hideOtherSettings}
                recommendationHistory={this.props.recommendationHistory}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
                metadata={metadata}
                lessonLength={propsLesson.presentedMaterial.length}
                lessonTitle={this.props.lessonTitle}
                location={this.props.location}
                metWords={this.props.metWords}
                path={this.props.path}
                restartLesson={this.props.restartLesson}
                reviseLesson={this.props.reviseLesson}
                settings={this.props.lesson.settings}
                startFromWordOne={this.props.startFromWordOne}
                startTime={this.props.startTime}
                timer={this.props.timer}
                toggleHideOtherSettings={this.toggleHideOtherSettings.bind(this)}
                topSpeedPersonalBest={this.props.topSpeedPersonalBest}
                charsPerWord={this.props.charsPerWord}
                revisionMaterial={this.props.revisionMaterial}
                revisionMode={this.props.revisionMode}
                updateRecommendationHistory={this.props.updateRecommendationHistory}
                updateRevisionMaterial={this.props.updateRevisionMaterial}
                updateTopSpeedPersonalBest={this.props.updateTopSpeedPersonalBest}
                totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
                totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                totalWordCount={propsLesson.presentedMaterial.length}
                userSettings={this.props.userSettings}
              />
            </main>
          </DocumentTitle>
        )
      } else {
        return (
          <Switch>
            <Route path={`/lessons/:category/:subcategory?/:lessonPath/overview`} render={(props) =>
              <div>
                <ErrorBoundary>
                  <DocumentTitle title={'Typey Type | Lesson overview'}>
                    <LessonOverview
                      lessonMetadata={metadata}
                      lessonPath={this.props.location.pathname.replace("overview", "")}
                      lessonTxtPath={this.props.location.pathname.replace("overview", "lesson.txt")}
                      lessonTitle={this.props.lesson.title}
                      {...this.props}
                      {...props}
                    />
                  </DocumentTitle>
                </ErrorBoundary>
              </div>
            } />
            <Route path={`/lessons/:category/:subcategory?/:lessonPath/flashcards`} render={() =>
              <div>
                <DocumentTitle title={'Typey Type | Flashcards'}>
                  <Flashcards
                    fetchAndSetupGlobalDict={this.props.fetchAndSetupGlobalDict}
                    flashcardsMetWords={this.props.flashcardsMetWords}
                    flashcardsProgress={this.props.flashcardsProgress}
                    globalLookupDictionary={this.props.globalLookupDictionary}
                    globalLookupDictionaryLoaded={this.props.globalLookupDictionaryLoaded}
                    globalUserSettings={this.props.globalUserSettings}
                    personalDictionaries={this.props.personalDictionaries}
                    updateFlashcardsMetWords={this.props.updateFlashcardsMetWords.bind(this)}
                    updateFlashcardsProgress={this.props.updateFlashcardsProgress.bind(this)}
                    updateGlobalLookupDictionary={this.props.updateGlobalLookupDictionary}
                    updatePersonalDictionaries={this.props.updatePersonalDictionaries}
                    userSettings={this.props.userSettings}
                    fullscreen={this.props.fullscreen}
                    changeFullscreen={this.props.changeFullscreen.bind(this)}
                    lessonpath={process.env.PUBLIC_URL + this.props.location.pathname.replace(/flashcards/, '') + 'lesson.txt'}
                    locationpathname={this.props.location.pathname}
                  />
                </DocumentTitle>
              </div>
            } />
            <Route exact={true} path={`${this.props.match.url}`} render={() =>
              <MainLessonView
                createNewCustomLesson={createNewCustomLesson}
                lessonSubTitle={lessonSubTitle}
                overviewLink={overviewLink}
                propsLesson={propsLesson}
                actualText={this.props.actualText}
                changeShowScoresWhileTyping={this.props.changeShowScoresWhileTyping}
                changeShowStrokesAs={this.props.changeShowStrokesAs}
                changeShowStrokesInLesson={this.props.changeShowStrokesInLesson}
                changeShowStrokesOnMisstroke={this.props.changeShowStrokesOnMisstroke}
                changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                changeStenoLayout={this.props.changeStenoLayout}
                changeUserSetting={this.props.changeUserSetting}
                chooseStudy={this.props.chooseStudy}
                completedPhrases={this.props.completedPhrases}
                currentLessonStrokes={this.props.currentLessonStrokes}
                currentPhrase={this.props.currentPhrase}
                currentStroke={this.props.currentStroke}
                disableUserSettings={this.props.disableUserSettings}
                handleBeatsPerMinute={this.props.handleBeatsPerMinute}
                handleDiagramSize={this.props.handleDiagramSize}
                handleLimitWordsChange={this.props.handleLimitWordsChange}
                handleRepetitionsChange={this.props.handleRepetitionsChange}
                handleStartFromWordChange={this.props.handleStartFromWordChange}
                handleStopLesson={this.props.handleStopLesson}
                handleUpcomingWordsLayout={this.props.handleUpcomingWordsLayout}
                lesson={this.props.lesson}
                lessonLength={this.props.lessonLength}
                lessonTitle={this.props.lessonTitle}
                location={this.props.location}
                path={this.props.path}
                previousCompletedPhraseAsTyped={this.props.previousCompletedPhraseAsTyped}
                repetitionsRemaining={this.props.repetitionsRemaining}
                restartLesson={this.props.restartLesson}
                revisionMode={this.props.revisionMode}
                sayCurrentPhraseAgain={this.props.sayCurrentPhraseAgain}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
                settings={this.props.settings}
                showStrokesInLesson={this.props.showStrokesInLesson}
                targetStrokeCount={this.props.targetStrokeCount}
                timer={this.props.timer}
                totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
                totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                totalWordCount={this.props.totalWordCount}
                upcomingPhrases={this.props.upcomingPhrases}
                updateMarkup={this.props.updateMarkup.bind(this)}
                userSettings={this.props.userSettings}
                hideOtherSettings={this.state.hideOtherSettings}
                toggleHideOtherSettings={this.toggleHideOtherSettings.bind(this)}
              />
            } />
          </Switch>
        )
      }
    } else {
      return <div><h2 ref={this.mainHeading} tabIndex="-1">That lesson is missing.</h2></div>;
    }
  }
}

export default Lesson;
