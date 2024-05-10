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
import setCustomLessonContent from "./pages/lessons/utilities/setCustomLessonContent";
import customiseLesson from "./pages/lessons/utilities/customiseLesson";
import generateCustomLesson from "./pages/lessons/custom/generator/utilities/generateCustomLesson";
import updateMultipleMetWords from "./pages/games/KPOES/updateMultipleMetWords";
import {
  changeFlashcardCourseLevel,
  changeFullscreen
} from "./pages/lessons/components/UserSettings/updateFlashcardSetting";
import {
  changeShowScoresWhileTyping,
  changeShowStrokesAs,
  changeShowStrokesAsList,
  changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting,
  changeSpacePlacementUserSetting,
  changeStenoLayout,
  changeUserSetting,
  changeVoiceUserSetting,
  chooseStudy,
  handleBeatsPerMinute,
  handleDiagramSize,
  handleLimitWordsChange,
  handleRepetitionsChange,
  handleStartFromWordChange,
  handleUpcomingWordsLayout, toggleHideOtherSettings, updatePreset
} from "./pages/lessons/components/UserSettings/updateUserSetting";
import {
  changeShowStrokesInLesson,
  updateRevisionMaterial
} from "./pages/lessons/components/UserSettings/updateLessonSetting";
import {
  changeInputForKAOES,
  changeWriterInput, dismissBackupBanner, toggleExperiment
} from "./pages/lessons/components/UserSettings/updateGlobalUserSetting";
import fetchAndSetupGlobalDict from "./utils/app/fetchAndSetupGlobalDict";
import App from "./App";
import {
  Experiments,
  MaterialItem,
  MaterialText,
  Lesson,
  GlobalUserSettings,
  UserSettings,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
  CurrentLessonStrokes, ActualTypedText, PersonalDictionaryNameAndContents
} from "./types";
import { Location } from "history";
import { CustomLessonMaterialValidationState } from "./pages/lessons/custom/components/CustomLessonIntro";
import { RecentLessonHistoryItem } from "./pages/progress/components/RecentLessons";

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

type Props = {
  appProps: AppProps;
  appState: AppStateForDescendants;
  appMethods: AppMethods;
};

type AppProps = {
  location: Location,
  completedMaterial: MaterialText[],
  presentedMaterialCurrentItem: MaterialItem,
  stateLesson: Lesson,
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">,
  upcomingMaterial: unknown,
}
/**
 * This is based on state initialization in App.tsx.
 * This type only reflects App's state that is needed by descendants.
 */
