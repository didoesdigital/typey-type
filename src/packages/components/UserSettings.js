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
                onChange={this.props.changeShowStrokesSetting}
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
                onChange={this.props.changeRandomiseLessonSetting}
                />
              Randomise lesson
            </label>
          </div>
        </form>
      </div>
    )
  }
}

export default UserSettings;
