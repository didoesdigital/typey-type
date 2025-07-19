import React, { useEffect, useRef } from "react";
import ClosingCross from "../../components/Icons/icon-images/ClosingCross.svg";
import Icon from "../../components/Icons/Icon";
import { Link, useLocation } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import DocumentTitle from "react-document-title";
import LessonCanvasFooter, {
  type LessonCanvasFooterProps,
} from "./components/LessonCanvasFooter";
import LessonLengthPreview from "./components/LessonLengthPreview";
import LessonSubheader from "./components/LessonSubheader";
import Material from "../../components/Material";
import TypedText from "../../components/TypedText";
import Scores from "../../components/Scores";
import StrokeTip from "./components/StrokeTip";
import UserSettings from "./components/UserSettings/UserSettings";
import AussieDictPrompt from "./components/LessonPrompts/AussieDictPrompt";
import SedSaidPrompt from "./components/LessonPrompts/SedSaidPrompt";
import WordBoundaryErrorPrompt from "./components/LessonPrompts/WordBoundaryErrorPrompt";
import PunctuationDescription from "./components/PunctuationDescription";
import LessonFinePrintFooter from "./components/LessonFinePrintFooter";
import { useAnnouncerApi } from "../../components/Announcer/useAnnouncer";

import type {
  ActualTypedText,
  CurrentLessonStrokes,
  MaterialText,
  Lesson,
  LessonSettings,
  LookupDictWithNamespacedDictsAndConfig,
  Outline,
  Study,
  PrettyLessonTitle,
} from "../../types";

import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import { useChangeShowScoresWhileTyping } from "./components/UserSettings/updateUserSetting";
import { recentLessonHistoryState } from "../../states/recentLessonHistoryState";

export type MainLessonViewProps = {
  createNewCustomLesson: JSX.Element | undefined;
  lessonSubTitle: string;
  overviewLink: JSX.Element | undefined;
  actualText: string;
  changeShowStrokesInLesson: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => boolean;
  chooseStudy: LessonCanvasFooterProps["chooseStudy"];
  completedPhrases: MaterialText[];
  currentLessonStrokes: CurrentLessonStrokes[];
  currentPhrase: MaterialText;
  currentPhraseID: number;
  currentStroke: Outline;
  disableUserSettings: boolean;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  stopLesson: () => void;
  toggleHideOtherSettings: () => void;
  lesson: Lesson;
  lessonLength: number;
  lessonTitle: PrettyLessonTitle;
  previousCompletedPhraseAsTyped: ActualTypedText;
  repetitionsRemaining: number;
  restartLesson: React.MouseEventHandler<HTMLAnchorElement>;
  revisionMode: boolean;
  sayCurrentPhraseAgain: () => void;
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
  updateMarkup: React.ChangeEventHandler<HTMLTextAreaElement>;
  updatePreset: (studyType: Study) => void;
  focusTriggerInt: number;
};

