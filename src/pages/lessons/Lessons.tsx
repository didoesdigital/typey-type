import React, { ComponentPropsWithoutRef, Suspense } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
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

export type LessonsRoutingProps = RouteComponentProps &
  ComponentPropsWithoutRef<typeof Lesson> &
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
  match,
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
      <Switch>
        <Route
          path={`${match.url}/:category/:subcategory/:lessonPath/flashcards`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          path={`${match.url}/fundamentals/:lessonPath/flashcards`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          path={`${match.url}/drills/:lessonPath/flashcards`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          path={`${match.url}/:category/:subcategory/:lessonPath`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          path={`${match.url}/fundamentals/:lessonPath`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          path={`${match.url}/drills/:lessonPath`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          exact={true}
          path={[
            `${match.url}/progress/`,
            `${match.url}/progress/seen/`,
            `${match.url}/progress/memorised/`,
          ]}
          render={() => <ProgressLesson {...lessonProps} />}
        />
        <Route
          exact={true}
          path={`${match.url}/custom/setup`}
          render={() => (
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
          )}
        />
        <Route exact={true} path={`${match.url}/custom/generator`}>
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
        <Route
          exact={true}
          path={`${match.url}/custom`}
          render={() => <CustomLesson {...lessonProps} />}
        />
        <Route
          exact={true}
          path={`${match.url}/flashcards`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/:notFound`}
          render={() => (
            <Lesson
              actualText={actualText}
              completedPhrases={completedPhrases}
              currentLessonStrokes={currentLessonStrokes}
              currentPhrase={currentPhrase}
              currentPhraseID={currentPhraseID}
              currentStroke={currentStroke}
              disableUserSettings={disableUserSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              lesson={lesson}
              lessonLength={lessonLength}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
              repetitionsRemaining={repetitionsRemaining}
              settings={settings}
              showStrokesInLesson={showStrokesInLesson}
              startTime={startTime}
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
              focusTriggerInt={focusTriggerInt}
            />
          )}
        />
        <Route exact={true} path={match.url}>
          <Suspense fallback={<PageLoading pastDelay={true} />}>
            <LessonsIndex customLesson={customLesson} />
          </Suspense>
        </Route>
        <Route path={"*"}>
          <LessonNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Lessons;
