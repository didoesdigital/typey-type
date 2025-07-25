import React, { ComponentPropsWithoutRef, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Lesson from "./Lesson";
import LessonsIndex from "./LessonsIndex";
import CustomLessonSetup from "./custom/CustomLessonSetup";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";
import ProgressLesson from "pages/lessons/ProgressLesson";
import CustomLesson from "pages/lessons/CustomLesson";
import LessonNotFound from "pages/lessons/LessonNotFound";

export type LessonsRoutingProps = ComponentPropsWithoutRef<typeof Lesson> &
  ComponentPropsWithoutRef<typeof CustomLessonSetup> &
  ComponentPropsWithoutRef<typeof AsyncCustomLessonGenerator> & {
    lessonNotFound: boolean;
  };

const AsyncCustomLessonGenerator = Loadable({
  loader: () => import("./custom/CustomLessonGenerator"),
  loading: PageLoading,
  delay: 300,
});

const Lessons = ({
  customLesson,
  customLessonMaterial,
  customLessonMaterialValidationMessages,
  customLessonMaterialValidationState,
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
  lessonNotFound,
  lessonSubTitle,
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
}: LessonsRoutingProps) => {
  const lessonProps = {
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
    lessonNotFound,
    lessonSubTitle,
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
  };

  // This would happen if we try to load a specific lesson's data and the
  // route is sensible but we fail to fetch valid lesson text:
  if (lessonNotFound) {
    return <LessonNotFound />;
  }

  return (
    <Suspense fallback={<PageLoading pastDelay={true} />}>
      <Routes>
        <Route
          path={[
            `/lessons/:category/:subcategory/:lessonPath/flashcards`,
            `/lessons/fundamentals/:lessonPath/flashcards`,
            `/lessons/drills/:lessonPath/flashcards`,
            `/lessons/:category/:subcategory/:lessonPath`,
            `/lessons/fundamentals/:lessonPath`,
            `/lessons/drills/:lessonPath`,
          ]}
        >
          <Lesson {...lessonProps} />
        </Route>
        <Route
          exact={true}
          path={[
            `/lessons/progress/`,
            `/lessons/progress/seen/`,
            `/lessons/progress/memorised/`,
          ]}
        >
          <ProgressLesson {...lessonProps} />
        </Route>
        <Route exact={true} path={`/lessons/custom/setup`}>
          <DocumentTitle title="Typey Type | Create a custom lesson">
            <CustomLessonSetup
              customLessonMaterial={customLessonMaterial}
              customLessonMaterialValidationMessages={
                customLessonMaterialValidationMessages
              }
              customLessonMaterialValidationState={
                customLessonMaterialValidationState
              }
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            />
          </DocumentTitle>
        </Route>
        <Route exact={true} path={`/lessons/custom/generator`}>
          <DocumentTitle title="Typey Type | Lesson generator">
            <ErrorBoundary>
              <AsyncCustomLessonGenerator
                customLesson={customLesson}
                customLessonMaterialValidationState={
                  customLessonMaterialValidationState
                }
                globalLookupDictionary={globalLookupDictionary}
              />
            </ErrorBoundary>
          </DocumentTitle>
        </Route>
        <Route exact={true} path={`/lessons/custom`}>
          <CustomLesson {...lessonProps} />
        </Route>
        <Route exact={true} path={`/lessons/flashcards`}>
          <Lesson {...lessonProps} />
        </Route>
        <Route exact={true} path={`/lessons/:notFound`}>
          <LessonNotFound />
        </Route>
        <Route exact={true} path={"/lessons"}>
          <Suspense fallback={<PageLoading pastDelay={true} />}>
            <LessonsIndex customLesson={customLesson} />
          </Suspense>
        </Route>
        <Route path={"*"}>
          <LessonNotFound />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Lessons;
