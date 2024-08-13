import React, { ComponentPropsWithoutRef, Suspense } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Lesson from "./Lesson";
import LessonsIndex from "./LessonsIndex";
import CustomLessonSetup from "./custom/CustomLessonSetup";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type LessonsRoutingProps = Optional<
  RouteComponentProps &
    ComponentPropsWithoutRef<typeof Lesson> &
    ComponentPropsWithoutRef<typeof CustomLessonSetup> &
    ComponentPropsWithoutRef<typeof AsyncCustomLessonGenerator>,
  // TODO: check this. it's not passed from parent
  "lessonLength"
>;

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
}: LessonsRoutingProps) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route
          path={`${match.url}/:category/:subcategory/:lessonPath/flashcards`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/fundamentals/:lessonPath/flashcards`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/drills/:lessonPath/flashcards`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/:category/:subcategory/:lessonPath`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/fundamentals/:lessonPath`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/drills/:lessonPath`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/progress/`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/progress/seen/`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/progress/memorised/`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/custom/setup`}
          render={(props) => (
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
                {...props}
              />
            </DocumentTitle>
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/custom/generator`}
          render={() => (
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
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/custom`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/flashcards`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/:notFound`}
          render={(props) => (
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
              // @ts-expect-error
              lessonLength={lessonLength}
              lessonNotFound={lessonNotFound}
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
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={match.url}
          render={() => (
            <Suspense fallback={<PageLoading />}>
              <LessonsIndex customLesson={customLesson} />
            </Suspense>
          )}
        />
      </Switch>
    </Suspense>
  );
};

export default Lessons;
