import React, { Component } from 'react';
import Scores from './Scores';
import UserSettings from './UserSettings';
import './App.css';

class Finished extends Component {

  isEmpty() {
    return (this.props.lessonLength === 0);
  }

  render() {
    let customMessage;
    let emptyAndZeroStateMessage = "Finished!";
    if (this.isEmpty()) {
      emptyAndZeroStateMessage = "There are no words to write.";
    }
    if (this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }
    return (
      <main role="main" id="main">
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
