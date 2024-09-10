import React, { useEffect, useRef } from "react";
import InfoIconAndTooltip from "../../../../components/InfoIconAndTooltip";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import NumericInput from "react-numeric-input";
import SettingCheckbox from "../../../../components/SettingCheckbox";
import SettingListItem from "../../../../components/SettingListItem";
import SpeakWordsHelp from "../SpeakWordsHelp";
import VoiceSetting from "../VoiceSetting";

import { useAppMethods } from "../../../../states/legacy/AppMethodsContext";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../../../states/userSettingsState";
import {
  useChangeShowScoresWhileTyping,
  useChangeShowStrokesAs,
  useChangeShowStrokesAsList,
  useChangeShowStrokesOnMisstroke,
  useChangeSortOrderUserSetting,
  useChangeSpacePlacementUserSetting,
  useChangeStenoLayout,
  useChangeUserSetting,
  useChangeVoiceUserSetting,
  useHandleBeatsPerMinute,
  useHandleDiagramSize,
  useHandleLimitWordsChange,
  useHandleRepetitionsChange,
  useHandleStartFromWordChange,
  useHandleUpcomingWordsLayout,
} from "./updateUserSetting";

const grabStyle = function () {
  return false;
};

type Props = {
  disableUserSettings: boolean;
  maxStartFromWord: number;
  revisionMode: boolean;
  totalWordCount: number;
};

