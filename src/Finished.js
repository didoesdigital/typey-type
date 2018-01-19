import React, { Component } from 'react';
import Scores from './Scores';
import UserSettings from './UserSettings';
import './App.css';

class Finished extends Component {

  isEmpty() {
    return (this.props.lessonLength === 0);
  }

  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(totalNumberOfMatchedWords/(timer/60/1000));
    } else {
      wordsPerMinute = 0;
    }
    return wordsPerMinute;
  }

  render() {
    let customMessage;
    let accuracy = '';
    if (this.props.totalNumberOfMistypedWords === 0 && this.props.totalNumberOfHintedWords === 0) {
      accuracy = ' Perfect accuracy!';
    }
    let emptyAndZeroStateMessage = (
      <div>
        <h2>Finished!</h2>
        <h3 className="mt0">{this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)}WPM!{accuracy}</h3>
        <p>
          <a href={this.props.path} onClick={this.props.restartLesson} className="" role="button">
            Restart lesson</a>
        </p>
      </div>
    );
    if (this.isEmpty()) {
      emptyAndZeroStateMessage = "There are no words to write.";
    }
    if (this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }
    return (
      <main id="main">
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
          <div className="lesson-canvas panel p2">
            <div className="mx-auto text-center">
              <div role="alert" aria-live="polite">{emptyAndZeroStateMessage}</div>
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
      </main>
    )
  }

}

export default Finished;
