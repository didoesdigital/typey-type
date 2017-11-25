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
                &lt;30 exposures
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

            <div className="radio-button-group clearfix">
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

            <div className="radio-button-group clearfix">
              <legend className="mb1">Sort</legend>

              <input
                className="radio-button"
                type="radio"
                name="sortOrder"
                id="sortOff"
                value="sortOff"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.sortOrder==="sortOff"}
                onChange={this.props.changeSortOrderUserSetting}
                />
              <label htmlFor="sortOff" aria-hidden="true" title="Normal lesson order">Off</label>
              <label htmlFor="sortOff" className="visually-hidden" aria-label="Normal lesson order"></label>

              <input
                className="radio-button"
                type="radio"
                name="sortOrder"
                id="sortRandom"
                value="sortRandom"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.sortOrder==="sortRandom"}
                onChange={this.props.changeSortOrderUserSetting}
                />
              <label htmlFor="sortRandom" aria-hidden="true" title="Mixed, random order">Mix</label>
              <label htmlFor="sortRandom" className="visually-hidden" aria-label="Mixed, random order"></label>

              <input
                className="radio-button"
                type="radio"
                name="sortOrder"
                id="sortNew"
                value="sortNew"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.sortOrder==="sortNew"}
                onChange={this.props.changeSortOrderUserSetting}
                />
              <label htmlFor="sortNew" aria-hidden="true" title="Newest words first">New</label>
              <label htmlFor="sortNew" className="visually-hidden" aria-label="Newest words first"></label>

              <label htmlFor="sortOld" className="visually-hidden" aria-label="Oldest words first"></label>
              {/*
                This label is in a different location to other hidden screen reader labels so that
                input+label works for styled buttons and :first-of-type/:last-of-type work for rounded
                button group corners.
                */}
              <input
                className="radio-button"
                type="radio"
                name="sortOrder"
                id="sortOld"
                value="sortOld"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.sortOrder==="sortOld"}
                onChange={this.props.changeSortOrderUserSetting}
                />
              <label htmlFor="sortOld" aria-hidden="true" title="Oldest words first">Old</label>
            </div>

            <label htmlFor="limitNumberOfWords">Limit word count</label>
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
            <label htmlFor="repetitions">Repetitions</label>
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
        </form>
        <p className="mt2"><small>Total word count: {this.props.totalWordCount}</small></p>
      </div>
    )
  }
}

export default UserSettings;
