import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import UserSettings from './UserSettings';
import './App.css';

class Typing extends Component {
  render() {
    let customMessage;
    let strokeTip;

    if (this.props.settings.customMessage) {
      customMessage = <h3 className="custom-message">{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = <span style={{paddingTop: '24px' }}>&nbsp;</span>
    }

    if (this.props.userSettings.showStrokes) {
      strokeTip = <div className="stroke-tip"><span className="visually-hidden">Hint: </span><pre><span className="steno-stroke">{this.props.currentStroke}</span></pre></div>;
    } else {
      strokeTip = <div className="stroke-tip"><span aria-hidden="true">&#8203;</span></div>;
    }

    return (
      <div>
        {customMessage}
        <div className="content">
          <UserSettings userSettings={this.props.userSettings} changeUserSetting={this.props.changeUserSetting} disableUserSettings={this.props.disableUserSettings} totalWordCount={this.props.totalWordCount} />
          <div className="lesson-canvas">
            <div className="mx-auto text-center">
              <Material currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} userSettings={this.props.userSettings} settings={this.props.settings} currentStroke={this.props.currentStroke} />
              <TypedText currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} userSettings={this.props.userSettings} settings={this.props.settings} actualText={this.props.actualText} updateMarkup={this.props.updateMarkup.bind(this)} />
              {strokeTip}
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

export default Typing;
