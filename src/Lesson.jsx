import React, { Component } from 'react';
import { IconClosingCross } from './Icon';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import StenoboardDiagram from './StenoboardDiagram';
import UserSettings from './UserSettings';
import Finished from './Finished';
import Flashcards from './Flashcards';
import CustomLessonSetup from './CustomLessonSetup';
import { shouldShowStroke, splitBriefsIntoStrokes, mapBriefToKeys } from './typey-type';

class Lesson extends Component {
  componentDidMount() {
    if (this.props.location.pathname.startsWith('/lessons/custom')) {
      this.props.setCustomLesson();
    } else if(this.isFlashcards()) {
      // do nothing
    } else if((this.props.lesson.path!==this.props.location.pathname+'lesson.txt') && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname.startsWith('/lessons/custom') && this.props.lesson.title !== "Custom") {
      this.props.setCustomLesson();
    } else if (this.isFlashcards()) {
      // do nothing
    } else if((prevProps.match.url!==this.props.match.url) && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }
    if (this.props.location.pathname.startsWith('/lessons/custom') && (prevProps.totalWordCount === 0 || prevProps.currentPhrase === "")) {
      if (this.mainHeading) {
        this.mainHeading.focus();
      }
    }
  }

  isCustom() {
    return (this.props.location.pathname === '/lessons/custom');
  }
  isFlashcards() {
    return (this.props.location.pathname.startsWith('/lessons/') && this.props.location.pathname.endsWith('/flashcards'));
  }

  isSetup() {
    return (this.props.lesson.sourceMaterial.length !== 0);
  }

