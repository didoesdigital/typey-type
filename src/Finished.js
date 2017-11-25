import React, { Component } from 'react';
import Scores from './Scores';
import UserSettings from './UserSettings';
import './App.css';

class Finished extends Component {
  render() {
    var customMessage;
    if (this.props.settings.customMessage) {
      customMessage = <h3 className="custom-message">{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = <span style={{paddingTop: '24px' }}>&nbsp;</span>
    }
    return (
      <div>
        {customMessage}
        <div className="content">
          <UserSettings
            changeUserSetting={this.props.changeUserSetting}
            changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
            changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
            disableUserSettings={this.props.disableUserSettings}
            handleLimitWordsChange={this.props.handleLimitWordsChange}
            handleRepetitionsChange={this.props.handleRepetitionsChange}
            totalWordCount={this.props.totalWordCount}
            userSettings={this.props.userSettings}
          />
          <div className="lesson-canvas">
            <div className="mx-auto text-center">
              <div role="alert" aria-live="polite">Finished!</div>
            </div>
          </div>
          <div className="scores">
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
    )
  }

}

export default Finished;
