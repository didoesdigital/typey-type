import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

class UserSettings extends Component {
  render() {
    var grabStyle = function() {return false};
    let toggleClasses;
    if (this.props.hideOtherSettings) {
      toggleClasses = "mt1 mb1 de-emphasized text-uppercase subsection-header subsection-header-toggle collapsed";
    } else {
      toggleClasses = "mt1 mb1 de-emphasized text-uppercase subsection-header subsection-header-toggle";
    }

    return (
      <div className="user-settings">
        <form>
          <legend className="mb1">Settings</legend>
          <div className="text-small">
            <div className="mb2">
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="discover"
                    value="discover"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.study==="discover"}
                    onChange={this.props.chooseStudy}
                    />
                  Discover
                </label>
              </div>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="revise"
                    value="revise"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.study==="revise"}
                    onChange={this.props.chooseStudy}
                    />
                  Revise
                </label>
              </div>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="drill"
                    value="drill"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.study==="drill"}
                    onChange={this.props.chooseStudy}
                    />
                  Drill
                </label>
              </div>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="practice"
                    value="practice"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.study==="practice"}
                    onChange={this.props.chooseStudy}
                    />
                  Practice
                </label>
              </div>
            </div>

            <h6 className={toggleClasses} onClick={this.props.toggleHideOtherSettings} role="button" aria-expanded={!this.props.hideOtherSettings} aria-controls="collapsible-settings">Other settings{this.props.hideOtherSettings}</h6>
            <div id="collapsible-settings" className={this.props.hideOtherSettings ? 'hide' : ''} aria-hidden={this.props.hideOtherSettings}>

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

              <div className="radio-button-group clearfix mb1 mt2">
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
          </div>
        </form>
        <p className="mt1"><small>Total words: {this.props.totalWordCount}</small></p>
      </div>
    )
  }
}

export default UserSettings;
