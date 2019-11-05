import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router-dom';
import NumericInput from 'react-numeric-input';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webSpeechSupportResults: {
        hasSpeechSynthesis: false,
        hasSpeechSynthesisUtterance: false,
        numberOfSpeechSynthesisVoices: 0
      },
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('#js-app');
  }

  handleOpenModal (event) {
    event.preventDefault();
    let webSpeechSupportResults = this.checkWebSpeechSupport();
    this.setState({
      webSpeechSupportResults,
      showModal: true
    });
  }

  checkWebSpeechSupport() {
    let hasSpeechSynthesis = false;
    let hasSpeechSynthesisUtterance = false;

    if (window.speechSynthesis) {
      hasSpeechSynthesis = true;
    }
    if (window.SpeechSynthesisUtterance) {
      hasSpeechSynthesisUtterance = true;
    }

    let webSpeechSupportResults = {
      hasSpeechSynthesis: hasSpeechSynthesis,
      hasSpeechSynthesisUtterance: hasSpeechSynthesisUtterance,
    };

    return webSpeechSupportResults;
  }

  handleCloseModal (event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  render() {
    var grabStyle = function() {return false};
    let toggleClasses;
    if (this.props.hideOtherSettings) {
      toggleClasses = "h6 mt1 mb1 de-emphasized text-center subsection-header subsection-header-toggle collapsed";
    } else {
      toggleClasses = "h6 mt1 mb1 de-emphasized text-center subsection-header subsection-header-toggle";
    }

    let hideStrokesOnLastRepetitionTooltip = "Hide briefs during the last repetition";
    if (!this.props.userSettings.showStrokes) {
      hideStrokesOnLastRepetitionTooltip = "This does nothing while “Show briefs” is turned off";
    }

    let webSpeechAvailable = this.state.webSpeechSupportResults['hasSpeechSynthesis'] && this.state.webSpeechSupportResults['hasSpeechSynthesisUtterance'];

    return (
      <div className="user-settings">
        <form>
          <h3 className="mb1 visually-hidden">Settings</h3>
          <div className="text-small">
            <div className="flex flex-wrap mw-1024 mx-auto justify-between mb2">
              <div className="flex flex-wrap">
                <fieldset className="dc hide-sm">
                  <Tooltip
                    title="Study types are recommended presets for settings you can change"
                    className="mw-240"
                    animation="shift"
                    arrow="true"
                    duration="200"
                    position="bottom"
                    tabIndex="0"
                    tag="p"
                    theme="didoesdigital didoesdigital-sm"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <legend className="flex mr3">Choose study type:</legend>
                  </Tooltip>
                  <div className="flex mb1">
                    <div className="flex flex-wrap justify-between">
                      <p className="radio-group mr3">
                        <label className="radio-label">
                          <input
                            className="radio-input mt05"
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
                      </p>
                      <p className="radio-group mr3">
                        <label className="radio-label">
                          <input
                            className="radio-input mt05"
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
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <p className="radio-group mr3">
                        <label className="radio-label">
                          <input
                            className="radio-input mt05"
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
                      </p>
                      <p className="radio-group mr3">
                        <label className="radio-label">
                          <input
                            className="radio-input mt05"
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
                      </p>
                    </div>
                  </div>
                </fieldset>
              </div>
              { !this.props.path.includes("custom") && !this.props.path.includes("progress") ?
                  <p className="mb0">Study <Link to={this.props.path.replace("lesson.txt","flashcards").replace("/typey-type","")} className="mb0">Flashcards</Link></p>
                :
                null
              }
            </div>

            <p className={toggleClasses} onClick={this.props.toggleHideOtherSettings} onKeyPress={this.props.toggleHideOtherSettings} role="button" tabIndex="0" aria-expanded={!this.props.hideOtherSettings} aria-controls="collapsible-settings">Your settings{this.props.hideOtherSettings}</p>
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
                        title="Show words you have seen before"
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
                      Speak words with sound
                    </label>
                    {" "}(<button className="de-emphasized-button text-small" onClick={this.handleOpenModal} aria-label="Help with speak words setting" disabled={this.props.disableUserSettings}>help</button>
                    <ReactModal
                      isOpen={this.state.showModal}
                      aria={{
                        labelledby: "aria-modal-heading",
                        describedby: "aria-modal-description"
                      }}
                      ariaHideApp={true}
                      closeTimeoutMS={300}
                      role="dialog"
                      onRequestClose={this.handleCloseModal}
                      className={{
                        "base": "modal",
                        "afterOpen": "modal--after-open",
                        "beforeClose": "modal--before-close"
                      }}
                      overlayClassName={{
                        "base": "modal__overlay",
                        "afterOpen": "modal__overlay--after-open",
                        "beforeClose": "modal__overlay--before-close"
                      }}
                    >
                      <div className="fr">
                        <button className="de-emphasized-button hide-md" onClick={this.handleCloseModal}>Close</button>
                      </div>
                      <h3 id="aria-modal-heading">Speak words setting</h3>
                      <div id="aria-modal-description">
                        <p>Typey Type’s setting to “speak words” will speak words aloud when you have the sound turned on.</p>
                        <p>This setting uses fancy browser technology called the “Web Speech API”.</p>
                        <p className={webSpeechAvailable ? "quote mt1 mb3 bg-slat" : "quote mt1 mb3 bg-danger"}>Web Speech is {webSpeechAvailable ? " available" : " unavailable"} on your system.</p>
                        { webSpeechAvailable ?
                            <p>If you cannot hear anything and otherwise have working sound, your system might be missing a language pack or “voice”.</p>
                            :
                            <p><span className="bg-warning">You may need to update your browser or check that your device has a speech engine and language pack.</span></p>
                        }
                        <p>For Windows, you can download a “language pack” from Microsoft.</p>
                        <p>For Linux systems, you may need to install a speech engine with voices, such as <code>speech-dispatcher</code> and <code>espeak-ng</code>.</p>
                      </div>
                      <div className="text-right">
                        <button className="button" onClick={this.handleCloseModal}>OK</button>
                      </div>
                    </ReactModal>)
                  </div>
                  <div className="checkbox-group">
                    <label className="checkbox-label text-input-accessibility-setting">
                      <input
                        className="checkbox-input text-input-accessibility-setting"
                        type="checkbox"
                        name="textInputAccessibility"
                        id="textInputAccessibility"
                        disabled={this.props.disableUserSettings}
                        checked={this.props.userSettings.textInputAccessibility}
                        onChange={this.props.changeUserSetting}
                      />
                      <Tooltip
                        title="When unchecked, this hides the text input field from screen readers to mute echoes from typed words but might make it impossible to access for some devices"
                        className="mw-240"
                        animation="shift"
                        arrow="true"
                        duration="200"
                        tabIndex="0"
                        tag="span"
                        theme="didoesdigital didoesdigital-sm"
                        trigger="focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        Text input accessibility
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
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          className="checkbox-input"
                          type="checkbox"
                          name="showStrokesOnMisstroke"
                          id="showStrokesOnMisstroke"
                          disabled={this.props.disableUserSettings}
                          checked={this.props.userSettings.showStrokesOnMisstroke}
                          onChange={this.props.changeShowStrokesOnMisstroke}
                        />
                        <Tooltip
                          title="Show briefs for words when you misstroke them"
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
                          Show briefs on misstroke
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
                        <label className="mb1 db" htmlFor="spacePlacement">Match spaces</label>
                      </Tooltip>
                      <select id="spacePlacement" name="spacePlacement" value={this.props.userSettings.spacePlacement} onChange={this.props.changeSpacePlacementUserSetting} disabled={this.props.disableUserSettings} className="text-small form-control w6">
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
                        <label className="mb1 db" htmlFor="stenoLayout">Steno layout</label>
                      </Tooltip>
                      <select id="stenoLayout" name="stenoLayout" value={this.props.userSettings.stenoLayout} onChange={this.props.changeStenoLayout} disabled={this.props.disableUserSettings} className="text-small form-control w6">
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
                        <label className="mb1 db" htmlFor="sortOrder">Sort</label>
                      </Tooltip>
                      <select id="sortOrder" name="sortOrder" value={this.props.userSettings.sortOrder} onChange={this.props.changeSortOrderUserSetting} disabled={this.props.disableUserSettings} className="text-small form-control w6">
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
