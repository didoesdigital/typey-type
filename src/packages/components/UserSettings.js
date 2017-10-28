import React, { Component } from 'react';

class UserSettings extends Component {
  render() {
    return (
      <div className="user-settings">
        <form>
          <legend>Settings</legend>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="showStrokes"
                id="showStrokes"
                checked={this.props.userSettings.showStrokes}
                onChange={this.props.changeUserSetting}
                />
              Show strokes
            </label>
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="randomise"
                id="randomise"
                checked={this.props.userSettings.randomise}
                onChange={this.props.changeUserSetting}
                />
              Randomise lesson
            </label>
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="repeat"
                id="repeat"
                checked={this.props.userSettings.repeat}
                onChange={this.props.changeUserSetting}
                />
              Repeat lesson
            </label>
          </div>
          <label>
            Number of repetitions:
            <input
              name="repetitions"
              type="number"
              min="1"
              max="30"
              value={this.props.userSettings.repetitions}
              onChange={this.props.changeUserSetting} />
          </label>
        </form>
      </div>
    )
  }
}

export default UserSettings;
