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
                disabled={this.props.disableUserSettings}
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
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.randomise}
                onChange={this.props.changeUserSetting}
                />
              Randomise lesson
            </label>
          </div>
          <label>
            Number of repetitions:
            <input
              name="repetitions"
              type="number"
              min="1"
              max="30"
              disabled={this.props.disableUserSettings}
              value={this.props.userSettings.repetitions}
              onChange={this.props.changeUserSetting} />
          </label>
        </form>
      </div>
    )
  }
}

export default UserSettings;
