import React, { Component } from 'react';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
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

    let hideStrokesOnLastRepetitionTooltip = "Hide briefs during the last repetition";
    if (!this.props.userSettings.showStrokes) {
      hideStrokesOnLastRepetitionTooltip = "This does nothing while “Show briefs” is turned off";
    }

    return (
      <div className="user-settings panel p2">
        <form>
          <h5 className="mb1 visually-hidden">Settings</h5>
          <div className="text-small">
            <div className="flex mw-1024 mx-auto justify-center">
              <fieldset className="dc">
                <legend className="flex">Choose study type:</legend>
                <div className="flex">
                  <div className="radio-group ml3">
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
                  <div className="radio-group ml3">
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
                  <div className="radio-group ml3">
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
                  <div className="radio-group ml3">
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
              </fieldset>
            </div>

            <h6 className={toggleClasses} onClick={this.props.toggleHideOtherSettings} onKeyPress={this.props.toggleHideOtherSettings} role="button" tabIndex="0" aria-expanded={!this.props.hideOtherSettings} aria-controls="collapsible-settings">Your settings{this.props.hideOtherSettings}</h6>
            <div id="collapsible-settings" className={this.props.hideOtherSettings ? 'hide' : ''} aria-hidden={this.props.hideOtherSettings}>

              <div className="checkbox-group mt2">
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
                  <Tooltip
                    title="Capital letters in material won’t match typed lowercase letters"
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    Case sensitive
                  </Tooltip>
                </label>
              </div>
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
                  <Tooltip
                    title={!this.props.userSettings.hideStrokesOnLastRepetition ? "Show stroke briefs for every word" : "Show briefs for each word except during the last repetition" }
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    Show briefs
                  </Tooltip>
                </label>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="hideStrokesOnLastRepetition"
                    id="hideStrokesOnLastRepetition"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.hideStrokesOnLastRepetition}
                    onChange={this.props.changeUserSetting}
                    />
                  <Tooltip
                    title={hideStrokesOnLastRepetitionTooltip}
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    Hide briefs on last repetition
                  </Tooltip>
                </label>
              </div>

              <fieldset>
                <legend className="mb1">Show briefs as:</legend>
                <div className="mb2">
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name="showStrokesAs"
                        id="strokesAsDiagrams"
                        value="showStrokesAsDiagrams"
                        checked={this.props.userSettings.showStrokesAsDiagrams}
                        onChange={this.props.changeShowStrokesAs}
                        />
                      Diagrams
                    </label>
                  </div>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name="showStrokesAs"
                        id="strokesAsText"
                        value="strokesAsText"
                        checked={!this.props.userSettings.showStrokesAsDiagrams}
                        onChange={this.props.changeShowStrokesAs}
                        />
                      Text
                    </label>
                  </div>
                </div>
              </fieldset>

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
                  <Tooltip
                    title="Show new words you haven’t yet typed correctly"
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    New words
                  </Tooltip>
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
                  <Tooltip
                    title="Show words you seen before"
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    Seen words
                  </Tooltip>
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
                  <Tooltip
                    title="Show memorised words you’ve typed 30 times or more"
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    Memorised words
                  </Tooltip>
                </label>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="blurMaterial"
                    id="blurMaterial"
                    disabled={this.props.disableUserSettings}
                    checked={this.props.userSettings.blurMaterial}
                    onChange={this.props.changeUserSetting}
                  />
                  <Tooltip
                    title="Blur words and use a screen reader to practice transcription"
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    Blur words
                  </Tooltip>
                </label>
              </div>

              <fieldset>
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
              </fieldset>

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
