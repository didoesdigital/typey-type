import React, { Component } from 'react';
import { IconClosingCross } from './Icon';
import { Link, Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import AnimateHeight from 'react-animate-height';
import DocumentTitle from 'react-document-title';
import ErrorBoundary from './ErrorBoundary'
import LessonCanvasFooter from '../pages/lessons/LessonCanvasFooter';
import LessonOverview from '../pages/lessons/LessonOverview';
import LessonNotFound from '../pages/lessons/LessonNotFound';
import Material from './Material';
import TypedText from './TypedText';
import Finished from './Finished';
import LessonLengthPreview from '../pages/lessons/LessonLengthPreview';
import Scores from './Scores';
import StrokeTip from './StrokeTip';
import UserSettings from './UserSettings';
import Flashcards from './Flashcards';
import { loadPersonalPreferences } from './../utils/typey-type';
import AussieDictPrompt from './LessonPrompts/AussieDictPrompt';
import SedSaidPrompt from './LessonPrompts/SedSaidPrompt';
import WordBoundaryErrorPrompt from './LessonPrompts/WordBoundaryErrorPrompt';

const isCustom = (pathname) =>
  pathname === "/lessons/custom" || pathname === "/lessons/custom/setup";

const isFlashcards = (pathname) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/flashcards");

const isOverview = (pathname) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/overview");

class Lesson extends Component {
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

    if (this.mainHeading) {
      this.mainHeading.focus();
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

  isFinished() {
    let presentedMaterialLength = (this.props.lesson && this.props.lesson.presentedMaterial) ? this.props.lesson.presentedMaterial.length : 0;
    return (this.props.currentPhraseID === presentedMaterialLength);
  }

  nextLessonPath() {
    let thisLesson = this.props.lesson.path;
    let suggestedNext = "/";
    let match = (el) => process.env.PUBLIC_URL + '/lessons' + el.path === thisLesson;
    let lessonIndexItem = this.props.lessonIndex.find(match);
    if (lessonIndexItem !== undefined) {
      if (lessonIndexItem.hasOwnProperty("suggestedNext")){
        suggestedNext = lessonIndexItem.suggestedNext;
      }
    }
    let nextLessonPath = '/lessons'+suggestedNext.replace(/lesson\.txt$/,'');
    return nextLessonPath;
  }

  prefillSurveyLink() {
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
    let param = "&entry.1202724812&entry.936119214";
    let prefillLesson = '';
    if (this.props.location && this.props.location.pathname) {
      prefillLesson = this.props.location.pathname;
    }
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param;
    }
  }

  render() {
    if (this.props.lessonNotFound) {
      return <LessonNotFound path={this.props.path} location={this.props.location} lessonIndex={this.props.lessonIndex} />
    }

    let createNewCustomLesson = '';
    let customMessage;
    let overviewLink = '';
    let lessonSubTitle = '';
    if (this.props.lesson && this.props.lesson.subtitle && this.props.lesson.subtitle.length > 0) {
      lessonSubTitle = ': '+this.props.lessonSubTitle;
    }

    if (isCustom(this.props.location.pathname)) {
      createNewCustomLesson = (<Link to='/lessons/custom/setup' onClick={this.props.stopLesson} className="link-button link-button-ghost table-cell mr1" role="button">Edit custom lesson</Link>);
    } else {
      createNewCustomLesson = '';
    }

    // This logic is duplicated in LessonOverview.jsx
    let lessonMetadata;
    lessonMetadata = this.props.lessonIndex.find(metadataEntry => process.env.PUBLIC_URL + '/lessons' + metadataEntry.path === this.props.lesson.path);
    overviewLink = lessonMetadata && lessonMetadata['overview'] ? <Link to={this.props.location.pathname + 'overview'} className="link-button link-button-ghost table-cell">Overview</Link> : ''

    if (this.props.settings && this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }

    let revisionModeButton;
    if (this.props.revisionMode) {
      revisionModeButton = (
        <div><Link to={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="revision-mode-button no-underline absolute right-0">Revision mode<IconClosingCross role="img" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="Exit revision mode" />
        </Link></div>
      );
    }

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
      if (this.isFinished() && !isOverview(this.props.location.pathname) && !isFlashcards(this.props.location.pathname)) {
        return (
          <DocumentTitle title={'Typey Type | Lesson: ' + this.props.lesson.title}>
            <main id="main">
              <div className="subheader">
                <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
                  <div className="flex mr1 self-center">
                    <header className="flex items-center min-h-40">
                      <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                        <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lessonTitle}{lessonSubTitle}</h2>
                      </a>
                    </header>
                  </div>
                  <div className="flex flex-wrap mxn2">
                    {createNewCustomLesson ? createNewCustomLesson : overviewLink}
                    { !this.props.path.includes("custom") && !this.props.path.includes("progress") ?
                      <Link to={this.props.path.replace("lesson.txt","flashcards").replace("/typey-type","")} className="link-button link-button-ghost table-cell mr1">Flashcards</Link>
                      :
                      null
                    }
                    <a href={this.props.path} onClick={this.props.restartLesson} className="button button--secondary table-cell mr2" style={{lineHeight: 2}} role="button">Restart</a>
                    <a href={this.props.path} onClick={this.props.handleStopLesson} className="button button--secondary table-cell mr2" style={{lineHeight: 2}} role="button">Stop</a>
                  </div>
                </div>
              </div>
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
                hideOtherSettings={this.props.hideOtherSettings}
                recommendationHistory={this.props.recommendationHistory}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
                suggestedNext={this.nextLessonPath()}
                lessonLength={propsLesson.presentedMaterial.length}
                lessonTitle={this.props.lessonTitle}
                location={this.props.location}
                metWords={this.props.metWords}
                path={this.props.path}
                prefillSurveyLink={this.prefillSurveyLink}
                restartLesson={this.props.restartLesson}
                reviseLesson={this.props.reviseLesson}
                settings={this.props.lesson.settings}
                startFromWordOne={this.props.startFromWordOne}
                startTime={this.props.startTime}
                timer={this.props.timer}
                toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                topSpeedToday={this.props.topSpeedToday}
                topSpeedPersonalBest={this.props.topSpeedPersonalBest}
                charsPerWord={this.props.charsPerWord}
                revisionMaterial={this.props.revisionMaterial}
                revisionMode={this.props.revisionMode}
                updateRecommendationHistory={this.props.updateRecommendationHistory}
                updateRevisionMaterial={this.props.updateRevisionMaterial}
                updateTopSpeedToday={this.props.updateTopSpeedToday}
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
                      lessonMetadata={lessonMetadata}
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
              <DocumentTitle title={'Typey Type | Lesson: ' + this.props.lesson.title}>
                <main id="main">
                  <div className="subheader">
                    <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
                      <div className="flex mr1 self-center">
                        <header className="flex items-center min-h-40">
                          <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                            <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lessonTitle}{lessonSubTitle}</h2>
                          </a>
                        </header>
                      </div>
                      <div className="flex flex-wrap mxn2">
                        {createNewCustomLesson ? createNewCustomLesson : overviewLink}
                        { !this.props.path.includes("custom") && !this.props.path.includes("progress") ?
                          <Link to={this.props.path.replace("lesson.txt","flashcards").replace("/typey-type","")} className="link-button link-button-ghost table-cell mr1">Flashcards</Link>
                          :
                          null
                        }
                        <a href={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="button button--secondary table-cell mr2" style={{lineHeight: 2}} role="button">Restart</a>
                        <a href={this.props.path} onClick={this.props.handleStopLesson} className="button button--secondary table-cell mr2" style={{lineHeight: 2}} role="button">Stop</a>
                      </div>
                    </div>
                  </div>
                  <div id="lesson-page" className="flex-wrap-md flex mx-auto mw-1920">
                    <div id="main-lesson-area" className="flex-grow mx-auto mw-1440 min-w-0">
                      <div>
                        <div className="mx-auto mw-1920">
                          {customMessage}
                        </div>
                        <div className="mx-auto mw-1920 p3">
                          <button onClick={this.props.changeShowScoresWhileTyping} className={"de-emphasized-button show-scores-control absolute mb3 " + (this.props.userSettings.showScoresWhileTyping ? 'show-scores-control--hidden' : 'show-scores-control--shown')}>Show scores</button>
                          <AnimateHeight
                            duration={ 300 }
                            height={ this.props.userSettings.showScoresWhileTyping ? 'auto' : 0 }
                            ease={'cubic-bezier(0.645, 0.045, 0.355, 1)'}
                          >
                            <div className={"mb3 " + (this.props.userSettings.showScoresWhileTyping ? 'scores--shown' : 'scores--hidden')} onClick={this.props.changeShowScoresWhileTyping}>
                              <Scores
                                setAnnouncementMessage={this.props.setAnnouncementMessage}
                                timer={this.props.timer}
                                totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
                                totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                                totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                                totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                                totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                                totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                              />
                            </div>
                          </AnimateHeight>
                          <div role="article" className="lesson-canvas panel mx-auto mw-1440 p2 mb3 flex">
                            {revisionModeButton}
                            <div className="mx-auto mw100 mt10 min-width70 material-typed-text-and-hint flex-grow">
                              <Material
                                actualText={this.props.actualText}
                                currentPhrase={this.props.currentPhrase}
                                currentStroke={this.props.currentStroke}
                                settings={this.props.settings}
                                userSettings={this.props.userSettings}
                                completedPhrases={this.props.completedPhrases}
                                upcomingPhrases={this.props.upcomingPhrases}
                                totalWordCount={this.props.totalWordCount}
                                {...this.props}
                              />
                              <TypedText
                                actualText={this.props.actualText}
                                currentLessonStrokes={this.props.currentLessonStrokes}
                                currentPhrase={this.props.currentPhrase}
                                completedPhrases={this.props.lesson.newPresentedMaterial.completed}
                                previousCompletedPhraseAsTyped={this.props.previousCompletedPhraseAsTyped}
                                sayCurrentPhraseAgain={this.props.sayCurrentPhraseAgain}
                                settings={this.props.settings}
                                updateMarkup={this.props.updateMarkup.bind(this)}
                                userSettings={this.props.userSettings}
                              />
                              <WordBoundaryErrorPrompt
                                actualText={this.props.actualText}
                                currentPhrase={this.props.currentPhrase}
                                setAnnouncementMessage={this.props.setAnnouncementMessage}
                              />
                              <AussieDictPrompt
                                actualText={this.props.actualText}
                                currentStroke={this.props.currentStroke}
                                setAnnouncementMessage={this.props.setAnnouncementMessage}
                              />
                              <SedSaidPrompt
                                actualText={this.props.actualText}
                                currentPhrase={this.props.currentPhrase}
                                setAnnouncementMessage={this.props.setAnnouncementMessage}
                              />
                              <StrokeTip
                                changeShowStrokesInLesson={this.props.changeShowStrokesInLesson}
                                currentStroke={this.props.currentStroke}
                                repetitionsRemaining={this.props.repetitionsRemaining}
                                showStrokesInLesson={this.props.showStrokesInLesson}
                                targetStrokeCount={this.props.targetStrokeCount}
                                userSettings={this.props.userSettings}
                              />
                              <LessonLengthPreview
                                lessonStarted={this.props.disableUserSettings}
                                speed={this.props.userSettings?.beatsPerMinute || 10}
                                totalWords={propsLesson.presentedMaterial.length}
                              />
                            </div>
                          </div>
                          <LessonCanvasFooter
                            chooseStudy={this.props.chooseStudy}
                            disableUserSettings={this.props.disableUserSettings}
                            hideOtherSettings={this.props.hideOtherSettings}
                            path={this.props.path}
                            setAnnouncementMessage={this.props.setAnnouncementMessage}
                            toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                            totalWordCount={this.props.totalWordCount}
                            userSettings={this.props.userSettings}
                          />
                        </div>
                        <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" rel="noopener noreferrer" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--lesson--give-feedback">Give feedback on this lesson (form opens in a new tab)</a></p>
                      </div>
                    </div>
                    <div>
                      <UserSettings
                        changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                        changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                        changeStenoLayout={this.props.changeStenoLayout}
                        changeShowStrokesAs={this.props.changeShowStrokesAs}
                        changeShowStrokesOnMisstroke={this.props.changeShowStrokesOnMisstroke}
                        changeUserSetting={this.props.changeUserSetting}
                        chooseStudy={this.props.chooseStudy}
                        disableUserSettings={this.props.disableUserSettings}
                        handleDiagramSize={this.props.handleDiagramSize}
                        handleBeatsPerMinute={this.props.handleBeatsPerMinute}
                        handleLimitWordsChange={this.props.handleLimitWordsChange}
                        handleStartFromWordChange={this.props.handleStartFromWordChange}
                        handleRepetitionsChange={this.props.handleRepetitionsChange}
                        handleUpcomingWordsLayout={this.props.handleUpcomingWordsLayout}
                        hideOtherSettings={this.props.hideOtherSettings}
                        maxStartFromWord={this.props.lessonLength}
                        path={this.props.path}
                        revisionMode={this.props.revisionMode}
                        setAnnouncementMessage={this.props.setAnnouncementMessage}
                        toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                        totalWordCount={this.props.totalWordCount}
                        userSettings={this.props.userSettings}
                      />
                    </div>
                  </div>
                </main>
              </DocumentTitle>
            } />
          </Switch>
        )
      }
    } else {
      return <div><h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That lesson is missing.</h2></div>;
    }
  }
}

export default Lesson;
