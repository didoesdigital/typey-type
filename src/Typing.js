import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import './App.css';

class Typing extends Component {
  render() {
    return (
      <div className="app">
        <div className="main">
          <div>
            <fieldset>
              <legend>Settings</legend>
              <div className="checkbox">
                <label htmlFor="checkbox-1-id">Show strokes</label>
                <input
                  type="checkbox"
                  name="showStrokes"
                  id="showStrokes"
                  checked={this.props.userSettings.showStrokes}
                  onChange={this.props.changeUserSettings}
                  />
              </div>
            </fieldset>
          </div>
          <div className="">
            <Material currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} userSettings={this.props.userSettings} settings={this.props.settings} currentStroke={this.props.currentStroke} />
            <TypedText currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} settings={this.props.settings} />
            <p className="input-text">
              <textarea className="input-textarea" rows="1"
                onChange={this.props.updateMarkup}
                value={this.props.actualText}
                >
              </textarea>
            </p>
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Typing;
