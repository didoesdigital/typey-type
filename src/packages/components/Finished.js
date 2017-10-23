import React, { Component } from 'react';
import Scores from 'components/Scores';
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
          <div className="user-settings">
            <form>
              <legend>Settings</legend>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    disabled
                    className="checkbox-input"
                    type="checkbox"
                    name="showStrokes"
                    id="showStrokes"
                    checked={this.props.userSettings.showStrokes}
                    onChange={this.props.changeUserSettings}
                    />
                  Show strokes
                </label>
              </div>
            </form>
          </div>
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
