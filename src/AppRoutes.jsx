import React from "react";
import "react-tippy/dist/tippy.css";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import Loadable from "react-loadable";
import PageLoading from "./components/PageLoading";
import ErrorBoundary from "./components/ErrorBoundary";
import Lessons from "./pages/lessons/Lessons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnnouncerController from "./components/Announcer/AnnouncerController";
import Announcer from "./components/Announcer/Announcer";
import AppMethodsContext from "./states/legacy/AppMethodsContext";

const AsyncBreak = Loadable({
  loader: () => import("./pages/break/Break"),
  loading: PageLoading,
  delay: 300,
});

const AsyncContribute = Loadable({
  loader: () => import("./pages/contribute/Contribute"),
  loading: PageLoading,
  delay: 300,
});

const AsyncPageNotFound = Loadable({
  loader: () => import("./pages/pagenotfound/PageNotFound"),
  loading: PageLoading,
  delay: 300,
});

const AsyncProgress = Loadable({
  loader: () => import("./pages/progress/Progress"),
  loading: PageLoading,
  delay: 300,
});

const AsyncWriter = Loadable({
  loader: () => import("./pages/writer/Writer"),
  loading: PageLoading,
  delay: 300,
});

const AsyncFlashcards = Loadable({
  loader: () => import("./pages/lessons/flashcards/Flashcards"),
  loading: PageLoading,
  delay: 300,
});

const AsyncHome = Loadable({
  loader: () => import("./pages/home/Home"),
  loading: PageLoading,
  delay: 300,
});

const AsyncSupport = Loadable({
  loader: () => import("./pages/support/Support"),
  loading: PageLoading,
  delay: 300,
});

const AsyncLookup = Loadable({
  loader: () => import("./pages/lookup/Lookup"),
  loading: PageLoading,
  delay: 300,
});

const AsyncDictionaries = Loadable({
  loader: () => import("./pages/dictionaries/Dictionaries"),
  loading: PageLoading,
  delay: 300,
});

const AsyncGames = Loadable({
  loader: () => import("./pages/games/Games"),
  loading: PageLoading,
  delay: 300,
});

// Test PageLoadingPastDelay at Dictionaries route:
// import PageLoadingPastDelay from './components/PageLoadingPastDelay';
// const AsyncDictionaries = Loadable({
//   loader: () => import('./components/PageLoadingPastDelay'), // oh no!
//   loading: PageLoading,
// });

// Test PageLoadingFailed at Dictionaries route:
// import PageLoadingFailed from './components/PageLoadingFailed';
// const AsyncDictionaries = Loadable({
//   loader: () => import('./components/PageLoadingFailed'), // oh no!
//   loading: PageLoading,
// });