const UserSettings = ({
  disableUserSettings,
  maxStartFromWord,
  revisionMode,
  totalWordCount,
}: Props) => {
  const userSettings = useAtomValue(userSettingsState);
  const changeShowScoresWhileTyping = useChangeShowScoresWhileTyping();
  const changeShowStrokesAs = useChangeShowStrokesAs();
  const changeShowStrokesAsList = useChangeShowStrokesAsList();
  const changeShowStrokesOnMisstroke = useChangeShowStrokesOnMisstroke();
  const changeSortOrderUserSetting = useChangeSortOrderUserSetting();
  const changeSpacePlacementUserSetting = useChangeSpacePlacementUserSetting();
  const changeStenoLayout = useChangeStenoLayout();
  const changeUserSetting = useChangeUserSetting();
  const changeVoiceUserSetting = useChangeVoiceUserSetting();
  const handleBeatsPerMinute = useHandleBeatsPerMinute();
  const handleDiagramSize = useHandleDiagramSize();
  const handleLimitWordsChange = useHandleLimitWordsChange();
  const handleRepetitionsChange = useHandleRepetitionsChange();
  const handleStartFromWordChange = useHandleStartFromWordChange();
  const handleUpcomingWordsLayout = useHandleUpcomingWordsLayout();

  const { setupLesson } = useAppMethods();
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    // Call whenever settings change
    setupLesson();

    // TODO: add `setupLesson` to dependency array
    // after reducing parent component re-renders:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userSettings.sortOrder,
    userSettings.spacePlacement,
    userSettings.stenoLayout,
    userSettings.study,
    userSettings.limitNumberOfWords,
    userSettings.repetitions,
    userSettings.startFromWord,
    userSettings.upcomingWordsLayout,
    userSettings.newWords,
    userSettings.seenWords,
    userSettings.retainedWords,
    userSettings.simpleTypography,
  ]);

  return (
    <div className="user-settings">
      <form>
        <div className="text-small">
          <div
            id="collapsible-settings"
            className={`mh-page bg-slat dark:bg-coolgrey-1100 bl b--brand-primary-tint--60 dark:border-coolgrey-800 min-width-344${
              userSettings.hideOtherSettings ? " hide" : ""
            }`}
            aria-hidden={userSettings.hideOtherSettings}
          >
            <h3 className="mb1 visually-hidden">Settings</h3>

            <p className="mb0 pt2 pb1 pb1 pl2">
              <small>Total words: {totalWordCount}</small>
            </p>
            <ul className="unstyled-list mb0 pb1">
              <SettingListItem sectionHierachy="major">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1" htmlFor="limitNumberOfWords">
                    Limit word count
                  </label>
                  <div className="flex items-center gap-2">
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
                    <InfoIconAndTooltip
                      id="limitNumberOfWordsTooltip"
                      place="top-end"
                      content="Limit the number of words shown (0 for unlimited)"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1" htmlFor="startFromWord">
                    Start from word
                  </label>
                  <div className="flex items-center gap-2">
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
                    <InfoIconAndTooltip
                      id="startFromWordTooltip"
                      place="top-end"
                      content="Start from this place in the lesson"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1" htmlFor="repetitions">
                    Repetitions
                  </label>
                  <div className="flex items-center gap-2">
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
                    <InfoIconAndTooltip
                      id="repetitionsTooltip"
                      place="top-end"
                      content="Repeat the lesson up to 30 times"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1 db" htmlFor="sortOrder">
                    Sort
                  </label>
                  <div className="flex items-center gap-2">
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
                    <InfoIconAndTooltip
                      id="sortOrderTooltip"
                      place="top-end"
                      content="Sort the lesson (newest words need the most practice)"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1" htmlFor="beatsPerMinute">
                    Metronome BPM
                  </label>
                  <div className="flex items-center gap-2">
                    <NumericInput
                      data-1p-ignore
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
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
                    <InfoIconAndTooltip
                      id="beatsPerMinuteTooltip"
                      place="top-end"
                      content="Metronome beats per minute"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.showStrokes}
                    disabled={disableUserSettings}
                    label={"Show hint for every word"}
                    nameAndId={"showStrokes"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="showStrokesTooltip"
                    place="top-end"
                    content={
                      !userSettings.hideStrokesOnLastRepetition
                        ? "Show stroke hint for every word"
                        : "Show stroke hint for each word except during the last repetition"
                    }
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.hideStrokesOnLastRepetition}
                    disabled={disableUserSettings}
                    label={"Hide hint on last repetition"}
                    nameAndId={"hideStrokesOnLastRepetition"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="hideStrokesOnLastRepetitionTooltip"
                    place="top-end"
                    content={
                      userSettings.showStrokes
                        ? "Hide stroke hint during the last repetition"
                        : "This does nothing while “Show hint” is turned off"
                    }
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.showStrokesOnMisstroke}
                    disabled={disableUserSettings}
                    label={"Show hint on misstroke"}
                    nameAndId={"showStrokesOnMisstroke"}
                    onChange={changeShowStrokesOnMisstroke}
                  />
                  <InfoIconAndTooltip
                    id="showStrokesOnMisstrokeTooltip"
                    place="top-end"
                    content={
                      "Show stroke hints for words when you misstroke them"
                    }
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="p1">
                  <div className="block relative">
                    <div className="flex items-center justify-between">
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
                        Show hint diagram
                      </label>
                      <div className="pb1">
                        <InfoIconAndTooltip
                          id="strokesAsDiagramsTooltip"
                          place="top-end"
                          content="Show stroke hints as diagrams for your steno layout"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="block relative">
                    <div className="flex items-center justify-between">
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
                        Show hint text
                      </label>
                      <InfoIconAndTooltip
                        id="strokesAsTextTooltip"
                        place="top-end"
                        content="Show hints as text and read to screen readers"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    wrapperClasses="block relative pb1 px1"
                    checked={userSettings.showStrokesAsList}
                    disabled={disableUserSettings}
                    label={"Show other stroke hints"}
                    nameAndId={"showStrokesAsList"}
                    onChange={changeShowStrokesAsList}
                  />
                  <div className="pb1">
                    <InfoIconAndTooltip
                      id="strokesAsTextTooltip"
                      place="top-end"
                      content="Show alternative stroke hints from personal and Plover dictionaries"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="block relative p1">
                  <div className="flex items-center justify-between">
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
                      New words
                    </label>
                    <InfoIconAndTooltip
                      id="newWordsTooltip"
                      place="top-end"
                      content={"Show new words you haven’t yet typed correctly"}
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="block relative p1">
                  <div className="flex items-center justify-between">
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
                      Seen words
                    </label>
                    <InfoIconAndTooltip
                      id="seenWordsTooltip"
                      place="top-end"
                      content="Show words you have seen before"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="block relative p1">
                  <div className="flex items-center justify-between">
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
                      Memorised words
                    </label>
                    <InfoIconAndTooltip
                      id="retainedWordsTooltip"
                      place="top-end"
                      content="Show memorised words you’ve typed 30 times or more"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1 db" htmlFor="spacePlacement">
                    Match spaces
                  </label>
                  <div className="flex items-center gap-2">
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
                      <option value="spaceAfterOutput">
                        Space after output
                      </option>
                      <option value="spaceExact">Exact spacing</option>
                      <option value="spaceOff">Ignore spaces</option>
                    </select>
                    <InfoIconAndTooltip
                      id="spacePlacementTooltip"
                      place="top-end"
                      content="Set match spaces to suit your steno settings"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1 db" htmlFor="stenoLayout">
                    Steno layout
                  </label>
                  <div className="flex items-center gap-2">
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
                        <option value="stenoLayoutYaweiChineseSteno">
                          Chinese Yawei steno
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
                    <InfoIconAndTooltip
                      id="stenoLayoutTooltip"
                      place="top-end"
                      content="Show steno diagrams that suit your steno layout"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1" htmlFor="diagramSize">
                    Diagram size
                  </label>
                  <div className="flex items-center gap-2">
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
                    <InfoIconAndTooltip
                      id="diagramSizeTooltip"
                      place="top-end"
                      content="Adjust stroke hint steno diagram size up to 2.0"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
                  <label className="mr1 db" htmlFor="upcomingWordsLayout">
                    Upcoming words
                  </label>
                  <div className="flex items-center gap-2">
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
                    <InfoIconAndTooltip
                      id="upcomingWordsLayoutTooltip"
                      place="top-end"
                      content="Show lesson material words as a single, sliding line, multiple, wrapping lines, or one word at a time"
                    />
                  </div>
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.blurMaterial}
                    disabled={disableUserSettings}
                    label={"Blur words"}
                    nameAndId={"blurMaterial"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="blurMaterialTooltip"
                    place="top-end"
                    content="Blur words and use a screen reader or speak setting to practice transcription"
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <SettingCheckbox
                  checked={userSettings.speakMaterial}
                  disabled={disableUserSettings}
                  label={"Speak words with sound"}
                  nameAndId={"speakMaterial"}
                  onChange={changeUserSetting}
                  modalAndButton={
                    <SpeakWordsHelp disabled={disableUserSettings} />
                  }
                />
                <ErrorBoundary relative={true} vanish={true}>
                  {userSettings.speakMaterial ? (
                    <details style={{ maxWidth: "300px", paddingLeft: "22px" }}>
                      <summary className="ml1 absolute-marker">
                        Voice settings
                      </summary>
                      <VoiceSetting
                        changeVoiceUserSetting={changeVoiceUserSetting}
                        disableUserSettings={disableUserSettings}
                        speakMaterial={userSettings.speakMaterial}
                        voiceName={userSettings.voiceName}
                        voiceURI={userSettings.voiceURI}
                      />
                    </details>
                  ) : null}
                </ErrorBoundary>
              </SettingListItem>
              <SettingListItem sectionHierachy="major">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.caseSensitive}
                    disabled={disableUserSettings}
                    label={"Case sensitive"}
                    nameAndId={"caseSensitive"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="caseSensitiveTooltip"
                    place="top-end"
                    content="Capital letters in material won’t match typed lowercase letters"
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.simpleTypography}
                    disabled={disableUserSettings}
                    label={"Simple typography"}
                    nameAndId={"simpleTypography"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="simpleTypographyTooltip"
                    place="top-end"
                    content={
                      'Simple typography replaces “curly quotes” in lesson material with "straight quotes"'
                    }
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.punctuationDescriptions}
                    disabled={disableUserSettings}
                    label={"Punctuation descriptions"}
                    nameAndId={"punctuationDescriptions"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="punctuationDescriptionsTooltip"
                    place="top-end"
                    content="Show text descriptions for punctuation symbols"
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.showScoresWhileTyping}
                    disabled={disableUserSettings}
                    label={"Show scores"}
                    nameAndId={"showScoresWhileTyping"}
                    onChange={changeShowScoresWhileTyping}
                  />
                  <InfoIconAndTooltip
                    id="showScoresWhileTypingTooltip"
                    place="top-end"
                    content="Show scores while typing"
                  />
                </div>
              </SettingListItem>
              <SettingListItem sectionHierachy="minor">
                <div className="flex items-center justify-between pr1">
                  <SettingCheckbox
                    checked={userSettings.textInputAccessibility}
                    disabled={disableUserSettings}
                    label={"Text input accessibility"}
                    nameAndId={"textInputAccessibility"}
                    onChange={changeUserSetting}
                  />
                  <InfoIconAndTooltip
                    id="textInputAccessibilityTooltip"
                    place="top-end"
                    content="When unchecked, this hides the text input field from screen readers to mute echoes from typed words but might make it impossible to access for some devices"
                  />
                </div>
              </SettingListItem>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
