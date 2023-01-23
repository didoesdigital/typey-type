import React, { useRef } from "react";
import { IconClosingCross } from "../../components/Icon";
import { Link } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import DocumentTitle from "react-document-title";
import LessonCanvasFooter from "./components/LessonCanvasFooter";
import LessonLengthPreview from "./components/LessonLengthPreview";
import LessonSubheader from "./components/LessonSubheader";
import Material from "../../components/Material";
import TypedText from "../../components/TypedText";
import Scores from "../../components/Scores";
import StrokeTip from "./components/StrokeTip";
import UserSettings from "../../components/UserSettings";
import AussieDictPrompt from "../../components/LessonPrompts/AussieDictPrompt";
import SedSaidPrompt from "../../components/LessonPrompts/SedSaidPrompt";
import WordBoundaryErrorPrompt from "../../components/LessonPrompts/WordBoundaryErrorPrompt";
import PunctuationDescription from "./components/PunctuationDescription";

import type {
  ActualTypedText,
  CurrentLessonStrokes,
  MaterialText,
  Lesson,
  LessonSettings,
  LookupDictWithNamespacedDicts,
  Outline,
  UserSettings as UserSettingsType,
} from "../../types";

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
const googleFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=";
const googleFormParam = "&entry.1202724812&entry.936119214";

type Props = {
  createNewCustomLesson: JSX.Element | undefined;
  lessonSubTitle: string;
  overviewLink: JSX.Element | undefined;
  propsLesson: Lesson;
  actualText: string;
  changeShowScoresWhileTyping: () => void;
  changeShowStrokesAs: () => void;
  changeShowStrokesInLesson: () => void;
  changeShowStrokesOnMisstroke: () => void;
  changeSortOrderUserSetting: () => void;
  changeSpacePlacementUserSetting: () => void;
  changeStenoLayout: () => void;
  changeUserSetting: () => void;
  chooseStudy: () => void;
  completedPhrases: MaterialText[];
  currentLessonStrokes: CurrentLessonStrokes;
  currentPhrase: MaterialText;
  currentPhraseID: number;
  currentStroke: Outline;
  disableUserSettings: boolean;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  handleBeatsPerMinute: () => void;
  handleDiagramSize: () => void;
  handleLimitWordsChange: () => void;
  handleRepetitionsChange: () => void;
  handleStartFromWordChange: () => void;
  handleStopLesson: () => void;
  handleUpcomingWordsLayout: () => void;
  lesson: Lesson;
  lessonLength: number;
  lessonTitle: string;
  // TODO: get actual type
  /**
   * Examples:
   * hash: ""
   * key: string
   * pathname: "/lessons/drills/steno-party-tricks/"
   * search: ""
   * state: undefined
   * */
  location: { [key: string]: any };
  previousCompletedPhraseAsTyped: ActualTypedText;
  repetitionsRemaining: number;
  restartLesson: () => void;
  revisionMode: boolean;
  sayCurrentPhraseAgain: () => void;
  setAnnouncementMessage: () => void;
  settings: LessonSettings;
  showStrokesInLesson: boolean;
  targetStrokeCount: number;
  timer: number;
  totalNumberOfHintedWords: number;
  totalNumberOfLowExposuresSeen: number;
  totalNumberOfMatchedWords: number;
  totalNumberOfMistypedWords: number;
  totalNumberOfNewWordsMet: number;
  totalNumberOfRetainedWords: number;
  totalWordCount: number;
  upcomingPhrases: MaterialText[];
  updateMarkup: () => void;
  userSettings: UserSettingsType;
  hideOtherSettings: boolean;
  toggleHideOtherSettings: () => void;
};

