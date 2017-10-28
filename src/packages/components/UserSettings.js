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
                name="caseInsensitive"
                id="caseInsensitive"
                checked={this.props.userSettings.caseInsensitive}
                onChange={this.props.changeUserSetting}
                />
              Case insensitive
            </label>
          </div>
          <label>
            Number of repetitions
            <input
              className="form-control"
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
