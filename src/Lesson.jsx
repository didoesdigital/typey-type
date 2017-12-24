import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import UserSettings from './UserSettings';
import Finished from './Finished';

class Lesson extends Component {
  componentDidMount() {
    if((this.props.lesson.path!==this.props.location.pathname+'lesson.txt') && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if((prevProps.match.url!==this.props.match.url) && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }
  }

  isFinished() {
    return (this.props.currentPhraseID === this.props.lesson.presentedMaterial.length);
  }

  render() {
    let customMessage;
    let firstVisit;
    let strokeTip;
    let lessonSubTitle = '';
    if (this.props.lesson.subtitle.length > 0) {
      lessonSubTitle = ': '+this.props.lessonSubTitle;
    }

    if (this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }

    if (this.props.firstVisit) {
      firstVisit = <h2 className='p3 pb0 mb0 mx-auto mw-1024'>Welcome to Typey&nbsp;type for stenographers</h2>;
    } else {
      firstVisit = '';
    }

    if (this.props.userSettings.showStrokes || this.props.showStrokesInLesson) {
      strokeTip = <div className="stroke-tip"><span className="visually-hidden">Hint: </span><pre><span className="steno-stroke"><abbr>{this.props.currentStroke}</abbr></span></pre></div>;
    } else {
      strokeTip = <div className="stroke-tip">
        <label className="mb0 text-small">
          <input
            className="checkbox-input hide"
            type="checkbox"
            name="showStrokesInLesson"
            id="showStrokesInLesson"
            checked={this.props.showStrokesInLesson}
            onChange={this.props.changeShowStrokesInLesson}
            />
          Show stroke?
        </label>
      </div>;
    }

    if (this.props.lesson) {
      if (this.isFinished()) {
        return (
          <div>
            <div className="subheader">
              <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
                <div className="flex mr1">
                  <header className="flex items-baseline">
                    <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                      <h2>{this.props.lessonTitle}{lessonSubTitle}</h2>
                    </a>
                  </header>
                </div>
                <div className="mxn2">
                  <a href={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="link-button link-button-ghost table-cell mr1" role="button">Restart</a>
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
              disableUserSettings={this.props.disableUserSettings}
              handleLimitWordsChange={this.props.handleLimitWordsChange}
              handleRepetitionsChange={this.props.handleRepetitionsChange}
              hideOtherSettings={this.props.hideOtherSettings}
              lessonLength={this.props.lesson.presentedMaterial.length}
              settings={this.props.lesson.settings}
              timer={this.props.timer}
              toggleHideOtherSettings={this.props.toggleHideOtherSettings}
              totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
              totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
              totalWordCount={this.props.lesson.presentedMaterial.length}
              userSettings={this.props.userSettings}
            />
          </div>
        )
      } else {
        return (
          <div>
            <div className="subheader">
              <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
                <div className="flex mr1">
                  <header className="flex items-baseline">
                    <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                      <h2>{this.props.lessonTitle}{lessonSubTitle}</h2>
                    </a>
                  </header>
                </div>
                <div className="mxn2">
                  <a href={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="link-button link-button-ghost table-cell mr1" role="button">Restart</a>
                  <a href={this.props.path} onClick={this.props.handleStopLesson} className="link-button link-button-ghost table-cell" role="button">Stop</a>
                </div>
              </div>
            </div>
          <div>
            {firstVisit}
            <div className="mx-auto mw-1024">
              {customMessage}
            </div>
            <div className="lesson-wrapper mw-1024 p3">
              <UserSettings
                changeUserSetting={this.props.changeUserSetting}
                changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                chooseStudy={this.props.chooseStudy}
                disableUserSettings={this.props.disableUserSettings}
                handleLimitWordsChange={this.props.handleLimitWordsChange}
                handleRepetitionsChange={this.props.handleRepetitionsChange}
                hideOtherSettings={this.props.hideOtherSettings}
                toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                totalWordCount={this.props.totalWordCount}
                userSettings={this.props.userSettings}
              />
              <div className="lesson-canvas panel mw-568 p2">
                <div className="mx-auto mw100 text-center">
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
                  <div role="status" aria-live="assertive">
                    {strokeTip}
                  </div>
                </div>
              </div>
              <div className="scores panel p2">
                <Scores
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
          </div>
        </div>
        )
      }
    } else {
      return '<div><h2>That lesson is missing.</h2></div>';
    }
  }
}

export default Lesson;
