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
  ComponentPropsWithoutRef<typeof AsyncCustomLessonGenerator>;

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

  return (
    <Suspense fallback={<PageLoading pastDelay={true} />}>
      <Routes>
        {[
          ":category/:subcategory/:lessonPath/*",
          "fundamentals/:lessonPath/*",
          "drills/:lessonPath/*",
        ].map((path) => (
          <Route key={path} path={path} element={<Lesson {...lessonProps} />} />
        ))}
        {["progress/", "progress/seen/", "progress/memorised/"].map((path) => (
          <Route
            key="ProgressLessons"
            path={path}
            element={<ProgressLesson {...lessonProps} />}
          />
        ))}
        <Route
          path={"custom/setup"}
          element={
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
          }
        />
        <Route
          path={"custom/generator"}
          element={
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
          }
        />
        <Route path={"custom"} element={<CustomLesson {...lessonProps} />} />
        <Route path={"flashcards"} element={<Lesson {...lessonProps} />} />
        <Route
          path={"/"}
          element={
            <Suspense fallback={<PageLoading pastDelay={true} />}>
              <LessonsIndex customLesson={customLesson} />
            </Suspense>
          }
        />
        <Route path={"*"} element={<LessonNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Lessons;
