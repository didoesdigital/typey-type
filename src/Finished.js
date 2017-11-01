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
          <UserSettings userSettings={this.props.userSettings} changeUserSetting={this.props.changeUserSetting} disableUserSettings={this.props.disableUserSettings} totalWordCount={this.props.totalWordCount} />
          <div className="lesson-canvas">
            <div className="mx-auto">
              <div role="alert" aria-live="polite">Finished!</div>
            </div>
          </div>
          <div className="scores">
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Finished;