const MainLessonView = ({
  createNewCustomLesson,
  lessonSubTitle,
  overviewLink,
  actualText,
  changeShowStrokesInLesson,
  chooseStudy,
  completedPhrases,
  currentLessonStrokes,
  currentPhrase,
  currentPhraseID,
  currentStroke,
  disableUserSettings,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  stopLesson,
  toggleHideOtherSettings,
  lesson,
  lessonLength,
  lessonTitle,
  previousCompletedPhraseAsTyped,
  repetitionsRemaining,
  restartLesson,
  revisionMode,
  sayCurrentPhraseAgain,
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
  updatePreset,
  focusTriggerInt,
}: MainLessonViewProps) => {
  const userSettings = useAtomValue(userSettingsState);
  const recentLessonHistory = useAtomValue(recentLessonHistoryState)?.history;
  const changeShowScoresWhileTyping = useChangeShowScoresWhileTyping();
  const previousLesson = useRef<string | null>(null);
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const location = useLocation();
  const { updateMessage } = useAnnouncerApi();

  // Note: This is a crude way of avoiding excess page title announcements due
  // to excess re-renders. Ideally, we'd reduce re-renders and reliably
  // announce lesson changes only when navigating to a new lesson
  useEffect(() => {
    const realLesson = lessonTitle !== "Steno";
    const reRenderSameLesson = previousLesson.current === lessonTitle;
    const reMountCurrentLesson =
      recentLessonHistory?.[recentLessonHistory.length - 1]?.path ===
      location.pathname;

    if (realLesson && !reRenderSameLesson && !reMountCurrentLesson) {
      updateMessage(`Navigated to: ${lessonTitle}`);
    }
  }, [lessonTitle, updateMessage, recentLessonHistory, location.pathname]);

  useEffect(() => {
    previousLesson.current = lessonTitle;
  }, [lessonTitle]);

  return (
    <DocumentTitle title={"Typey Type | Lesson: " + lesson.title}>
      <main id="main">
        <LessonSubheader
          createNewCustomLesson={createNewCustomLesson}
          stopLesson={stopLesson}
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
                  // @ts-expect-error TS(2769) FIXME: No overload matches this call.
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
                <div className="lesson-canvas panel overflow-hidden flex relative bg-white dark:bg-coolgrey-1000 mx-auto mw-1440 p2 mb3 flex">
                  {revisionMode && (
                    <div>
                      <Link
                        to={lesson?.path.replace(/lesson\.txt$/, "")}
                        onClick={restartLesson}
                        className="revision-mode-button no-underline absolute right-0"
                        aria-label="Exit revision mode"
                      >
                        Revision mode
                        <Icon
                          iconSVGImport={ClosingCross}
                          width="1em"
                          height="1em"
                          className="icon ml1"
                          style={{ transform: "translateY(-0.1em)" }}
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
                    />
                    <TypedText
                      actualText={actualText}
                      currentLessonStrokes={currentLessonStrokes}
                      currentPhrase={currentPhrase}
                      currentPhraseID={currentPhraseID}
                      completedPhrases={lesson.newPresentedMaterial.completed}
                      previousCompletedPhraseAsTyped={
                        previousCompletedPhraseAsTyped
                      }
                      sayCurrentPhraseAgain={sayCurrentPhraseAgain}
                      updateMarkup={updateMarkup}
                      focusTriggerInt={focusTriggerInt}
                    />
                    <WordBoundaryErrorPrompt
                      actualText={actualText}
                      currentPhrase={currentPhrase}
                    />
                    <AussieDictPrompt
                      actualText={actualText}
                      currentStroke={currentStroke}
                    />
                    <SedSaidPrompt
                      actualText={actualText}
                      currentPhrase={currentPhrase}
                    />
                    <StrokeTip
                      changeShowStrokesInLesson={changeShowStrokesInLesson}
                      currentStroke={currentStroke}
                      currentPhrase={currentPhrase}
                      globalLookupDictionary={globalLookupDictionary}
                      globalLookupDictionaryLoaded={
                        globalLookupDictionaryLoaded
                      }
                      repetitionsRemaining={repetitionsRemaining}
                      showStrokesInLesson={showStrokesInLesson}
                      targetStrokeCount={targetStrokeCount}
                    />
                    <LessonLengthPreview
                      lessonStarted={disableUserSettings}
                      speed={userSettings?.beatsPerMinute || 10}
                      totalWords={lesson.presentedMaterial.length}
                    />
                  </div>
                </div>
                <LessonCanvasFooter
                  chooseStudy={chooseStudy}
                  disableUserSettings={disableUserSettings}
                  toggleHideOtherSettings={toggleHideOtherSettings}
                  updatePreset={updatePreset}
                />
              </div>
              <LessonFinePrintFooter
                lesson={lesson}
                lessonTitle={lessonTitle}
              />
            </div>
          </div>
          <div>
            <UserSettings
              disableUserSettings={disableUserSettings}
              maxStartFromWord={lessonLength}
              revisionMode={revisionMode}
              totalWordCount={totalWordCount}
            />
          </div>
        </div>
      </main>
    </DocumentTitle>
  );
};

export default MainLessonView;