const AppRoutes = ({ appProps, appState, appMethods }) => {
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <AnnouncerController>
        <Announcer />
        <div>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <div>
                  <Header fullscreen={appState.fullscreen} />

                  <DocumentTitle title="Typey Type for Stenographers">
                    <AsyncHome />
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/support"
              render={() => (
                <div>
                  <Header fullscreen={appState.fullscreen} />

                  <DocumentTitle title={"Typey Type | About"}>
                    <ErrorBoundary>
                      <AsyncSupport />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/writer"
              render={(props) => (
                <div>
                  <Header fullscreen={appState.fullscreen} />

                  <DocumentTitle title={"Typey Type | Writer"}>
                    <ErrorBoundary>
                      <AsyncWriter
                        changeStenoLayout={appMethods.changeStenoLayout}
                        changeWriterInput={appMethods.changeWriterInput}
                        globalUserSettings={appState.globalUserSettings}
                        {...props}
                      />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/games"
              render={(props) => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Games"}>
                    <ErrorBoundary>
                      <AsyncGames
                        changeInputForKAOES={appMethods.changeInputForKAOES}
                        fetchAndSetupGlobalDict={
                          appMethods.appFetchAndSetupGlobalDict
                        }
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        metWords={appState.metWords}
                        startingMetWordsToday={appState.startingMetWordsToday}
                        updateMetWords={appMethods.updateMetWords}
                        updateMultipleMetWords={appMethods.updateMultipleMetWords}
                        globalUserSettings={appState.globalUserSettings}
                        userSettings={appState.userSettings}
                        {...props}
                      />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/break"
              render={() => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Take a break"}>
                    <ErrorBoundary>
                      <AsyncBreak />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/contribute"
              render={() => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Contribute"}>
                    <ErrorBoundary>
                      <AsyncContribute />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/progress"
              render={() => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Progress"}>
                    <ErrorBoundary>
                      <AsyncProgress
                        changeFlashcardCourseLevel={
                          appMethods.changeFlashcardCourseLevel
                        }
                        setPersonalPreferences={appMethods.setPersonalPreferences}
                        metWords={appState.metWords}
                        flashcardsMetWords={appState.flashcardsMetWords}
                        flashcardsProgress={appState.flashcardsProgress}
                        flashcardsNextLesson={appState.flashcardsNextLesson}
                        globalUserSettings={appState.globalUserSettings}
                        recommendationHistory={appState.recommendationHistory}
                        recommendedNextLesson={appState.recommendedNextLesson}
                        lessonsProgress={appState.lessonsProgress}
                        lessonIndex={appState.lessonIndex}
                        recentLessonHistory={appState.recentLessons.history}
                        startingMetWordsToday={appState.startingMetWordsToday}
                        updateFlashcardsRecommendation={
                          appMethods.updateFlashcardsRecommendation
                        }
                        updateRecommendationHistory={
                          appMethods.updateRecommendationHistory
                        }
                        updateStartingMetWordsAndCounts={
                          appMethods.updateStartingMetWordsAndCounts
                        }
                        updateUserGoals={appMethods.updateUserGoals}
                        updateUserGoalsUnveiled={
                          appMethods.updateUserGoalsUnveiled
                        }
                        dismissBackupBanner={appMethods.dismissBackupBanner}
                        userGoals={appState.userGoals}
                        userSettings={appState.userSettings}
                        oldWordsGoalUnveiled={appState.oldWordsGoalUnveiled}
                        newWordsGoalUnveiled={appState.newWordsGoalUnveiled}
                        yourSeenWordCount={appState.yourSeenWordCount}
                        yourMemorisedWordCount={appState.yourMemorisedWordCount}
                      />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/flashcards"
              render={() => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Flashcards"}>
                    <AsyncFlashcards
                      changeFullscreen={appMethods.changeFullscreen}
                      fetchAndSetupGlobalDict={
                        appMethods.appFetchAndSetupGlobalDict
                      }
                      flashcardsMetWords={appState.flashcardsMetWords}
                      flashcardsProgress={appState.flashcardsProgress}
                      fullscreen={appState.fullscreen}
                      globalLookupDictionary={appState.globalLookupDictionary}
                      globalLookupDictionaryLoaded={
                        appState.globalLookupDictionaryLoaded
                      }
                      globalUserSettings={appState.globalUserSettings}
                      lessonpath="flashcards"
                      locationpathname={appProps.location.pathname}
                      personalDictionaries={appState.personalDictionaries}
                      stenoHintsOnTheFly={appProps.stenohintsonthefly}
                      updateFlashcardsMetWords={
                        appMethods.updateFlashcardsMetWords
                      }
                      updateFlashcardsProgress={
                        appMethods.updateFlashcardsProgress
                      }
                      updateGlobalLookupDictionary={
                        appMethods.updateGlobalLookupDictionary
                      }
                      updatePersonalDictionaries={
                        appMethods.updatePersonalDictionaries
                      }
                      userSettings={appState.userSettings}
                    />
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/lookup"
              render={(props) => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Lookup"}>
                    <ErrorBoundary>
                      <AsyncLookup
                        fetchAndSetupGlobalDict={
                          appMethods.appFetchAndSetupGlobalDict
                        }
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        globalUserSettings={appState.globalUserSettings}
                        lookupTerm={appState.lookupTerm}
                        setCustomLessonContent={appMethods.setCustomLessonContent}
                        userSettings={appState.userSettings}
                        {...props}
                      />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/dictionaries"
              render={(props) => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Dictionaries"}>
                    <ErrorBoundary>
                      <AsyncDictionaries
                        setDictionaryIndex={appMethods.setDictionaryIndex}
                        fetchAndSetupGlobalDict={
                          appMethods.appFetchAndSetupGlobalDict
                        }
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        globalUserSettings={appState.globalUserSettings}
                        stenohintsonthefly={appProps.stenohintsonthefly}
                        toggleExperiment={appMethods.toggleExperiment}
                        updateGlobalLookupDictionary={
                          appMethods.updateGlobalLookupDictionary
                        }
                        updatePersonalDictionaries={
                          appMethods.updatePersonalDictionaries
                        }
                        userSettings={appState.userSettings}
                        dictionaryIndex={appState.dictionaryIndex}
                        {...props}
                      />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              path="/lessons"
              render={(props) => (
                <div>
                  <Header fullscreen={appState.fullscreen} />
                  <DocumentTitle title={"Typey Type | Lessons"}>
                    <ErrorBoundary>
                      <Lessons
                        generateCustomLesson={appMethods.generateCustomLesson}
                        customLesson={appState.customLesson}
                        customiseLesson={appMethods.customiseLesson}
                        customLessonMaterial={appState.customLessonMaterial}
                        customLessonMaterialValidationState={
                          appState.customLessonMaterialValidationState
                        }
                        customLessonMaterialValidationMessages={
                          appState.customLessonMaterialValidationMessages
                        }
                        updateFlashcardsMetWords={
                          appMethods.updateFlashcardsMetWords
                        }
                        updateFlashcardsProgress={
                          appMethods.updateFlashcardsProgress
                        }
                        flashcardsMetWords={appState.flashcardsMetWords}
                        flashcardsProgress={appState.flashcardsProgress}
                        fetchAndSetupGlobalDict={
                          appMethods.appFetchAndSetupGlobalDict
                        }
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        globalUserSettings={appState.globalUserSettings}
                        personalDictionaries={appState.personalDictionaries}
                        updateGlobalLookupDictionary={
                          appMethods.updateGlobalLookupDictionary
                        }
                        updatePersonalDictionaries={
                          appMethods.updatePersonalDictionaries
                        }
                        lessonsProgress={appState.lessonsProgress}
                        lessonNotFound={appState.lessonNotFound}
                        fullscreen={appState.fullscreen}
                        changeFullscreen={appMethods.changeFullscreen}
                        restartLesson={appMethods.restartLesson}
                        reviseLesson={appMethods.reviseLesson}
                        lessonSubTitle={appState.lesson.subtitle}
                        lessonTitle={appState.lesson.title}
                        path={appState.lesson.path}
                        handleStopLesson={appMethods.handleStopLesson}
                        lessonIndex={appState.lessonIndex}
                        lesson={appState.lesson}
                        handleLesson={appMethods.handleLesson}
                        actualText={appState.actualText}
                        changeShowStrokesInLesson={
                          appMethods.changeShowStrokesInLesson
                        }
                        changeSpacePlacementUserSetting={
                          appMethods.changeSpacePlacementUserSetting
                        }
                        changeStenoLayout={appMethods.changeStenoLayout}
                        changeUserSetting={appMethods.changeUserSetting}
                        changeVoiceUserSetting={appMethods.changeVoiceUserSetting}
                        chooseStudy={appMethods.chooseStudy}
                        completedPhrases={appProps.completedMaterial}
                        createCustomLesson={appMethods.createCustomLesson}
                        currentLessonStrokes={appState.currentLessonStrokes}
                        currentPhraseID={appState.currentPhraseID}
                        currentPhrase={
                          appProps.presentedMaterialCurrentItem.phrase
                        }
                        currentStroke={
                          appProps.presentedMaterialCurrentItem.stroke
                        }
                        disableUserSettings={appState.disableUserSettings}
                        handleBeatsPerMinute={appMethods.handleBeatsPerMinute}
                        handleDiagramSize={appMethods.handleDiagramSize}
                        handleLimitWordsChange={appMethods.handleLimitWordsChange}
                        handleStartFromWordChange={
                          appMethods.handleStartFromWordChange
                        }
                        handleRepetitionsChange={
                          appMethods.handleRepetitionsChange
                        }
                        handleUpcomingWordsLayout={
                          appMethods.handleUpcomingWordsLayout
                        }
                        toggleHideOtherSettings={
                          appMethods.toggleHideOtherSettings
                        }
                        metWords={appState.metWords}
                        previousCompletedPhraseAsTyped={
                          appState.previousCompletedPhraseAsTyped
                        }
                        recentLessonHistory={appState.recentLessons.history}
                        repetitionsRemaining={appState.repetitionsRemaining}
                        revisionMode={appState.revisionMode}
                        updateRevisionMaterial={appMethods.updateRevisionMaterial}
                        sayCurrentPhraseAgain={appMethods.sayCurrentPhraseAgain}
                        startFromWordOne={appMethods.startFromWordOne}
                        startTime={appState.startTime}
                        stenoHintsOnTheFly={appProps.stenohintsonthefly}
                        stopLesson={appMethods.stopLesson}
                        startCustomLesson={appMethods.startCustomLesson}
                        setUpProgressRevisionLesson={
                          appMethods.setUpProgressRevisionLesson
                        }
                        setupLesson={appMethods.setupLesson}
                        settings={appState.lesson.settings}
                        showStrokesInLesson={appState.showStrokesInLesson}
                        targetStrokeCount={appState.targetStrokeCount}
                        timer={appState.timer}
                        topSpeedPersonalBest={appState.topSpeedPersonalBest}
                        updateUserGoals={appState.updateUserGoals}
                        totalNumberOfMatchedWords={
                          appState.totalNumberOfMatchedWords
                        }
                        totalNumberOfNewWordsMet={
                          appState.totalNumberOfNewWordsMet
                        }
                        totalNumberOfLowExposuresSeen={
                          appState.totalNumberOfLowExposuresSeen
                        }
                        totalNumberOfRetainedWords={
                          appState.totalNumberOfRetainedWords
                        }
                        totalNumberOfMistypedWords={
                          appState.totalNumberOfMistypedWords
                        }
                        totalNumberOfHintedWords={
                          appState.totalNumberOfHintedWords
                        }
                        totalWordCount={
                          appProps.stateLesson.presentedMaterial.length
                        }
                        upcomingPhrases={appProps.upcomingMaterial}
                        updatePreset={appMethods.updatePreset}
                        updateMarkup={appMethods.updateMarkup}
                        updateTopSpeedPersonalBest={
                          appMethods.updateTopSpeedPersonalBest
                        }
                        userSettings={appState.userSettings}
                        {...props}
                      />
                    </ErrorBoundary>
                  </DocumentTitle>
                </div>
              )}
            />
            <Route
              render={(props) => (
                <div>
                  <DocumentTitle title={"Typey Type | Page not found"}>
                    <AsyncPageNotFound location={props.location} />
                  </DocumentTitle>
                </div>
              )}
            />
          </Switch>
        </div>
        <Footer fullscreen={appState.fullscreen} />
      </AnnouncerController>
    </AppMethodsContext.Provider>
  );
};

export default AppRoutes;
