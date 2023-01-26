import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Tooltip } from "react-tippy";
import NumericInput from "react-numeric-input";
import SettingCheckbox from "../../../components/SettingCheckbox";
import SettingListItem from "../../../components/SettingListItem";

import type { UserSettings as UserSettingsObjectType } from "../../../types";

const grabStyle = function () {
  return false;
};

type Props = {
  changeShowStrokesAs: () => void;
  changeShowStrokesAsList: () => void;
  changeShowStrokesOnMisstroke: () => void;
  changeSortOrderUserSetting: () => void;
  changeSpacePlacementUserSetting: () => void;
  changeStenoLayout: () => void;
  changeUserSetting: () => void;
  disableUserSettings: boolean;
  handleBeatsPerMinute: () => void;
  handleDiagramSize: () => void;
  handleLimitWordsChange: () => void;
  handleRepetitionsChange: () => void;
  handleStartFromWordChange: () => void;
  handleUpcomingWordsLayout: () => void;
  hideOtherSettings: boolean;
  maxStartFromWord: number;
  revisionMode: boolean;
  setAnnouncementMessage: () => void;
  totalWordCount: number;
  userSettings: UserSettingsObjectType;
};

const UserSettings = ({
  changeShowStrokesAs,
  changeShowStrokesAsList,
  changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting,
  changeSpacePlacementUserSetting,
  changeStenoLayout,
  changeUserSetting,
  disableUserSettings,
  handleBeatsPerMinute,
  handleDiagramSize,
  handleLimitWordsChange,
  handleRepetitionsChange,
  handleStartFromWordChange,
  handleUpcomingWordsLayout,
  hideOtherSettings,
  maxStartFromWord,
  revisionMode,
  setAnnouncementMessage,
  totalWordCount,
  userSettings,
}: Props) => {
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement("#js-app");
  }, []);

  function handleOpenModal(event: any) {
    event.preventDefault();
    setHasSpeechSupport("speechSynthesis" in window);
    setShowModal(true);
  }

  function handleCloseModal(event: any) {
    event.preventDefault();
    setShowModal(false);
  }

  const speakWordsHelpButtonAndModal = (
    <>
      {" "}
      (
      <button
        className="de-emphasized-button text-small"
        onClick={handleOpenModal}
        aria-label="Help with speak words setting"
        disabled={disableUserSettings}
      >
        help
      </button>
      <ReactModal
        isOpen={showModal}
        aria={{
          labelledby: "aria-modal-heading",
          describedby: "aria-modal-description",
        }}
        ariaHideApp={true}
        closeTimeoutMS={300}
        role="dialog"
        onRequestClose={handleCloseModal}
        className={{
          "base": "modal",
          "afterOpen": "modal--after-open",
          "beforeClose": "modal--before-close",
        }}
        overlayClassName={{
          "base": "modal__overlay",
          "afterOpen": "modal__overlay--after-open",
          "beforeClose": "modal__overlay--before-close",
        }}
      >
        <div className="fr">
          <button
            className="de-emphasized-button hide-md"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
        <h3 id="aria-modal-heading">Speak words setting</h3>
        <div id="aria-modal-description">
          <p>
            Typey Type’s setting to “speak words” will speak words aloud when
            you have the sound turned on. It’s great with story lessons and real
            sentences where the context can help you distinguish homophones.
          </p>
          <p>
            This setting uses fancy browser technology called the “Web Speech
            API”.
          </p>
          <p
            className={
              hasSpeechSupport
                ? "quote mt1 mb3 bg-slat dark:bg-coolgrey-900"
                : "quote mt1 mb3 bg-danger dark:text-coolgrey-900"
            }
          >
            Web Speech is {hasSpeechSupport ? " available" : " unavailable"} on
            your system.
          </p>
          {hasSpeechSupport ? (
            <p>
              If you have working sound but hear no words, your system might be
              missing a language pack or “voice”.
            </p>
          ) : (
            <p>
              <span className="bg-warning">
                You may need to update your browser or check that your device
                has a speech engine and language pack.
              </span>
            </p>
          )}
          <p>For Windows, you can download a “language pack” from Microsoft.</p>
          <p>
            For Linux systems, you may need to install a speech engine with
            voices, such as <code>speech-dispatcher</code> and{" "}
            <code>espeak-ng</code>.
          </p>
          <p>
            Double-click the “Say word” button or type ⇧Enter (e.g.{" "}
            <code>{`"STP*R": "{#Shift_L(Return)}",`}</code>) from the text area
            to hear the word again and keep focus on the text area.
          </p>
        </div>
        <div className="text-right">
          <button className="button" onClick={handleCloseModal}>
            OK
          </button>
        </div>
      </ReactModal>
      )
    </>
  );

  return (
    <div className="user-settings">
      <form>
        <div className="text-small">
          <div
            id="collapsible-settings"
            className={`mh-page bg-slat dark:bg-coolgrey-1100 bl b--brand-primary-tint--60 dark:border-coolgrey-800 min-width-320${
              hideOtherSettings ? " hide" : ""
            }`}
            aria-hidden={hideOtherSettings}
          >
            <h3 className="mb1 visually-hidden">Settings</h3>

            <p className="mb0 pt2 pb1 pb1 pl2">
              <small>Total words: {totalWordCount}</small>
            </p>
            <ul className="unstyled-list mb0 pb1">
              <SettingListItem sectionHierachy="major">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1" htmlFor="limitNumberOfWords">
                      Limit word count
                    </label>
                  </Tooltip>
                  <div>
                    <NumericInput
                      autoCapitalize="off"
                      autoComplete="on"
                      autoCorrect="on"
                      autoFocus={false}
                      className="form-control w-100"
                      disabled={disableUserSettings}
                      min={0}
                      name="limitNumberOfWords"
                      id="limitNumberOfWords"
                      onChange={handleLimitWordsChange}
                      precision={0}
                      spellCheck="false"
                      step={1}
                      style={grabStyle()}
                      type="number"
                      value={userSettings.limitNumberOfWords}
                      snap
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1" htmlFor="startFromWord">
                      Start from word
                    </label>
                  </Tooltip>
                  <div>
                    <NumericInput
                      autoCapitalize="off"
                      autoComplete="on"
                      autoCorrect="on"
                      autoFocus={false}
                      className="form-control w-100"
                      disabled={disableUserSettings || revisionMode}
                      max={maxStartFromWord || 30000}
                      min={1}
                      name="startFromWord"
                      id="startFromWord"
                      onChange={handleStartFromWordChange}
                      precision={0}
                      spellCheck="false"
                      step={1}
                      style={grabStyle()}
                      type="number"
                      value={userSettings.startFromWord}
                      snap
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1" htmlFor="repetitions">
                      Repetitions
                    </label>
                  </Tooltip>
                  <div>
                    <NumericInput
                      autoCapitalize="off"
                      autoComplete="on"
                      autoCorrect="on"
                      autoFocus={false}
                      className="form-control w-100"
                      disabled={disableUserSettings}
                      max={30}
                      min={1}
                      name="repetitions"
                      id="repetitions"
                      onChange={handleRepetitionsChange}
                      precision={0}
                      spellCheck="false"
                      step={1}
                      style={grabStyle()}
                      type="number"
                      value={userSettings.repetitions}
                      snap
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1 db" htmlFor="sortOrder">
                      Sort
                    </label>
                  </Tooltip>
                  <select
                    name="sortOrder"
                    id="sortOrder"
                    value={userSettings.sortOrder}
                    onChange={changeSortOrderUserSetting}
                    disabled={disableUserSettings}
                    className="text-small form-control w-144"
                  >
                    <option value="sortOff">Lesson default</option>
                    <option value="sortRandom">Random</option>
                    <option value="sortNew">Newest words first</option>
                    <option value="sortOld">Oldest words first</option>
                    <option value="sortShortest">Shortest words first</option>
                    <option value="sortLongest">Longest words first</option>
                  </select>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1" htmlFor="beatsPerMinute">
                      Metronome BPM
                    </label>
                  </Tooltip>
                  <div>
                    <NumericInput
                      autoCapitalize="off"
                      autoComplete="on"
                      autoCorrect="on"
                      autoFocus={false}
                      className="form-control w-100"
                      disabled={disableUserSettings}
                      min={10}
                      max={360}
                      name="beatsPerMinute"
                      id="beatsPerMinute"
                      onChange={handleBeatsPerMinute}
                      precision={0}
                      spellCheck="false"
                      step={10}
                      style={grabStyle()}
                      type="number"
                      value={userSettings.beatsPerMinute}
                      snap
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <SettingCheckbox
                  checked={userSettings.showStrokes}
                  disabled={disableUserSettings}
                  label={"Show briefs for every word"}
                  nameAndId={"showStrokes"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    !userSettings.hideStrokesOnLastRepetition
                      ? "Show stroke briefs for every word"
                      : "Show briefs for each word except during the last repetition"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.hideStrokesOnLastRepetition}
                  disabled={disableUserSettings}
                  label={"Hide briefs on last repetition"}
                  nameAndId={"hideStrokesOnLastRepetition"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    userSettings.showStrokes
                      ? "Hide briefs during the last repetition"
                      : "This does nothing while “Show briefs” is turned off"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.showStrokesOnMisstroke}
                  disabled={disableUserSettings}
                  label={"Show briefs on misstroke"}
                  nameAndId={"showStrokesOnMisstroke"}
                  onChange={changeShowStrokesOnMisstroke}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={"Show briefs for words when you misstroke them"}
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="p1">
                  <div className="block relative">
                    <label className="radio-label mb0 pb1">
                      <input
                        className="radio-input mr1"
                        type="radio"
                        name="showStrokesAs"
                        id="strokesAsDiagrams"
                        value="showStrokesAsDiagrams"
                        checked={userSettings.showStrokesAsDiagrams}
                        onChange={changeShowStrokesAs}
                      />
                      {/* @ts-ignore */}
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
                        onShow={setAnnouncementMessage}
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
                        checked={!userSettings.showStrokesAsDiagrams}
                        onChange={changeShowStrokesAs}
                      />
                      {/* @ts-ignore */}
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
                        onShow={setAnnouncementMessage}
                      >
                        Show briefs as text
                      </Tooltip>
                    </label>
                  </div>
                </div>
                <SettingCheckbox
                  wrapperClasses="block relative pb1 px1"
                  checked={userSettings.showStrokesAsList}
                  disabled={disableUserSettings}
                  label={"Show other briefs in a list"}
                  nameAndId={"showStrokesAsList"}
                  onChange={changeShowStrokesAsList}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={"Show a list of alternative briefs in a list"}
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="block relative p1">
                  <label className="checkbox-label mb1">
                    <input
                      className="checkbox-input mr1"
                      type="checkbox"
                      name="newWords"
                      id="newWords"
                      disabled={disableUserSettings}
                      checked={userSettings.newWords}
                      onChange={changeUserSetting}
                    />
                    {/* @ts-ignore */}
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
                      onShow={setAnnouncementMessage}
                    >
                      New words
                    </Tooltip>
                  </label>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="block relative p1">
                  <label className="checkbox-label mb1">
                    <input
                      className="checkbox-input mr1"
                      type="checkbox"
                      name="seenWords"
                      id="seenWords"
                      disabled={disableUserSettings}
                      checked={userSettings.seenWords}
                      onChange={changeUserSetting}
                    />
                    {/* @ts-ignore */}
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
                      onShow={setAnnouncementMessage}
                    >
                      Seen words
                    </Tooltip>
                  </label>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="block relative p1">
                  <label className="checkbox-label mb1">
                    <input
                      className="checkbox-input mr1"
                      type="checkbox"
                      name="retainedWords"
                      id="retainedWords"
                      disabled={disableUserSettings}
                      checked={userSettings.retainedWords}
                      onChange={changeUserSetting}
                    />
                    {/* @ts-ignore */}
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
                      onShow={setAnnouncementMessage}
                    >
                      Memorised words
                    </Tooltip>
                  </label>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1 db" htmlFor="spacePlacement">
                      Match spaces
                    </label>
                  </Tooltip>
                  <select
                    name="spacePlacement"
                    id="spacePlacement"
                    value={userSettings.spacePlacement}
                    onChange={changeSpacePlacementUserSetting}
                    disabled={disableUserSettings}
                    className="text-small form-control w-144"
                  >
                    <option value="spaceBeforeOutput">
                      Space before output
                    </option>
                    <option value="spaceAfterOutput">Space after output</option>
                    <option value="spaceExact">Exact spacing</option>
                    <option value="spaceOff">Ignore spaces</option>
                  </select>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1 db" htmlFor="stenoLayout">
                      Steno layout
                    </label>
                  </Tooltip>
                  <select
                    name="stenoLayout"
                    id="stenoLayout"
                    value={userSettings.stenoLayout}
                    onChange={changeStenoLayout}
                    disabled={disableUserSettings}
                    className="text-small form-control w-144"
                  >
                    <optgroup label="English">
                      <option value="stenoLayoutAmericanSteno">
                        Ward Stone Ireland (Plover, EcoSteno, SOFT/HRUF etc.)
                      </option>
                      <option value="stenoLayoutNoNumberBarInnerThumbNumbers">
                        Inner thumbers (TinyMod, Steko, etc.)
                      </option>
                      <option value="stenoLayoutNoNumberBarOuterThumbNumbers">
                        Outer thumbers (Uni, Georgi, etc.)
                      </option>
                    </optgroup>
                    <optgroup label="Palantype">
                      <option value="stenoLayoutPalantype">Palantype</option>
                    </optgroup>
                    <optgroup label="Multilingual">
                      <option value="stenoLayoutBrazilianPortugueseSteno">
                        Brazilian Portuguese steno
                      </option>
                      <option value="stenoLayoutDanishSteno">
                        Danish steno
                      </option>
                      <option value="stenoLayoutItalianMichelaSteno">
                        Italian Michela steno
                      </option>
                      <option value="stenoLayoutJapaneseSteno">
                        Japanese steno
                      </option>
                      <option value="stenoLayoutKoreanModernCSteno">
                        Korean Modern C steno
                      </option>
                    </optgroup>
                  </select>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  <label className="mr1" htmlFor="diagramSize">
                    Diagram size
                  </label>
                  <div>
                    <NumericInput
                      autoCapitalize="off"
                      autoComplete="on"
                      autoCorrect="on"
                      autoFocus={false}
                      className="form-control w-100"
                      disabled={disableUserSettings}
                      min={1.0}
                      max={2.0}
                      name="diagramSize"
                      id="diagramSize"
                      onChange={handleDiagramSize}
                      precision={1}
                      spellCheck="false"
                      step={0.1}
                      style={grabStyle()}
                      type="number"
                      value={userSettings.diagramSize}
                      snap
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 pl1 pr2 flex flex-wrap items-center justify-between">
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    <label className="mr1 db" htmlFor="upcomingWordsLayout">
                      Upcoming words
                    </label>
                  </Tooltip>
                  <select
                    name="upcomingWordsLayout"
                    id="upcomingWordsLayout"
                    value={userSettings.upcomingWordsLayout}
                    onChange={handleUpcomingWordsLayout}
                    disabled={disableUserSettings}
                    className="text-small form-control w-144"
                  >
                    <option value="singleLine">Single line</option>
                    <option value="multiline">Multiline</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <SettingCheckbox
                  checked={userSettings.blurMaterial}
                  disabled={disableUserSettings}
                  label={"Blur words"}
                  nameAndId={"blurMaterial"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    "Blur words and use a screen reader or speak setting to practice transcription"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.speakMaterial}
                  disabled={disableUserSettings}
                  label={"Speak words with sound"}
                  nameAndId={"speakMaterial"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={"Speak words with sound"}
                  modalAndButton={speakWordsHelpButtonAndModal}
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <SettingCheckbox
                  checked={userSettings.caseSensitive}
                  disabled={disableUserSettings}
                  label={"Case sensitive"}
                  nameAndId={"caseSensitive"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    "Capital letters in material won’t match typed lowercase letters"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.simpleTypography}
                  disabled={disableUserSettings}
                  label={"Simple typography"}
                  nameAndId={"simpleTypography"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    'Simple typography replaces “curly quotes” in lesson material with "straight quotes"'
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.punctuationDescriptions}
                  disabled={disableUserSettings}
                  label={"Punctuation descriptions"}
                  nameAndId={"punctuationDescriptions"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    "Show text descriptions for punctuation symbols"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.textInputAccessibility}
                  disabled={disableUserSettings}
                  label={"Text input accessibility"}
                  nameAndId={"textInputAccessibility"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    "When unchecked, this hides the text input field from screen readers to mute echoes from typed words but might make it impossible to access for some devices"
                  }
                />
              </SettingListItem>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
