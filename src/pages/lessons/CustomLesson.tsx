import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import DocumentTitle from "react-document-title";
import LessonSubheader from "./components/LessonSubheader";
import Finished from "./components/Finished";
import getLessonMetadata from "./utilities/getLessonMetadata";
import MainLessonView from "./MainLessonView";
import type { LessonProps } from "./types";
import type { Lesson as LessonType } from "../../types";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtom } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import {
  useChooseStudy,
  useToggleHideOtherSettings,
  useUpdatePreset,
} from "./components/UserSettings/updateUserSetting";
import { useLessonIndex } from "../../states/lessonIndexState";
import applyQueryParamsToUserSettings from "./components/UserSettings/applyQueryParamsToUserSettings";
import { revisionModeState } from "../../states/lessonState";
import { recentLessonHistoryState } from "../../states/recentLessonHistoryState";
import getChangesToRecentLessons from "../progress/RecentLessons/getChangesToRecentLessons";

const isFinished = (lesson: LessonType, currentPhraseID: number) =>
  currentPhraseID === lesson?.presentedMaterial?.length || 0;

const Lesson = ({
  actualText,
  completedPhrases,
  currentLessonStrokes,
  currentPhrase,
  currentPhraseID,
  currentStroke,
  disableUserSettings,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  lesson,
  lessonLength,
  lessonSubTitle: lessonSubTitleProp,
  lessonTitle,
  metWords,
  previousCompletedPhraseAsTyped,
  repetitionsRemaining,
  settings,
  showStrokesInLesson,
  startTime,
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
  focusTriggerInt,
}: Omit<LessonProps, "personalDictionaries">) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    changeShowStrokesInLesson,
    restartLesson,
    reviseLesson,
    sayCurrentPhraseAgain,
    setupLesson,
    startCustomLesson,
    stopLesson,
    updateMarkup,
    updateRevisionMaterial,
  } = useAppMethods();
  const lessonIndex = useLessonIndex();
  const [userSettings, setUserSettings] = useAtom(userSettingsState);
  const [revisionMode, setRevisionMode] = useAtom(revisionModeState);
  const [recentLessons, setRecentLessons] = useAtom(recentLessonHistoryState);
  const chooseStudy = useChooseStudy();
  const toggleHideOtherSettings = useToggleHideOtherSettings();
  const updatePreset = useUpdatePreset();

  const mainHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  useEffect(() => {
    // If cookies are disabled, attempting to access localStorage will cause an error.
    // The disabled cookie error will be handled in ErrorBoundary.
    // Wrapping this in a try/catch or removing the conditional would fail silently.
    // By checking here, we let people use the rest of the app but not lessons.
    if (window.localStorage) {
      startCustomLesson();

      const parsedParams = queryString.parse(location.search);

      if (
        Object.keys(parsedParams).some((param) => {
          return Object.prototype.hasOwnProperty.call(userSettings, param);
        })
      ) {
        const currentUserSettings = Object.assign({}, userSettings);
        const newUserSettings = applyQueryParamsToUserSettings(
          currentUserSettings,
          parsedParams
        );
        setUserSettings(newUserSettings);
        setupLesson();
      }
      const urlSearchParams = new URLSearchParams(location.search);
      const needsSetupLesson = [...urlSearchParams].length > 0;
      if (needsSetupLesson) {
        navigate({ search: "", hash: location.hash }, { replace: true });
      }
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [handleLesson, lesson.path, location.pathname, location.search, setupLesson, startCustomLesson, userSettings]);

  const hasZeroTotalWordCount = totalWordCount === 0;
  const hasEmptyCurrentPhrase = currentPhrase === "";

  // Focus on input when starting custom lesson
  useEffect(() => {
    if (!hasEmptyCurrentPhrase || !hasZeroTotalWordCount) {
      const yourTypedText = document.getElementById("your-typed-text");
      if (yourTypedText) {
        yourTypedText.focus();
      }
    }
  }, [hasEmptyCurrentPhrase, hasZeroTotalWordCount]);

  // Stop lesson (timer, etc. when lesson is unmounted)
  useEffect(() => {
    return () => {
      stopLesson();
    };
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstKeystroke = !startTime;
  const updateRecentLessonsAndUpdateMarkup: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => {
    if (firstKeystroke) {
      const changesToRecentLessons = getChangesToRecentLessons(
        lesson.path,
        userSettings?.study,
        recentLessons
      );

      if (changesToRecentLessons) {
        setRecentLessons(changesToRecentLessons);
      }
    }

    updateMarkup(event);
  };

  const setRevisionModeAndRestartLesson: React.MouseEventHandler<
    HTMLAnchorElement
  > = (event) => {
    setRevisionMode(false);
    restartLesson(event);
  };

  const lessonSubTitle =
    lesson?.subtitle?.length > 0 ? `: ${lessonSubTitleProp}` : "";

  const createNewCustomLesson = (
    <Link
      to="/lessons/custom/setup"
      onClick={stopLesson}
      className="link-button link-button-ghost table-cell mr1"
      role="button"
    >
      Edit custom lesson
    </Link>
  );

  const metadata = getLessonMetadata(lessonIndex, lesson.path);
  const overviewLink = metadata?.overview ? (
    <Link
      to={location.pathname + "overview"}
      className="link-button link-button-ghost table-cell"
    >
      Overview
    </Link>
  ) : undefined;

  if (lesson) {
    if (isFinished(lesson, currentPhraseID)) {
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
              restartLesson={setRevisionModeAndRestartLesson}
              ref={mainHeading}
            />
            <Finished
              chooseStudy={chooseStudy}
              currentLessonStrokes={currentLessonStrokes}
              disableUserSettings={disableUserSettings}
              toggleHideOtherSettings={toggleHideOtherSettings}
              metadata={metadata}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonTitle={lessonTitle}
              metWords={metWords}
              path={lesson?.path}
              restartLesson={setRevisionModeAndRestartLesson}
              reviseLesson={reviseLesson}
              settings={lesson.settings}
              startTime={startTime}
              timer={timer}
              revisionMode={revisionMode}
              updatePreset={updatePreset}
              updateRevisionMaterial={updateRevisionMaterial}
              totalNumberOfMatchedWords={totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={totalNumberOfMistypedWords}
              totalNumberOfHintedWords={totalNumberOfHintedWords}
              totalWordCount={totalWordCount}
            />
          </main>
        </DocumentTitle>
      );
    } else {
      return (
        <MainLessonView
          createNewCustomLesson={createNewCustomLesson}
          lessonSubTitle={lessonSubTitle}
          overviewLink={overviewLink}
          actualText={actualText}
          changeShowStrokesInLesson={changeShowStrokesInLesson}
          chooseStudy={chooseStudy}
          completedPhrases={completedPhrases}
          currentLessonStrokes={currentLessonStrokes}
          currentPhrase={currentPhrase}
          currentPhraseID={currentPhraseID}
          currentStroke={currentStroke}
          disableUserSettings={disableUserSettings}
          globalLookupDictionary={globalLookupDictionary}
          globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
          stopLesson={stopLesson}
          toggleHideOtherSettings={toggleHideOtherSettings}
          lesson={lesson}
          lessonTitle={lessonTitle}
          previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
          repetitionsRemaining={repetitionsRemaining}
          restartLesson={setRevisionModeAndRestartLesson}
          revisionMode={revisionMode}
          sayCurrentPhraseAgain={sayCurrentPhraseAgain}
          settings={settings}
          showStrokesInLesson={showStrokesInLesson}
          targetStrokeCount={targetStrokeCount}
          timer={timer}
          totalNumberOfHintedWords={totalNumberOfHintedWords}
          totalNumberOfLowExposuresSeen={totalNumberOfLowExposuresSeen}
          totalNumberOfMatchedWords={totalNumberOfMatchedWords}
          totalNumberOfMistypedWords={totalNumberOfMistypedWords}
          totalNumberOfNewWordsMet={totalNumberOfNewWordsMet}
          totalNumberOfRetainedWords={totalNumberOfRetainedWords}
          totalWordCount={totalWordCount}
          upcomingPhrases={upcomingPhrases}
          updatePreset={updatePreset}
          updateMarkup={updateRecentLessonsAndUpdateMarkup}
          focusTriggerInt={focusTriggerInt}
        />
      );
    }
  } else {
    return (
      <div>
        <h2 ref={mainHeading} tabIndex={-1}>
          That lesson is missing.
        </h2>
      </div>
    );
  }
};

export default Lesson;
