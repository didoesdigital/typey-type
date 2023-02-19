import React from "react";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Lesson from "./Lesson";
import LessonsIndex from "./LessonsIndex";
import CustomLessonSetup from "./custom/CustomLessonSetup";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";

type LessonsRoutingProps = {
  customLesson: any;
  customiseLesson: () => void;
  generateCustomLesson: any;
  handleLesson: any;
  lesson: any;
  lessonIndex: any;
  match: any;
  setAnnouncementMessage: any;
  stopLesson: any;
  [key: string]: any;
};

const AsyncCustomLessonGenerator = Loadable({
  loader: () => import("./custom/CustomLessonGenerator"),
  loading: PageLoading,
  delay: 300,
});

const Lessons = ({
  createCustomLesson,
  customLesson,
  customLessonMaterial,
  customLessonMaterialValidationMessages,
  customLessonMaterialValidationState,
  customiseLesson,
  fetchAndSetupGlobalDict,
  generateCustomLesson,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  handleLesson,
  lesson,
  lessonIndex,
  match,
  personalDictionaries,
  setAnnouncementMessage,
  stopLesson,
  updateFlashcardsMetWords,
  updateFlashcardsProgress,
  changeFullscreen,
  flashcardsMetWords,
  ...lessonProps
}: LessonsRoutingProps) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/:category/:subcategory/:lessonPath/flashcards`}
        render={(props) => (
          <Lesson
            changeFullscreen={changeFullscreen}
            customLesson={customLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            flashcardsMetWords={flashcardsMetWords}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            updateFlashcardsProgress={updateFlashcardsProgress}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/fundamentals/:lessonPath/flashcards`}
        render={(props) => (
          <Lesson
            changeFullscreen={changeFullscreen}
            customLesson={customLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            flashcardsMetWords={flashcardsMetWords}
            fullscreen={lessonProps.fullscreen}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={lessonProps.globalUserSettings}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            updateFlashcardsProgress={updateFlashcardsProgress}
            userSettings={lessonProps.userSettings}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/drills/:lessonPath/flashcards`}
        render={(props) => (
          <Lesson
            changeFullscreen={changeFullscreen}
            customLesson={customLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            flashcardsMetWords={flashcardsMetWords}
            fullscreen={lessonProps.fullscreen}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={lessonProps.globalUserSettings}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            updateFlashcardsProgress={updateFlashcardsProgress}
            userSettings={lessonProps.userSettings}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/:category/:subcategory/:lessonPath`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            customiseLesson={customiseLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            personalDictionaries={personalDictionaries}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/fundamentals/:lessonPath`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            customiseLesson={customiseLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            personalDictionaries={personalDictionaries}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/drills/:lessonPath`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            customiseLesson={customiseLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            personalDictionaries={personalDictionaries}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/progress/`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            customiseLesson={customiseLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/progress/seen/`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            customiseLesson={customiseLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/progress/memorised/`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            customiseLesson={customiseLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
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
              createCustomLesson={createCustomLesson}
              customLessonMaterial={customLessonMaterial}
              customLessonMaterialValidationMessages={
                customLessonMaterialValidationMessages
              }
              customLessonMaterialValidationState={
                customLessonMaterialValidationState
              }
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              personalDictionaries={personalDictionaries}
              setAnnouncementMessage={setAnnouncementMessage}
              {...lessonProps}
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
                fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
                generateCustomLesson={generateCustomLesson}
                globalLookupDictionary={globalLookupDictionary}
                personalDictionaries={personalDictionaries}
                {...lessonProps}
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
            customLesson={customLesson}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/flashcards`}
        render={(props) => (
          <Lesson
            changeFullscreen={changeFullscreen}
            customLesson={customLesson}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            flashcardsMetWords={flashcardsMetWords}
            fullscreen={lessonProps.fullscreen}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={lessonProps.globalUserSettings}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            personalDictionaries={personalDictionaries}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            updateFlashcardsMetWords={updateFlashcardsMetWords}
            updateFlashcardsProgress={updateFlashcardsProgress}
            userSettings={lessonProps.userSettings}
            {...props}
          />
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/:notFound`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonNotFound={true}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            {...props}
          />
        )}
      />
      <Route
        exact={true}
        path={match.url}
        render={() => (
          <LessonsIndex
            lessonIndex={lessonIndex}
            customLesson={customLesson}
            match={match}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
          />
        )}
      />
    </Switch>
  );
};

export default Lessons;
