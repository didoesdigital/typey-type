import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

class UserSettings extends Component {
  render() {
    return (
      <div className="user-settings">
        <form>
          <legend className="mb1">Settings</legend>
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
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="caseInsensitive"
                id="caseInsensitive"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.caseInsensitive}
                onChange={this.props.changeUserSetting}
                />
              Case insensitive
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
              New Words
            </label>
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="unfamiliarWords"
                id="unfamiliarWords"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.unfamiliarWords}
                onChange={this.props.changeUserSetting}
                />
              &lt; 30 exposures
            </label>
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="familiarWords"
                id="familiarWords"
                disabled={this.props.disableUserSettings}
                checked={this.props.userSettings.familiarWords}
                onChange={this.props.changeUserSetting}
                />
              Familiar words
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
            style={false}
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
            style={false}
            type="number"
            value={this.props.userSettings.repetitions}
            snap
          />
        </form>
        <p><strong>Total word count:</strong> {this.props.totalWordCount}</p>
      </div>
    )
  }
}
          // <label>
          //   Number of repetitions
          //   <input
          //     className="form-control"
          //     name="repetitions"
          //     type="number"
          //     min="1"
          //     max="30"
          //     disabled={this.props.disableUserSettings}
          //     value={this.props.userSettings.repetitions}
          //     onChange={this.props.changeUserSetting} />
          // </label>

export default UserSettings;