const MainLessonView = ({
  createNewCustomLesson,
  lessonSubTitle,
  overviewLink,
  propsLesson,
  actualText,
  changeShowScoresWhileTyping,
  changeShowStrokesAs,
  changeShowStrokesInLesson,
  changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting,
  changeSpacePlacementUserSetting,
  changeStenoLayout,
  changeUserSetting,
  chooseStudy,
  completedPhrases,
  currentLessonStrokes,
  currentPhrase,
  currentPhraseID,
  currentStroke,
  disableUserSettings,
  globalLookupDictionary,
  handleBeatsPerMinute,
  handleDiagramSize,
  handleLimitWordsChange,
  handleRepetitionsChange,
  handleStartFromWordChange,
  handleStopLesson,
  handleUpcomingWordsLayout,
  lesson,
  lessonLength,
  lessonTitle,
  location,
  previousCompletedPhraseAsTyped,
  repetitionsRemaining,
  restartLesson,
  revisionMode,
  sayCurrentPhraseAgain,
  setAnnouncementMessage,
  settings,
  showStrokesInLesson,
  targetStrokeCount,
  timer,
  totalNumberOfHintedWords,
  totalNumberOfLowExposuresSeen,
  totalNumberOfMatchedWords,
  totalNumberOfMistypedWords,
  totalNumberOfNewWordsMet,
  totalNumberOfRetainedWords,
  totalWordCount,
  upcomingPhrases,
  updateMarkup,
  userSettings,
  hideOtherSettings,
  toggleHideOtherSettings,
}: Props) => {
  const mainHeading = useRef(null);

  return (
    <DocumentTitle title={"Typey Type | Lesson: " + lesson.title}>
      <main id="main">
        <LessonSubheader
          createNewCustomLesson={createNewCustomLesson}
          handleStopLesson={handleStopLesson}
          lessonSubTitle={lessonSubTitle}
          lessonTitle={lessonTitle}
          overviewLink={overviewLink}
          path={lesson?.path}
          restartLesson={restartLesson}
          ref={mainHeading}
        />
        <div id="lesson-page" className="flex-wrap-md flex mx-auto mw-1920">
          <div
            id="main-lesson-area"
            className="flex-grow mx-auto mw-1440 min-w-0"
          >
            <div>
              {settings?.customMessage && (
                <div className="mx-auto mw-1920">
                  <h3 className="px3 pb0 mb0">{settings.customMessage}</h3>
                </div>
              )}
              <div className="mx-auto mw-1920 p3">
                <button
                  onClick={changeShowScoresWhileTyping}
                  className={
                    "de-emphasized-button show-scores-control absolute mb3 " +
                    (userSettings.showScoresWhileTyping
                      ? "show-scores-control--hidden"
                      : "show-scores-control--shown")
                  }
                >
                  Show scores
                </button>
                <AnimateHeight
                  duration={300}
                  height={userSettings.showScoresWhileTyping ? "auto" : 0}
                  // @ts-ignore TODO see if this is a real issue
                  ease={"cubic-bezier(0.645, 0.045, 0.355, 1)"}
                >
                  <div
                    className={
                      "mb3 " +
                      (userSettings.showScoresWhileTyping
                        ? "scores--shown"
                        : "scores--hidden")
                    }
                    onClick={changeShowScoresWhileTyping}
                  >
                    <Scores
                      setAnnouncementMessage={setAnnouncementMessage}
                      timer={timer}
                      totalNumberOfMatchedWords={totalNumberOfMatchedWords}
                      totalNumberOfNewWordsMet={totalNumberOfNewWordsMet}
                      totalNumberOfLowExposuresSeen={
                        totalNumberOfLowExposuresSeen
                      }
                      totalNumberOfRetainedWords={totalNumberOfRetainedWords}
                      totalNumberOfMistypedWords={totalNumberOfMistypedWords}
                      totalNumberOfHintedWords={totalNumberOfHintedWords}
                    />
                  </div>
                </AnimateHeight>
                <div
                  role="article"
                  className="lesson-canvas panel overflow-hidden flex relative bg-white dark:bg-coolgrey-1000 mx-auto mw-1440 p2 mb3 flex"
                >
                  {revisionMode && (
                    <div>
                      <Link
                        to={lesson?.path.replace(/lesson\.txt$/, "")}
                        onClick={restartLesson}
                        className="revision-mode-button no-underline absolute right-0"
                      >
                        Revision mode
                        <IconClosingCross
                          role="img"
                          iconWidth="24"
                          iconHeight="24"
                          className="ml1 svg-icon-wrapper svg-baseline"
                          iconTitle="Exit revision mode"
                        />
                      </Link>
                    </div>
                  )}
                  <div className="mx-auto mw100 mt10 min-width70 material-typed-text-and-hint flex-grow">
                    <PunctuationDescription
                      currentPhrase={currentPhrase}
                      multiline={
                        userSettings.upcomingWordsLayout === "multiline"
                      }
                      punctuationDescriptions={
                        userSettings.punctuationDescriptions
                      }
                    />
                    <Material
                      actualText={actualText}
                      completedPhrases={completedPhrases}
                      currentPhrase={currentPhrase}
                      currentPhraseID={currentPhraseID}
                      lesson={lesson}
                      settings={settings}
                      upcomingPhrases={upcomingPhrases}
                      userSettings={userSettings}
                    />
                    <TypedText
                      actualText={actualText}
                      currentLessonStrokes={currentLessonStrokes}
                      currentPhrase={currentPhrase}
                      completedPhrases={lesson.newPresentedMaterial.completed}
                      previousCompletedPhraseAsTyped={
                        previousCompletedPhraseAsTyped
                      }
                      sayCurrentPhraseAgain={sayCurrentPhraseAgain}
                      updateMarkup={updateMarkup}
                      userSettings={userSettings}
                    />
                    <WordBoundaryErrorPrompt
                      actualText={actualText}
                      currentPhrase={currentPhrase}
                      setAnnouncementMessage={setAnnouncementMessage}
                    />
                    <AussieDictPrompt
                      actualText={actualText}
                      currentStroke={currentStroke}
                      setAnnouncementMessage={setAnnouncementMessage}
                    />
                    <SedSaidPrompt
                      actualText={actualText}
                      currentPhrase={currentPhrase}
                      setAnnouncementMessage={setAnnouncementMessage}
                    />
                    <StrokeTip
                      changeShowStrokesInLesson={changeShowStrokesInLesson}
                      currentStroke={currentStroke}
                      currentPhrase={currentPhrase}
                      globalLookupDictionary={globalLookupDictionary}
                      repetitionsRemaining={repetitionsRemaining}
                      showStrokesInLesson={showStrokesInLesson}
                      targetStrokeCount={targetStrokeCount}
                      userSettings={userSettings}
                    />
                    <LessonLengthPreview
                      lessonStarted={disableUserSettings}
                      speed={userSettings?.beatsPerMinute || 10}
                      totalWords={propsLesson.presentedMaterial.length}
                    />
                  </div>
                </div>
                <LessonCanvasFooter
                  chooseStudy={chooseStudy}
                  disableUserSettings={disableUserSettings}
                  hideOtherSettings={hideOtherSettings}
                  setAnnouncementMessage={setAnnouncementMessage}
                  toggleHideOtherSettings={toggleHideOtherSettings}
                  userSettings={userSettings}
                />
              </div>
              <p className="text-center">
                <a
                  href={
                    googleFormURL +
                    encodeURIComponent(location?.pathname || "") +
                    googleFormParam
                  }
                  className="text-small mt0"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="ga--lesson--give-feedback"
                >
                  Give feedback on this lesson (form opens in a new tab)
                </a>
              </p>
            </div>
          </div>
          <div>
            <UserSettings
              changeSortOrderUserSetting={changeSortOrderUserSetting}
              changeSpacePlacementUserSetting={changeSpacePlacementUserSetting}
              changeStenoLayout={changeStenoLayout}
              changeShowStrokesAs={changeShowStrokesAs}
              changeShowStrokesOnMisstroke={changeShowStrokesOnMisstroke}
              changeUserSetting={changeUserSetting}
              chooseStudy={chooseStudy}
              disableUserSettings={disableUserSettings}
              handleDiagramSize={handleDiagramSize}
              handleBeatsPerMinute={handleBeatsPerMinute}
              handleLimitWordsChange={handleLimitWordsChange}
              handleStartFromWordChange={handleStartFromWordChange}
              handleRepetitionsChange={handleRepetitionsChange}
              handleUpcomingWordsLayout={handleUpcomingWordsLayout}
              hideOtherSettings={hideOtherSettings}
              maxStartFromWord={lessonLength}
              revisionMode={revisionMode}
              setAnnouncementMessage={setAnnouncementMessage}
              totalWordCount={totalWordCount}
              userSettings={userSettings}
            />
          </div>
        </div>
      </main>
    </DocumentTitle>
  );
};

export default MainLessonView;
