import React, { useEffect, useRef } from "react";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import LessonOverview from "./LessonOverview";
import LessonSubheader from "./components/LessonSubheader";
import Finished from "./components/Finished";
import Flashcards from "./flashcards/Flashcards";
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
import LessonNotFound from "pages/lessons/LessonNotFound";

const isFinished = (lesson: LessonType, currentPhraseID: number) =>
  currentPhraseID === lesson?.presentedMaterial?.length || 0;

const isFlashcards = (pathname: string) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/flashcards");

const isOverview = (pathname: string) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/overview");

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
  personalDictionaries,
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
}: LessonProps) => {
  const location = useLocation();
  const history = useHistory();

  const {
    appFetchAndSetupGlobalDict,
    customiseLesson,
    handleLesson,
    changeShowStrokesInLesson,
    restartLesson,
    reviseLesson,
    sayCurrentPhraseAgain,
    setupLesson,
    stopLesson,
    updateGlobalLookupDictionary,
    updateMarkup,
    updatePersonalDictionaries,
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
      if (isOverview(location.pathname)) {
        // do nothing
      } else if (isFlashcards(location.pathname)) {
        // do nothing
      } else if (
        lesson.path !== location.pathname + "lesson.txt" &&
        location.pathname.startsWith("/lessons")
      ) {
        handleLesson(process.env.PUBLIC_URL + location.pathname + "lesson.txt");
      }

      const parsedParams = queryString.parse(location.search);

      if (
        Object.keys(parsedParams).some((param) => {
          return userSettings.hasOwnProperty(param);
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
        history.replace({ search: "", hash: history.location.hash });
      }
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [handleLesson, lesson.path, location.pathname, location.search, setupLesson, userSettings]);

  // Load lesson file and start lesson!
  useEffect(() => {
    if (
      !isFlashcards(location.pathname) &&
      !isOverview(location.pathname) &&
      location.pathname.startsWith("/lessons")
    ) {
      handleLesson(process.env.PUBLIC_URL + location.pathname + "lesson.txt");
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  // }, [location.pathname, handleLesson]);

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

  function stopAndCustomiseLesson() {
    stopLesson();
    customiseLesson();
  }

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
      onClick={stopAndCustomiseLesson.bind(this)}
      className="link-button link-button-ghost table-cell mr1"
      role="button"
    >
      Customise lesson
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
    if (
      isFinished(lesson, currentPhraseID) &&
      !isOverview(location.pathname) &&
      !isFlashcards(location.pathname)
    ) {
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
        <Switch>
          <Route path={`/lessons/:category/:subcategory?/:lessonPath/overview`}>
            <div>
              <ErrorBoundary>
                <DocumentTitle title={"Typey Type | Lesson overview"}>
                  <LessonOverview
                    lessonIndex={lessonIndex}
                    lessonMetadata={metadata}
                    lessonPath={location.pathname.replace("overview", "")}
                    lessonTxtPath={location.pathname.replace(
                      "overview",
                      "lesson.txt"
                    )}
                    lessonTitle={lesson.title}
                  />
                </DocumentTitle>
              </ErrorBoundary>
            </div>
          </Route>
          <Route
            path={`/lessons/:category/:subcategory?/:lessonPath/flashcards`}
          >
            <div>
              <DocumentTitle title={"Typey Type | Flashcards"}>
                <Flashcards
                  fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
                  globalLookupDictionary={globalLookupDictionary}
                  globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                  personalDictionaries={personalDictionaries}
                  updateGlobalLookupDictionary={updateGlobalLookupDictionary}
                  updatePersonalDictionaries={updatePersonalDictionaries}
                  lessonpath={
                    process.env.PUBLIC_URL +
                    location.pathname.replace(/flashcards/, "") +
                    "lesson.txt"
                  }
                  locationpathname={location.pathname}
                />
              </DocumentTitle>
            </div>
          </Route>
          <Route exact={true} path={`${location.pathname}`}>
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
              lessonLength={lessonLength}
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
          </Route>
          <Route path={"*"}>
            <LessonNotFound />
          </Route>
        </Switch>
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
