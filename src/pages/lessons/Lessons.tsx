import React from "react";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import Lesson from "./Lesson";
import LessonsIndex from "./LessonsIndex";
import CustomLessonSetup from "./custom/CustomLessonSetup";

type LessonsRoutingProps = {
  customLesson: any;
  handleLesson: any;
  lesson: any;
  lessonIndex: any;
  match: any;
  setAnnouncementMessage: any;
  stopLesson: any;
  [key: string]: any;
};

const Lessons = ({
  createCustomLesson,
  customLesson,
  customLessonMaterial,
  customLessonMaterialValidationMessages,
  customLessonMaterialValidationState,
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  handleLesson,
  lesson,
  lessonIndex,
  match,
  personalDictionaries,
  setAnnouncementMessage,
  stopLesson,
  ...lessonProps
}: LessonsRoutingProps) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/:category/:subcategory/:lessonPath/flashcards`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/:category/:subcategory/:lessonPath`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/fundamentals/:lessonPath/flashcards`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            {...lessonProps}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/drills/:lessonPath/flashcards`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
        path={`${match.url}/custom`}
        render={(props) => (
          <Lesson
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
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
            customLesson={customLesson}
            handleLesson={handleLesson}
            lesson={lesson}
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            {...lessonProps}
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
            lessonIndex={lessonIndex}
            setAnnouncementMessage={setAnnouncementMessage}
            stopLesson={stopLesson}
            {...lessonProps}
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