type AppStateForDescendants = {
// currentPhraseAttempts: [],
  currentPhraseID: number,
  currentLessonStrokes: CurrentLessonStrokes[],
  customLessonMaterial: string,
  customLessonMaterialValidationMessages: string[],
  customLessonMaterialValidationState: CustomLessonMaterialValidationState,
  customLesson: Lesson,
  actualText: ActualTypedText,
  dictionaryIndex: unknown, // TODO: type like [{
//   "title": "Dictionary",
//   "author": "Typey Type",
//   "category": "Typey Type",
//   "tagline": "Typey Type’s dictionary is a version of the Plover di  ctionary with misstrokes removed for the top 10,000 words.",
//   "subcategory": "",
//   "link": "/support#typey-type-dictionary",
//   "path": "/dictionaries/typey-type/typey-type.json"
// }],
  flashcardsMetWords: unknown, // TODO: type like {
//   "the": {
//     phrase: "the",
//     stroke: "-T",
//     rung: 0,
//   },
// },
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig,
  globalLookupDictionaryLoaded: boolean,
  lessonNotFound: boolean,
  lessonsProgress: unknown,
  flashcardsProgress: unknown,
  flashcardsNextLesson: unknown, // TODO: type like {
//   lastSeen: Date.now(), // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
//   linkTitle: "Loading…",
//   linkText: "Study",
//   link: process.env.PUBLIC_URL + "/lessons/drills/prefixes/flashcards"// + "?recommended=true&" + PARAMS.practiceParams
// },
// flashcardsCourseIndex: 0,
  fullscreen: boolean,
  globalUserSettings: GlobalUserSettings,
// isPloverDictionaryLoaded: false,
// isGlobalLookupDictionaryLoaded: false,
  lookupTerm: string,
  recommendationHistory: unknown // TODO: type like { currentStep: null },
  personalDictionaries: PersonalDictionaryNameAndContents[],
  previousCompletedPhraseAsTyped: ActualTypedText,
  repetitionsRemaining: number,
  startTime: Date,
  showStrokesInLesson: boolean,
  targetStrokeCount: number,
  timer: number,
  topSpeedPersonalBest: number,
  totalNumberOfMatchedWords: number,
// numberOfMatchedChars: 0,
// totalNumberOfMatchedChars: 0,
  totalNumberOfNewWordsMet: number,
  totalNumberOfLowExposuresSeen: number,
  totalNumberOfRetainedWords: number,
  totalNumberOfMistypedWords: number,
  totalNumberOfHintedWords: number,
  disableUserSettings: boolean,
  metWords: MetWords,
  revisionMode: boolean,
  oldWordsGoalUnveiled: boolean,
  newWordsGoalUnveiled: boolean,
  userGoals: unknown // TODO type like {
//   newWords: 15,
//   oldWords: 50
// },
  userSettings: UserSettings,
  lesson: Lesson,
  lessonIndex: unknown, // TODO type like {
//   "title": "Steno",
//   "subtitle": "",
//   "category": "Drills",
//   "subcategory": "",
//   "path": process.env.PUBLIC_URL + "/drills/steno/lesson.txt"
// }],
  recentLessons: { history: RecentLessonHistoryItem[] },
  recommendedNextLesson: unknown, // TODO type like {
//   studyType: "practice",
//   limitNumberOfWords: 50,
//   repetitions: 1,
//   linkTitle: "Top 10000 Project Gutenberg words",
//   linkText: "Practice 150 words from Top 10000 Project Gutenberg wo  rds",
// link: process.env.PUBLIC_URL + "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" + PARAMS.practiceParams
// },
// revisionMaterial: [
// ],
  startingMetWordsToday: MetWords,
  yourSeenWordCount: number,
  yourMemorisedWordCount: number
}
type AppMethods = {
  appFetchAndSetupGlobalDict: typeof fetchAndSetupGlobalDict,
  setCustomLessonContent: typeof setCustomLessonContent,
  customiseLesson: typeof customiseLesson,
  generateCustomLesson: typeof generateCustomLesson,
  updateMultipleMetWords: typeof updateMultipleMetWords,
  changeFlashcardCourseLevel: typeof changeFlashcardCourseLevel,
  changeFullscreen: typeof changeFullscreen,
  changeShowScoresWhileTyping: typeof changeShowScoresWhileTyping,
  changeShowStrokesAs: typeof changeShowStrokesAs,
  changeShowStrokesAsList: typeof changeShowStrokesAsList,
  changeShowStrokesInLesson: typeof changeShowStrokesInLesson,
  changeShowStrokesOnMisstroke: typeof changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting: typeof changeSortOrderUserSetting,
  changeSpacePlacementUserSetting: typeof changeSpacePlacementUserSetting,
  changeStenoLayout: typeof changeStenoLayout,
  changeUserSetting: typeof changeUserSetting,
  changeVoiceUserSetting: typeof changeVoiceUserSetting,
  changeInputForKAOES: typeof changeInputForKAOES,
  changeWriterInput: typeof changeWriterInput,
  chooseStudy: typeof chooseStudy,
  createCustomLesson: typeof App.prototype.createCustomLesson,
  handleBeatsPerMinute: typeof handleBeatsPerMinute,
  handleDiagramSize: typeof handleDiagramSize,
  handleLesson: typeof App.prototype.handleLesson,
  handleLimitWordsChange: typeof handleLimitWordsChange,
  handleRepetitionsChange: typeof handleRepetitionsChange,
  handleStartFromWordChange: typeof handleStartFromWordChange,
  handleStopLesson: typeof App.prototype.handleStopLesson,
  handleUpcomingWordsLayout: typeof handleUpcomingWordsLayout,
  toggleHideOtherSettings: typeof toggleHideOtherSettings,
  restartLesson: typeof App.prototype.restartLesson,
  reviseLesson: typeof App.prototype.reviseLesson,
  sayCurrentPhraseAgain: typeof App.prototype.sayCurrentPhraseAgain,
  setDictionaryIndex: typeof App.prototype.setDictionaryIndex,
  setPersonalPreferences: typeof App.prototype.setPersonalPreferences,
  setUpProgressRevisionLesson: typeof App.prototype.setUpProgressRevisionLesson,
  setupLesson: typeof App.prototype.setupLesson,
  startCustomLesson: typeof App.prototype.startCustomLesson,
  startFromWordOne: typeof App.prototype.startFromWordOne,
  stopLesson: typeof App.prototype.stopLesson,
  toggleExperiment: typeof toggleExperiment,
  dismissBackupBanner: typeof dismissBackupBanner,
  updateFlashcardsMetWords: typeof App.prototype.updateFlashcardsMetWords,
  updateFlashcardsProgress: typeof App.prototype.updateFlashcardsProgress,
  updateFlashcardsRecommendation: typeof App.prototype.updateFlashcardsRecommendation,
  updateGlobalLookupDictionary: typeof App.prototype.updateGlobalLookupDictionary,
  updateMarkup: typeof App.prototype.updateMarkup,
  updateMetWords: typeof App.prototype.updateMetWords,
  updatePersonalDictionaries: typeof App.prototype.updatePersonalDictionaries,
  updatePreset: typeof updatePreset,
  updateRecommendationHistory: typeof App.prototype.updateRecommendationHistory,
  updateRevisionMaterial: typeof updateRevisionMaterial,
  updateStartingMetWordsAndCounts: typeof App.prototype.updateStartingMetWordsAndCounts,
  updateTopSpeedPersonalBest: typeof App.prototype.updateTopSpeedPersonalBest,
  updateUserGoals: typeof App.prototype.updateUserGoals,
  updateUserGoalsUnveiled: typeof App.prototype.updateUserGoalsUnveiled,
}
const AppRoutes: React.FC<Props> = ({ appProps, appState, appMethods }) => {
  return (
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
                      userSettings={appState.userSettings}
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
                      lessonNotFound={appState.lessonNotFound}
                      fullscreen={appState.fullscreen}
                      changeFullscreen={appMethods.changeFullscreen}
                      restartLesson={appMethods.restartLesson}
                      reviseLesson={appMethods.reviseLesson}
                      lessonSubTitle={appState.lesson.subtitle}
                      lessonTitle={appState.lesson.title}
                      handleStopLesson={appMethods.handleStopLesson}
                      lessonIndex={appState.lessonIndex}
                      lesson={appState.lesson}
                      handleLesson={appMethods.handleLesson}
                      actualText={appState.actualText}
                      changeShowStrokesInLesson={
                        appMethods.changeShowStrokesInLesson
                      }
                      changeShowStrokesOnMisstroke={
                        appMethods.changeShowStrokesOnMisstroke
                      }
                      changeSortOrderUserSetting={
                        appMethods.changeSortOrderUserSetting
                      }
                      changeSpacePlacementUserSetting={
                        appMethods.changeSpacePlacementUserSetting
                      }
                      changeStenoLayout={appMethods.changeStenoLayout}
                      changeShowScoresWhileTyping={
                        appMethods.changeShowScoresWhileTyping
                      }
                      changeShowStrokesAs={appMethods.changeShowStrokesAs}
                      changeShowStrokesAsList={
                        appMethods.changeShowStrokesAsList
                      }
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
                      // TODO: typo of appMethods? Anyway Lesson seems to not use it. Remove?
                      // updateUserGoals={appState.updateUserGoals}
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
  );
};

export default AppRoutes;
