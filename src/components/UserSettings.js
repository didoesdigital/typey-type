import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Tooltip } from 'react-tippy';
import NumericInput from 'react-numeric-input';
import SettingListItem from './SettingListItem';

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

    let hideStrokesOnLastRepetitionTooltip = "Hide briefs during the last repetition";
    if (!this.props.userSettings.showStrokes) {
      hideStrokesOnLastRepetitionTooltip = "This does nothing while “Show briefs” is turned off";
    }

    let webSpeechAvailable = this.state.webSpeechSupportResults['hasSpeechSynthesis'] && this.state.webSpeechSupportResults['hasSpeechSynthesisUtterance'];

    return (
      <div className="user-settings">
        <form>
          <div className="text-small">
            <div id="collapsible-settings" className={this.props.hideOtherSettings ? 'mh-page bg-slat dark:bg-coolgrey-1100 bl b--brand-primary-tint--60 dark:border-coolgrey-800 min-width-320 hide' : 'mh-page bg-slat dark:bg-coolgrey-1100 bl b--brand-primary-tint--60 dark:border-coolgrey-800 min-width-320'} aria-hidden={this.props.hideOtherSettings}>
              <h3 className="mb1 visually-hidden">Settings</h3>

              <p className="mb0 pt2 pb1 pb1 pl2"><small>Total words: {this.props.totalWordCount}</small></p>
              <ul className="unstyled-list mb0 pb1">
                <SettingListItem sectionHierachy='major'>
                  <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
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
                      <label className="mr1" htmlFor="limitNumberOfWords">Limit word count</label>
                    </Tooltip>
                    <div>
                      <NumericInput
                        autoCapitalize="off"
                        autoComplete="on"
                        autoCorrect="on"
                        autoFocus={false}
                        className="form-control w-100"
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
                  </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">

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
                      <label className="mr1" htmlFor="startFromWord">Start from word</label>
                    </Tooltip>
                    <div>
                      <NumericInput
                        autoCapitalize="off"
                        autoComplete="on"
                        autoCorrect="on"
                        autoFocus={false}
                        className="form-control w-100"
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
                  </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">

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
                      <label className="mr1" htmlFor="repetitions">Repetitions</label>
                    </Tooltip>
                    <div>
                      <NumericInput
                        autoCapitalize="off"
                        autoComplete="on"
                        autoCorrect="on"
                        autoFocus={false}
                        className="form-control w-100"
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
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
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
                        <label className="mr1 db" htmlFor="sortOrder">Sort</label>
                      </Tooltip>
                      <select id="sortOrder" name="sortOrder" value={this.props.userSettings.sortOrder} onChange={this.props.changeSortOrderUserSetting} disabled={this.props.disableUserSettings} className="text-small form-control w-144">
                        <option value="sortOff">Lesson default</option>
                        <option value="sortRandom">Random</option>
                        <option value="sortNew">Newest words first</option>
                        <option value="sortOld">Oldest words first</option>
                        <option value="sortShortest">Shortest words first</option>
                        <option value="sortLongest">Longest words first</option>
                      </select>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='major'>
                    <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                      <Tooltip
                        title="Metronome beats per minute"
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
                        <label className="mr1" htmlFor="beatsPerMinute">Metronome BPM</label>
                      </Tooltip>
                      <div>
                        <NumericInput
                          autoCapitalize="off"
                          autoComplete="on"
                          autoCorrect="on"
                          autoFocus={false}
                          className="form-control w-100"
                          disabled={this.props.disableUserSettings}
                          id="beatsPerMinute"
                          min={10}
                          max={360}
                          name="beatsPerMinute"
                          onChange={this.props.handleBeatsPerMinute}
                          precision={0}
                          spellCheck="false"
                          step={10}
                          style={grabStyle()}
                          type="number"
                          value={this.props.userSettings.beatsPerMinute}
                          snap
                        />
                      </div>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='major'>
                    <div className="block relative p1">
                      <label className="checkbox-label mb1">
                        <input
                          className="checkbox-input mr1"
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
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="block relative p1">
                      <label className="checkbox-label mb1">
                        <input
                          className="checkbox-input mr1"
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

                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="block relative p1">
                      <label className="checkbox-label mb1">
                        <input
                          className="checkbox-input mr1"
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

                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="p1">
                      <div className="block relative">
                        <label className="radio-label mb0 pb1">
                          <input
                            className="radio-input mr1"
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
                      <div className="block relative">
                        <label className="radio-label mb0">
                          <input
                            className="radio-input mr1"
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
                    <div className="block relative pb1 px1">
                      <label className="checkbox-label mb0">
                        <input
                          className="checkbox-input mr1"
                          type="checkbox"
                          name="showStrokesAsList"
                          id="showStrokesAsList"
                          disabled={this.props.disableUserSettings}
                          checked={this.props.userSettings.showStrokesAsList}
                          onChange={this.props.changeShowStrokesAsList}
                        />
                        <Tooltip
                          title="Show a list of alternative briefs in a list"
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
                          Show other briefs in a list
                        </Tooltip>
                      </label>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='major'>

                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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

                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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

                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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

                </SettingListItem>
                <SettingListItem sectionHierachy='major'>
                    <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
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
                        <label className="mr1 db" htmlFor="spacePlacement">Match spaces</label>
                      </Tooltip>
                      <select id="spacePlacement" name="spacePlacement" value={this.props.userSettings.spacePlacement} onChange={this.props.changeSpacePlacementUserSetting} disabled={this.props.disableUserSettings} className="text-small form-control w-144">
                        <option value="spaceBeforeOutput">Space before output</option>
                        <option value="spaceAfterOutput">Space after output</option>
                        <option value="spaceExact">Exact spacing</option>
                        <option value="spaceOff">Ignore spaces</option>
                      </select>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
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
                        <label className="mr1 db" htmlFor="stenoLayout">Steno layout</label>
                      </Tooltip>
                      <select id="stenoLayout" name="stenoLayout" value={this.props.userSettings.stenoLayout} onChange={this.props.changeStenoLayout} disabled={this.props.disableUserSettings} className="text-small form-control w-144">
                        <optgroup label="English">
                          <option value="stenoLayoutAmericanSteno">Ward Stone Ireland (Plover, EcoSteno, SOFT/HRUF etc.)</option>
                          <option value="stenoLayoutNoNumberBarInnerThumbNumbers">Inner thumbers (TinyMod, Steko, etc.)</option>
                          <option value="stenoLayoutNoNumberBarOuterThumbNumbers">Outer thumbers (Uni, Georgi, etc.)</option>
                        </optgroup>
                        <optgroup label="Palantype">
                          <option value="stenoLayoutPalantype">Palantype</option>
                        </optgroup>
                        <optgroup label="Multilingual">
                          <option value="stenoLayoutBrazilianPortugueseSteno">Brazilian Portuguese steno</option>
                          <option value="stenoLayoutDanishSteno">Danish steno</option>
                          <option value="stenoLayoutItalianMichelaSteno">Italian Michela steno</option>
                          <option value="stenoLayoutJapaneseSteno">Japanese steno</option>
                          <option value="stenoLayoutKoreanModernCSteno">Korean Modern C steno</option>
                        </optgroup>
                      </select>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                      <label className="mr1" htmlFor="diagramSize">Diagram size</label>
                      <div>
                        <NumericInput
                          autoCapitalize="off"
                          autoComplete="on"
                          autoCorrect="on"
                          autoFocus={false}
                          className="form-control w-100"
                          disabled={this.props.disableUserSettings}
                          id="diagramSize"
                          min={1.0}
                          max={2.0}
                          name="diagramSize"
                          onChange={this.props.handleDiagramSize}
                          precision={1}
                          spellCheck="false"
                          step={0.1}
                          style={grabStyle()}
                          type="number"
                          value={this.props.userSettings.diagramSize}
                          snap
                        />
                      </div>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                    <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                      <Tooltip
                        title="Show lesson material words as a single, sliding line or multiple, wrapping lines"
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
                        <label className="mr1 db" htmlFor="upcomingWordsLayout">Upcoming words</label>
                      </Tooltip>
                      <select id="upcomingWordsLayout" name="upcomingWordsLayout" value={this.props.userSettings.upcomingWordsLayout} onChange={this.props.handleUpcomingWordsLayout} disabled={this.props.disableUserSettings} className="text-small form-control w-144">
                        <option value="singleLine">Single line</option>
                        <option value="multiline">Multiline</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='major'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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

                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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
                        <p>Typey Type’s setting to “speak words” will speak words aloud when you have the sound turned on. It’s great with story lessons and real sentences where the context can help you distinguish homophones.</p>
                        <p>This setting uses fancy browser technology called the “Web Speech API”.</p>
                        <p className={webSpeechAvailable ? "quote mt1 mb3 bg-slat dark:bg-coolgrey-900" : "quote mt1 mb3 bg-danger dark:text-coolgrey-900"}>Web Speech is {webSpeechAvailable ? " available" : " unavailable"} on your system.</p>
                        { webSpeechAvailable ?
                            <p>If you have working sound but hear no words, your system might be missing a language pack or “voice”.</p>
                            :
                            <p><span className="bg-warning">You may need to update your browser or check that your device has a speech engine and language pack.</span></p>
                        }
                        <p>For Windows, you can download a “language pack” from Microsoft.</p>
                        <p>For Linux systems, you may need to install a speech engine with voices, such as <code>speech-dispatcher</code> and <code>espeak-ng</code>.</p>
                        <p>Double-click the “Say word” button or type ⇧Enter (e.g. <code>{`"STP*R": "{#Shift_L(Return)}",`}</code>) from the text area to hear the word again and keep focus on the text area.</p>
                      </div>
                      <div className="text-right">
                        <button className="button" onClick={this.handleCloseModal}>OK</button>
                      </div>
                    </ReactModal>)
                  </div>

                </SettingListItem>
                <SettingListItem sectionHierachy='major'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
                        type="checkbox"
                        name="punctuationDescriptions"
                        id="punctuationDescriptions"
                        disabled={this.props.disableUserSettings}
                        checked={this.props.userSettings.punctuationDescriptions}
                        onChange={this.props.changeUserSetting}
                      />
                      <Tooltip
                        title='Show text descriptions for punctuation symbols'
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
                        Punctuation descriptions
                      </Tooltip>
                    </label>
                  </div>
                </SettingListItem>
                <SettingListItem sectionHierachy='minor'>
                  <div className="block relative p1">
                    <label className="checkbox-label mb1">
                      <input
                        className="checkbox-input mr1"
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
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        Text input accessibility
                      </Tooltip>
                    </label>
                  </div>
                </SettingListItem>
                </ul>
              </div>
            </div>
          </form>
      </div>
    )
  }
}

export default UserSettings;