  isFinished() {
    return (this.props.currentPhraseID === this.props.lesson.presentedMaterial.length);
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
    let createNewCustomLesson = '';
    let customMessage;
    let firstVisit;
    let strokeTip;
    let lessonSubTitle = '';
    if (this.props.lesson.subtitle.length > 0) {
      lessonSubTitle = ': '+this.props.lessonSubTitle;
    }

    if (this.isCustom() && this.isSetup()) {
      createNewCustomLesson = (<Link to='/lessons/custom' onClick={this.props.setCustomLesson} className="link-button link-button-ghost table-cell mr1" role="button">Create new lesson</Link>);
    } else {
      createNewCustomLesson = '';
    }

    if (this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }

    if (this.props.firstVisit) {
      firstVisit = (
        <div className='p3 pb0 mb0 mx-auto mw-1024'>
          <p className="mb0">Welcome to Typey&nbsp;type for stenographers. Type the words shown, including the first space.</p>
        </div>
      );
    } else {
      firstVisit = '';
    }

    let strokeTarget = this.props.targetStrokeCount + ' strokes';
    if (this.props.targetStrokeCount === 1) {
      strokeTarget = this.props.targetStrokeCount + ' stroke';
    }

    let revisionModeButton;
    if (this.props.revisionMode) {
      revisionModeButton = (
        <div><Link to={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="revision-mode-button no-underline absolute right-0">Revision mode<IconClosingCross role="img" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="Exit revision mode" />
        </Link></div>
      );
    }

    if (shouldShowStroke(this.props.showStrokesInLesson, this.props.userSettings.showStrokes, this.props.repetitionsRemaining, this.props.userSettings.hideStrokesOnLastRepetition)) {
      if (this.props.currentStroke) {
        let strokes = splitBriefsIntoStrokes(this.props.currentStroke);
        strokeTip =
          <div className="stroke-tip" aria-live="polite">
            <span className="visually-hidden">Hint: </span>
            <div className="flex overflow-auto">
              {this.props.userSettings.showStrokesAsDiagrams && strokes.map((strokeToDraw, index) =>
                <React.Fragment key={index}>
                  {(Object.values(mapBriefToKeys(strokeToDraw)).some(item => item)) && <div className="mt1 mr2"><StenoboardDiagram {...mapBriefToKeys(strokeToDraw)} brief={strokeToDraw} /></div> }
                </React.Fragment>
              )}
            </div>
            <div className="db">
              <pre className="overflow-auto mw-408 text-small">
                <span className="steno-stroke">
                  {this.props.currentStroke.split('').map((item, i) =>
                    <kbd className="raw-steno-key text-small" key={i}>
                      {item}
                    </kbd>
                  )}
                </span>
              </pre>
            </div>
          </div>;
      }
    } else {
      strokeTip = <div className="stroke-tip">
        <label className="mb0 text-small stroke-tip__label">
          <input
            className="checkbox-input visually-hidden"
            type="checkbox"
            name="showStrokesInLesson"
            id="showStrokesInLesson"
            checked={this.props.showStrokesInLesson}
            onChange={this.props.changeShowStrokesInLesson}
            />
          {strokeTarget} (hint?)
        </label>
      </div>;
    }

    if (this.props.lesson) {
      if (this.isFlashcards()) {
        return (
          <DocumentTitle title={'Typey type | Flashcards'}>
            <Flashcards
              flashcardsMetWords={this.props.flashcardsMetWords}
              flashcardsProgress={this.props.flashcardsProgress}
              updateFlashcardsMetWords={this.props.updateFlashcardsMetWords.bind(this)}
              updateFlashcardsProgress={this.props.updateFlashcardsProgress.bind(this)}
              fullscreen={this.props.fullscreen}
              changeFullscreen={this.props.changeFullscreen.bind(this)}
              lessonpath={process.env.PUBLIC_URL + this.props.location.pathname.replace(/flashcards/, '') + 'lesson.txt'}
              locationpathname={this.props.location.pathname}
            />
          </DocumentTitle>
        )
      } else if (this.isCustom() && !this.isSetup()) {
        return (
          <DocumentTitle title='Typey type | Create a custom lesson'>
            <CustomLessonSetup
              createCustomLesson={this.props.createCustomLesson}
              metWords={this.props.metWords}
            />
          </DocumentTitle>
        )
      } else if (this.isFinished()) {
        return (
          <DocumentTitle title={'Typey type | ' + this.props.lesson.title}>
            <main id="main">
              <div className="subheader">
                <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                  <div className="flex mr1">
                    <header className="flex items-baseline">
                      <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                        <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lessonTitle}{lessonSubTitle}</h2>
                      </a>
                    </header>
                  </div>
                  <div className="mxn2">
                    {createNewCustomLesson}
                    <a href={this.props.path} onClick={this.props.restartLesson} className="link-button link-button-ghost table-cell mr1" role="button">Restart</a>
                    <a href={this.props.path} onClick={this.props.handleStopLesson} className="link-button link-button-ghost table-cell" role="button">Stop</a>
                  </div>
                </div>
              </div>
              <Finished
                actualText={this.props.actualText}
                changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                changeUserSetting={this.props.changeUserSetting}
                chooseStudy={this.props.chooseStudy}
                currentLessonStrokes={this.props.currentLessonStrokes}
                disableUserSettings={this.props.disableUserSettings}
                handleLimitWordsChange={this.props.handleLimitWordsChange}
                handleRepetitionsChange={this.props.handleRepetitionsChange}
                hideOtherSettings={this.props.hideOtherSettings}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
                suggestedNext={this.nextLessonPath()}
                lessonLength={this.props.lesson.presentedMaterial.length}
                path={this.props.path}
                prefillSurveyLink={this.prefillSurveyLink}
                restartLesson={this.props.restartLesson}
                reviseLesson={this.props.reviseLesson}
                settings={this.props.lesson.settings}
                timer={this.props.timer}
                toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                charsPerWord={this.props.charsPerWord}
                revisionMaterial={this.props.revisionMaterial}
                updateRevisionMaterial={this.props.updateRevisionMaterial}
                totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
                totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                totalWordCount={this.props.lesson.presentedMaterial.length}
                userSettings={this.props.userSettings}
              />
            </main>
          </DocumentTitle>
        )
      } else {
        return (
          <DocumentTitle title={'Typey type | ' + this.props.lesson.title}>
            <main id="main">
              <div className="subheader">
                <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                  <div className="flex mr1">
                    <header className="flex items-baseline">
                      <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                        <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lessonTitle}{lessonSubTitle}</h2>
                      </a>
                    </header>
                  </div>
                  <div className="mxn2">
                    {createNewCustomLesson}
                    <a href={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="link-button link-button-ghost table-cell mr1" role="button">Restart</a>
                    <a href={this.props.path} onClick={this.props.handleStopLesson} className="link-button link-button-ghost table-cell" role="button">Stop</a>
                  </div>
                </div>
              </div>
              <div>
                {firstVisit}
                <div role="complementary" className="mx-auto mw-1024">
                  {customMessage}
                </div>
                <div className="lesson-wrapper mw-1024 p3">
                  <UserSettings
                    changeUserSetting={this.props.changeUserSetting}
                    changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                    changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                    chooseStudy={this.props.chooseStudy}
                    disableUserSettings={this.props.disableUserSettings}
                    setAnnouncementMessage={this.props.setAnnouncementMessage}
                    handleLimitWordsChange={this.props.handleLimitWordsChange}
                    handleRepetitionsChange={this.props.handleRepetitionsChange}
                    hideOtherSettings={this.props.hideOtherSettings}
                    toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                    totalWordCount={this.props.totalWordCount}
                    userSettings={this.props.userSettings}
                  />
                  <div role="article" className="lesson-canvas panel mw-568 p2 fill-fade-parent">
                    {revisionModeButton}
                    <span className="fill-fade-edges"></span>
                    <div className="mx-auto mw100 mt11 text-center">
                      <Material
                        actualText={this.props.actualText}
                        currentPhrase={this.props.currentPhrase}
                        currentStroke={this.props.currentStroke}
                        settings={this.props.settings}
                        userSettings={this.props.userSettings}
                        completedPhrases={this.props.completedPhrases}
                        upcomingPhrases={this.props.upcomingPhrases}
                      />
                      <TypedText
                        actualText={this.props.actualText}
                        currentPhrase={this.props.currentPhrase}
                        settings={this.props.settings}
                        updateMarkup={this.props.updateMarkup.bind(this)}
                        userSettings={this.props.userSettings}
                      />
                      <div aria-hidden="true">
                        {strokeTip}
                      </div>
                    </div>
                  </div>
                  <div className="visually-hidden">
                    {strokeTip}
                  </div>
                  <div className="scores panel p2">
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
                </div>
                <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--lesson--give-feedback">Give feedback on this lesson (form opens in a new tab)</a></p>
              </div>
            </main>
          </DocumentTitle>
        )
      }
    } else {
      return <div><h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That lesson is missing.</h2></div>;
    }
  }
}

export default Lesson;
