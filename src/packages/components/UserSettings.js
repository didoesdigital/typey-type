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
                checked={this.props.checked}
                onChange={this.props.onChange}
                />
              Show strokes
            </label>
          </div>
        </form>
      </div>
    )
  }
}

export default UserSettings;
