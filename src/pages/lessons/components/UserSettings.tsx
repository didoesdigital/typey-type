import React from "react";
import { Tooltip } from "react-tippy";
import ErrorBoundary from "../../../components/ErrorBoundary";
import NumericInput from "react-numeric-input";
import SettingCheckbox from "../../../components/SettingCheckbox";
import SettingListItem from "../../../components/SettingListItem";
import SpeakWordsHelp from "./SpeakWordsHelp";
import VoiceSetting from "./VoiceSetting";

import type { UserSettings as UserSettingsObjectType } from "../../../types";

const grabStyle = function () {
  return false;
};

type Props = {
  changeShowScoresWhileTyping: (event: any) => void;
  changeShowStrokesAs: (event: any) => void;
  changeShowStrokesAsList: (event: any) => void;
  changeShowStrokesOnMisstroke: (event: any) => void;
  changeSortOrderUserSetting: (event: any) => void;
  changeSpacePlacementUserSetting: (event: any) => void;
  changeStenoLayout: (event: any) => void;
  changeUserSetting: (event: any) => void;
  changeVoiceUserSetting: (voiceName: string) => void;
  disableUserSettings: boolean;
  handleBeatsPerMinute: (event: any) => void;
  handleDiagramSize: (event: any) => void;
  handleLimitWordsChange: (event: any) => void;
  handleRepetitionsChange: (event: any) => void;
  handleStartFromWordChange: (event: any) => void;
  handleUpcomingWordsLayout: (event: any) => void;
  hideOtherSettings: boolean;
  maxStartFromWord: number;
  revisionMode: boolean;
  setAnnouncementMessage: any;
  totalWordCount: number;
  userSettings: UserSettingsObjectType;
};

const UserSettings = ({
  changeShowScoresWhileTyping,
  changeShowStrokesAs,
  changeShowStrokesAsList,
  changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting,
  changeSpacePlacementUserSetting,
  changeStenoLayout,
  changeUserSetting,
  changeVoiceUserSetting,
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
                  label={"Show hint for every word"}
                  nameAndId={"showStrokes"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    !userSettings.hideStrokesOnLastRepetition
                      ? "Show stroke hint for every word"
                      : "Show stroke hint for each word except during the last repetition"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.hideStrokesOnLastRepetition}
                  disabled={disableUserSettings}
                  label={"Hide hint on last repetition"}
                  nameAndId={"hideStrokesOnLastRepetition"}
                  onChange={changeUserSetting}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    userSettings.showStrokes
                      ? "Hide stroke hint during the last repetition"
                      : "This does nothing while “Show hint” is turned off"
                  }
                />
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.showStrokesOnMisstroke}
                  disabled={disableUserSettings}
                  label={"Show hint on misstroke"}
                  nameAndId={"showStrokesOnMisstroke"}
                  onChange={changeShowStrokesOnMisstroke}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    "Show stroke hints for words when you misstroke them"
                  }
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
                        title="Show stroke hints as diagrams for your steno layout"
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
                        Show hint diagram
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
                        title="Show hints as text and read to screen readers"
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
                        Show hint text
                      </Tooltip>
                    </label>
                  </div>
                </div>
                <SettingCheckbox
                  wrapperClasses="block relative pb1 px1"
                  checked={userSettings.showStrokesAsList}
                  disabled={disableUserSettings}
                  label={"Show other stroke hints"}
                  nameAndId={"showStrokesAsList"}
                  onChange={changeShowStrokesAsList}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={
                    "Show alternative stroke hints from personal and Plover dictionaries"
                  }
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
                  modalAndButton={
                    <SpeakWordsHelp disabled={disableUserSettings} />
                  }
                />
                <ErrorBoundary relative={true} vanish={true}>
                  <details style={{ maxWidth: "300px", paddingLeft: "22px" }}>
                    <summary className="ml1 absolute-marker">
                      Voice settings
                    </summary>
                    <VoiceSetting
                      changeVoiceUserSetting={changeVoiceUserSetting}
                      disableUserSettings={disableUserSettings}
                      setAnnouncementMessage={setAnnouncementMessage}
                      speakMaterial={userSettings.speakMaterial}
                      voiceName={userSettings.voiceName}
                    />
                  </details>
                </ErrorBoundary>
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
                  checked={userSettings.showScoresWhileTyping}
                  disabled={disableUserSettings}
                  label={"Show scores"}
                  nameAndId={"showScoresWhileTyping"}
                  onChange={changeShowScoresWhileTyping}
                  onShow={setAnnouncementMessage}
                  tooltipTitle={"Show scores while typing"}
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
