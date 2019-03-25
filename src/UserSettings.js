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
      toggleClasses = "mt1 mb1 de-emphasized text-center subsection-header subsection-header-toggle collapsed";
    } else {
      toggleClasses = "mt1 mb1 de-emphasized text-center subsection-header subsection-header-toggle";
    }

    let hideStrokesOnLastRepetitionTooltip = "Hide briefs during the last repetition";
    if (!this.props.userSettings.showStrokes) {
      hideStrokesOnLastRepetitionTooltip = "This does nothing while “Show briefs” is turned off";
    }

    return (
      <div className="user-settings">
        <form>
          <h5 className="mb1 visually-hidden">Settings</h5>
          <div className="text-small">
            <div className="flex flex-wrap mw-1024 mx-auto justify-center mb2">
              <fieldset className="dc hide-sm">
                <Tooltip
                  title="Study types are recommended presets for settings you can change"
                  className="mw-240"
                  animation="shift"
                  arrow="true"
                  duration="200"
                  position="bottom"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital didoesdigital-sm"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <legend className="flex">Choose study type:</legend>
                </Tooltip>
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
                      <Tooltip
                        title="Discover 5–15 new words with their briefs shown, concentrating on accuracy"
                        className="mw-240"
                        animation="shift"
                        arrow="true"
                        duration="200"
                        position="bottom"
                        tabIndex="0"
                        tag="span"
                        theme="didoesdigital didoesdigital-sm"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        Discover
                      </Tooltip>
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
                      <Tooltip
                        title="Revise 50 briefs, recalling the briefs before revealing their strokes and avoiding fingerspelling"
                        className="mw-240"
                        animation="shift"
                        arrow="true"
                        duration="200"
                        position="bottom"
                        tabIndex="0"
                        tag="span"
                        theme="didoesdigital didoesdigital-sm"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        Revise
                      </Tooltip>
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
                      <Tooltip
                        title="Drill common words to build your muscle memory, writing as fast as you can"
                        className="mw-240"
                        animation="shift"
                        arrow="true"
                        duration="200"
                        position="bottom"
                        tabIndex="0"
                        tag="span"
                        theme="didoesdigital didoesdigital-sm"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        Drill
                      </Tooltip>
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
                      <Tooltip
                        title="Practice longer text in order, mimicking real usage as closely as possible"
                        className="mw-240"
                        animation="shift"
                        arrow="true"
                        duration="200"
                        position="bottom"
                        tabIndex="0"
                        tag="span"
                        theme="didoesdigital didoesdigital-sm"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        Practice
                      </Tooltip>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <h6 className={toggleClasses} onClick={this.props.toggleHideOtherSettings} onKeyPress={this.props.toggleHideOtherSettings} role="button" tabIndex="0" aria-expanded={!this.props.hideOtherSettings} aria-controls="collapsible-settings">Your settings{this.props.hideOtherSettings}</h6>
            <div id="collapsible-settings" className={this.props.hideOtherSettings ? 'hide' : ''} aria-hidden={this.props.hideOtherSettings}>

              <div className="flex flex-wrap justify-between">
                <div>
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
                        name="simpleTypography"
                        id="simpleTypography"
                        disabled={this.props.disableUserSettings}
                        checked={this.props.userSettings.simpleTypography}
                        onChange={this.props.changeUserSetting}
                      />
                      <Tooltip
                        title='Simple typography replaces “curly quotes” in lesson material with "straight quotes"'
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
                        Simple typography
                      </Tooltip>
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
                        title="Blur words and use a screen reader or speak setting to practice transcription"
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
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        className="checkbox-input"
                        type="checkbox"
                        name="speakMaterial"
                        id="speakMaterial"
                        disabled={this.props.disableUserSettings}
                        checked={this.props.userSettings.speakMaterial}
                        onChange={this.props.changeUserSetting}
                      />
                      <Tooltip
                        title="Speak words aloud when sound is turned on"
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
                        Speak words (with sound!)
                      </Tooltip>
                    </label>
                  </div>
                </div>

                <div className="mt2">
                  <fieldset>
                    <legend className="mb1">Show briefs:</legend>
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
                          Show briefs for every word
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
                          <Tooltip
                            title="Show briefs as diagrams for your steno layout"
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
                            Show briefs as diagrams
                          </Tooltip>
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
                          <Tooltip
                            title="Show briefs as text and read to screen readers"
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
                            Show briefs as text
                          </Tooltip>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div>
                    <div className="clearfix mb2 mt2">
                      <Tooltip
                        title="Set match spaces to suit your steno settings"
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
                        <label className="mb1 db">Match spaces</label>
                      </Tooltip>
                      <select name="spacePlacement" value={this.props.userSettings.spacePlacement} onChange={this.props.changeSpacePlacementUserSetting} disabled={this.props.disableUserSettings} className="text-small form-control w6">
                        <option value="spaceBeforeOutput">Space before output</option>
                        <option value="spaceAfterOutput">Space after output</option>
                        <option value="spaceExact">Exact spacing</option>
                        <option value="spaceOff">Ignore spaces</option>
                      </select>
                    </div>

                    <div className="mb2">
                      <Tooltip
                        title="Show steno diagrams that suit your steno layout"
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
                        <label className="mb1 db">Steno layout</label>
                      </Tooltip>
                      <select name="stenoLayout" value={this.props.userSettings.stenoLayout} onChange={this.props.changeStenoLayout} disabled={this.props.disableUserSettings} className="text-small form-control w6">
                        <option value="stenoLayoutAmericanSteno">American steno (Ward Stone Ireland)</option>
                        <option value="stenoLayoutPalantype">Palantype</option>
                        <option value="stenoLayoutDanishSteno">Danish steno</option>
                        <option value="stenoLayoutItalianMichelaSteno">Italian Michela steno</option>
                        <option value="stenoLayoutJapaneseSteno">Japanese steno</option>
                        <option value="stenoLayoutKoreanModernCSteno">Korean Modern C steno</option>
                      </select>
                    </div>

                    <div className="mb1">
                      <Tooltip
                        title="Sort the lesson (newest words need the most practice)"
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
                        <label className="mb1 db">Sort</label>
                      </Tooltip>
                      <select name="sortOrder" value={this.props.userSettings.sortOrder} onChange={this.props.changeSortOrderUserSetting} disabled={this.props.disableUserSettings} className="text-small form-control w6">
                        <option value="sortOff">Lesson default</option>
                        <option value="sortRandom">Random</option>
                        <option value="sortNew">Newest words first</option>
                        <option value="sortOld">Oldest words first</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt2">
                    <Tooltip
                      title="Limit the number of words shown (0 for unlimited)"
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
                      <label htmlFor="limitNumberOfWords">Limit word count</label>
                    </Tooltip>
                    <div className="mb2">
                      <NumericInput
                        autoCapitalize="off"
                        autoComplete="on"
                        autoCorrect="on"
                        autoFocus={false}
                        className="form-control w6"
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

                    <Tooltip
                      title="Start from this place in the lesson"
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
                      <label htmlFor="startFromWord">Start from word</label>
                    </Tooltip>
                    <div className="mb2">
                      <NumericInput
                        autoCapitalize="off"
                        autoComplete="on"
                        autoCorrect="on"
                        autoFocus={false}
                        className="form-control w6"
                        disabled={this.props.disableUserSettings || this.props.revisionMode}
                        id="startFromWord"
                        max={this.props.maxStartFromWord || 30000}
                        min={1}
                        name="startFromWord"
                        onChange={this.props.handleStartFromWordChange}
                        precision={0}
                        spellCheck="false"
                        step={1}
                        style={grabStyle()}
                        type="number"
                        value={this.props.userSettings.startFromWord}
                        snap
                      />
                    </div>

                    <Tooltip
                      title="Repeat the lesson up to 30 times"
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
                      <label htmlFor="repetitions">Repetitions</label>
                    </Tooltip>
                    <div className="mb1">
                      <NumericInput
                        autoCapitalize="off"
                        autoComplete="on"
                        autoCorrect="on"
                        autoFocus={false}
                        className="form-control w6"
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
              </div>
            </div>
          </form>
        <p className="mt1 text-right"><small>Total words: {this.props.totalWordCount}</small></p>
      </div>
    )
  }
}

export default UserSettings;
