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
import {
  Experiments,
  MaterialItem,
  MaterialText,
  Lesson,
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

type Props = {
  appProps: AppProps;
  appState: AppStateForDescendants;
};

type AppProps = {
  location: Location,
  completedMaterial: MaterialText[],
  presentedMaterialCurrentItem: MaterialItem,
  stateLesson: Lesson,
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">,
  upcomingMaterial: unknown,
}

const AppRoutes: React.FC<Props> = ({ appProps, appState  }) => {
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
                      globalLookupDictionary={appState.globalLookupDictionary}
                      globalLookupDictionaryLoaded={
                        appState.globalLookupDictionaryLoaded
                      }
                      metWords={appState.metWords}
                      startingMetWordsToday={appState.startingMetWordsToday}
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
                      metWords={appState.metWords}
                      flashcardsNextLesson={appState.flashcardsNextLesson}
                      recommendationHistory={appState.recommendationHistory}
                      recommendedNextLesson={appState.recommendedNextLesson}
                      lessonsProgress={appState.lessonsProgress}
                      lessonIndex={appState.lessonIndex}
                      recentLessonHistory={appState.recentLessons.history}
                      startingMetWordsToday={appState.startingMetWordsToday}
                      userGoals={appState.userGoals}
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
                    flashcardsMetWords={appState.flashcardsMetWords}
                    flashcardsProgress={appState.flashcardsProgress}
                    fullscreen={appState.fullscreen}
                    globalLookupDictionary={appState.globalLookupDictionary}
                    globalLookupDictionaryLoaded={
                      appState.globalLookupDictionaryLoaded
                    }
                    lessonpath="flashcards"
                    locationpathname={appProps.location.pathname}
                    personalDictionaries={appState.personalDictionaries}
                    stenoHintsOnTheFly={appProps.stenohintsonthefly}
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
                      globalLookupDictionary={appState.globalLookupDictionary}
                      globalLookupDictionaryLoaded={
                        appState.globalLookupDictionaryLoaded
                      }
                      lookupTerm={appState.lookupTerm}
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
                      globalLookupDictionary={appState.globalLookupDictionary}
                      globalLookupDictionaryLoaded={
                        appState.globalLookupDictionaryLoaded
                      }
                      stenohintsonthefly={appProps.stenohintsonthefly}
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
                      customLesson={appState.customLesson}
                      customLessonMaterial={appState.customLessonMaterial}
                      customLessonMaterialValidationState={
                        appState.customLessonMaterialValidationState
                      }
                      customLessonMaterialValidationMessages={
                        appState.customLessonMaterialValidationMessages
                      }
                      flashcardsMetWords={appState.flashcardsMetWords}
                      flashcardsProgress={appState.flashcardsProgress}
                      globalLookupDictionary={appState.globalLookupDictionary}
                      globalLookupDictionaryLoaded={
                        appState.globalLookupDictionaryLoaded
                      }
                      personalDictionaries={appState.personalDictionaries}
                      lessonNotFound={appState.lessonNotFound}
                      fullscreen={appState.fullscreen}
                      lessonSubTitle={appState.lesson.subtitle}
                      lessonTitle={appState.lesson.title}
                      lessonIndex={appState.lessonIndex}
                      lesson={appState.lesson}
                      actualText={appState.actualText}
                      completedPhrases={appProps.completedMaterial}
                      currentLessonStrokes={appState.currentLessonStrokes}
                      currentPhraseID={appState.currentPhraseID}
                      currentPhrase={
                        appProps.presentedMaterialCurrentItem.phrase
                      }
                      currentStroke={
                        appProps.presentedMaterialCurrentItem.stroke
                      }
                      disableUserSettings={appState.disableUserSettings}
                      metWords={appState.metWords}
                      previousCompletedPhraseAsTyped={
                        appState.previousCompletedPhraseAsTyped
                      }
                      recentLessonHistory={appState.recentLessons.history}
                      repetitionsRemaining={appState.repetitionsRemaining}
                      revisionMode={appState.revisionMode}
                      startTime={appState.startTime}
                      settings={appState.lesson.settings}
                      showStrokesInLesson={appState.showStrokesInLesson}
                      targetStrokeCount={appState.targetStrokeCount}
                      timer={appState.timer}
                      topSpeedPersonalBest={appState.topSpeedPersonalBest}
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
