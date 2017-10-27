import React, { Component } from 'react';
import Material from 'components/Material';
import TypedText from 'components/TypedText';
import Scores from 'components/Scores';
import UserSettings from 'components/UserSettings';
import './App.css';

class Typing extends Component {
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
          <UserSettings checked={this.props.userSettings.showStrokes} onChange={this.props.changeUserSettings} />
          <div className="lesson-canvas">
            <Material currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} userSettings={this.props.userSettings} settings={this.props.settings} currentStroke={this.props.currentStroke} />
            <TypedText currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} settings={this.props.settings} />
            <p className="input-text">
              <textarea className="input-textarea" rows="1"
                onChange={this.props.updateMarkup}
                value={this.props.actualText}
                >
              </textarea>
            </p>
          </div>
          <div className="scores">
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Typing;
