import React, { Component } from 'react';
import Scores from 'components/Scores';
import UserSettings from 'components/UserSettings';
import './App.css';

class Finished extends Component {
  render() {
    var customMessage;
    if (this.props.settings.customMessage) {
      customMessage = <h3 className="custom-message">{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = '';
    }
    return (
      <div>
        {customMessage}
        <div className="content">
          <UserSettings userSettings={this.props.userSettings} onChange={this.props.changeUserSettings} />
          <div className="lesson-canvas">
            <div role="alert" aria-live="polite">Finished!</div>
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
