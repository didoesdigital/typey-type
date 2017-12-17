import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

class UserSettings extends Component {
  render() {
    var grabStyle = function() {return false};
    return (
      <div className="user-settings">
        <form>
          <legend className="mb1">Settings</legend>
          <div className="text-small">
            <div className="mb2">
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
                    name="caseSensitive"
                    id="caseSensitive"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.caseSensitive}
                    onChange={this.props.changeUserSetting}
                    />
                  Case sensitive
                </label>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="newWords"
                    id="newWords"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.newWords}
                    onChange={this.props.changeUserSetting}
                    />
                  New words
                </label>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="seenWords"
                    id="seenWords"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.seenWords}
                    onChange={this.props.changeUserSetting}
                    />
                  Seen words
                </label>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="retainedWords"
                    id="retainedWords"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.retainedWords}
                    onChange={this.props.changeUserSetting}
                    />
                  Retained words
                </label>
              </div>
            </div>

            <div className="radio-button-group clearfix mb1">
              <legend className="mb1">Match spaces</legend>

              <input
                className="radio-button"
                type="radio"
                name="spacePlacement"
                id="spaceBeforeOutput"
                value="spaceBeforeOutput"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.spacePlacement==="spaceBeforeOutput"}
                onChange={this.props.changeSpacePlacementUserSetting}
                />
              <label htmlFor="spaceBeforeOutput" aria-hidden="true">" x"</label>
              <label htmlFor="spaceBeforeOutput" className="visually-hidden" aria-label="Space Before Output"></label>

              <input
                className="radio-button"
                type="radio"
                name="spacePlacement"
                id="spaceAfterOutput"
                value="spaceAfterOutput"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.spacePlacement==="spaceAfterOutput"}
                onChange={this.props.changeSpacePlacementUserSetting}
                />
              <label htmlFor="spaceAfterOutput" aria-hidden="true">"x "</label>
              <label htmlFor="spaceAfterOutput" className="visually-hidden" aria-label="Space After Output"></label>

              <label htmlFor="spaceOff" className="visually-hidden" aria-label="Ignore spaces"></label>
              {/*
                This label is in a different location to other hidden screen reader labels so that
                input+label works for styled buttons and :first-of-type/:last-of-type work for rounded
                button group corners.
                */}
              <input
                className="radio-button"
                type="radio"
                name="spacePlacement"
                id="spaceOff"
                value="spaceOff"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.spacePlacement==="spaceOff"}
                onChange={this.props.changeSpacePlacementUserSetting}
                />
              <label htmlFor="spaceOff" aria-hidden="true">Off</label>
            </div>

            <div className="clearfix mb2">
              <label className="mb1">Sort</label>
              <select name="sortOrder" value={this.props.userSettings.sortOrder} onChange={this.props.changeSortOrderUserSetting} disabled={this.props.disableUserSettings} className="text-small">
                <option value="sortOff">Lesson default</option>
                <option value="sortRandom">Random</option>
                <option value="sortNew">Newest words first</option>
                <option value="sortOld">Oldest words first</option>
              </select>
            </div>

            <label htmlFor="limitNumberOfWords">Limit word count</label>
            <div className="mb2">
              <NumericInput
                autoCapitalize="off"
                autoComplete="on"
                autoCorrect="on"
                autoFocus={false}
                className="form-control"
                disabled={this.props.disableUserSettings}
                id="limitNumberOfWords"
                min={0}
                name="limitNumberOfWords"
                onChange={this.props.handleLimitWordsChange}
                precision={0}
                spellCheck="false"
                step={1}
                style={grabStyle()}
                type="number"
                value={this.props.userSettings.limitNumberOfWords}
                snap
              />
            </div>

            <label htmlFor="repetitions">Repetitions</label>
            <div className="mb1">
              <NumericInput
                autoCapitalize="off"
                autoComplete="on"
                autoCorrect="on"
                autoFocus={false}
                className="form-control"
                disabled={this.props.disableUserSettings}
                id="repetitions"
                max={30}
                min={1}
                name="repetitions"
                onChange={this.props.handleRepetitionsChange}
                precision={0}
                spellCheck="false"
                step={1}
                style={grabStyle()}
                type="number"
                value={this.props.userSettings.repetitions}
                snap
              />
            </div>
          </div>
        </form>
        <p className="mt2"><small>Total words: {this.props.totalWordCount}</small></p>
      </div>
    )
  }
}

export default UserSettings;
