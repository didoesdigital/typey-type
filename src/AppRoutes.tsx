import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import DocumentTitle from "react-document-title";
import Loadable from "react-loadable";
import PageLoading from "./components/PageLoading";
import ErrorBoundary from "./components/ErrorBoundary";
import Lessons from "./pages/lessons/Lessons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnnouncerController from "./components/Announcer/AnnouncerController";
import Announcer from "./components/Announcer/Announcer";
import type {
  MaterialItem,
  MaterialText,
  Lesson,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
  CurrentLessonStrokes,
  ActualTypedText,
  ImportedPersonalDictionaries,
  LessonsProgressIndex,
} from "./types";
import { CustomLessonMaterialValidationState } from "./pages/lessons/custom/components/CustomLessonIntro";

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
export type AppStateForDescendants = {
  // currentPhraseAttempts: [],
  currentPhraseID: number;
  currentLessonStrokes: CurrentLessonStrokes[];
  customLessonMaterial: string;
  customLessonMaterialValidationMessages: string[];
  customLessonMaterialValidationState: CustomLessonMaterialValidationState;
  customLesson: Lesson;
  actualText: ActualTypedText;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  lessonNotFound: boolean;
  lessonsProgress: LessonsProgressIndex;
  // isGlobalLookupDictionaryLoaded: false,
  personalDictionaries?: ImportedPersonalDictionaries;
  previousCompletedPhraseAsTyped: ActualTypedText;
  repetitionsRemaining: number;
  startTime: number | null;
  showStrokesInLesson: boolean;
  targetStrokeCount: number;
  timer: number;
  totalNumberOfMatchedWords: number;
  // numberOfMatchedChars: 0,
  // totalNumberOfMatchedChars: 0,
  totalNumberOfNewWordsMet: number;
  totalNumberOfLowExposuresSeen: number;
  totalNumberOfRetainedWords: number;
  totalNumberOfMistypedWords: number;
  totalNumberOfHintedWords: number;
  disableUserSettings: boolean;
  metWords: MetWords;
  lesson: Lesson;
  // revisionMaterial: [
  // ],
  startingMetWordsToday: MetWords;
  yourSeenWordCount: number;
  yourMemorisedWordCount: number;
  focusTriggerInt: number;
};

type Props = {
  appProps: AppProps;
  appState: AppStateForDescendants;
};

export type AppProps = {
  completedMaterial: MaterialText[];
  presentedMaterialCurrentItem: MaterialItem;
  stateLesson: Lesson;
  upcomingMaterial: unknown;
};

const AppRoutes: React.FC<Props> = ({ appProps, appState }) => {
  const location = useLocation();
  return (
    <AnnouncerController>
      <Announcer />
      <div>
        <Switch>
          <Route exact={true} path="/">
            <div>
              <Header />

              <DocumentTitle title="Typey Type for Stenographers">
                <AsyncHome />
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/support">
            <div>
              <Header />

              <DocumentTitle title={"Typey Type | About"}>
                <ErrorBoundary>
                  <AsyncSupport />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/writer">
            <div>
              <Header />

              <DocumentTitle title={"Typey Type | Writer"}>
                <ErrorBoundary>
                  <AsyncWriter />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/games">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Games"}>
                <ErrorBoundary>
                  <AsyncGames
                    globalLookupDictionary={appState.globalLookupDictionary}
                    globalLookupDictionaryLoaded={
                      appState.globalLookupDictionaryLoaded
                    }
                    metWords={appState.metWords}
                    personalDictionaries={appState.personalDictionaries}
                    startingMetWordsToday={appState.startingMetWordsToday}
                  />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/break">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Take a break"}>
                <ErrorBoundary>
                  <AsyncBreak />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/contribute">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Contribute"}>
                <ErrorBoundary>
                  <AsyncContribute />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/progress">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Progress"}>
                <ErrorBoundary>
                  <Suspense fallback={<PageLoading pastDelay={true} />}>
                    <AsyncProgress
                      metWords={appState.metWords}
                      lessonsProgress={appState.lessonsProgress}
                      startingMetWordsToday={appState.startingMetWordsToday}
                      yourSeenWordCount={appState.yourSeenWordCount}
                      yourMemorisedWordCount={appState.yourMemorisedWordCount}
                    />
                  </Suspense>
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/flashcards">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Flashcards"}>
                <AsyncFlashcards
                  globalLookupDictionary={appState.globalLookupDictionary}
                  globalLookupDictionaryLoaded={
                    appState.globalLookupDictionaryLoaded
                  }
                  lessonpath="flashcards"
                  locationpathname={location.pathname}
                  personalDictionaries={appState.personalDictionaries}
                />
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/lookup">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Lookup"}>
                <ErrorBoundary>
                  <AsyncLookup
                    globalLookupDictionary={appState.globalLookupDictionary}
                    globalLookupDictionaryLoaded={
                      appState.globalLookupDictionaryLoaded
                    }
                    personalDictionaries={appState.personalDictionaries}
                  />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/dictionaries">
            <div>
              <Header />
              <DocumentTitle title={"Typey Type | Dictionaries"}>
                <ErrorBoundary>
                  <AsyncDictionaries
                    globalLookupDictionary={appState.globalLookupDictionary}
                    globalLookupDictionaryLoaded={
                      appState.globalLookupDictionaryLoaded
                    }
                    personalDictionaries={appState.personalDictionaries}
                  />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route path="/lessons">
            <div>
              <Header />
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
                    globalLookupDictionary={appState.globalLookupDictionary}
                    globalLookupDictionaryLoaded={
                      appState.globalLookupDictionaryLoaded
                    }
                    personalDictionaries={appState.personalDictionaries}
                    lessonNotFound={appState.lessonNotFound}
                    lessonSubTitle={appState.lesson.subtitle}
                    lessonTitle={appState.lesson.title}
                    lessonLength={appProps.stateLesson.presentedMaterial.length}
                    lesson={appState.lesson}
                    actualText={appState.actualText}
                    completedPhrases={appProps.completedMaterial}
                    currentLessonStrokes={appState.currentLessonStrokes}
                    currentPhraseID={appState.currentPhraseID}
                    currentPhrase={appProps.presentedMaterialCurrentItem.phrase}
                    currentStroke={appProps.presentedMaterialCurrentItem.stroke}
                    disableUserSettings={appState.disableUserSettings}
                    metWords={appState.metWords}
                    previousCompletedPhraseAsTyped={
                      appState.previousCompletedPhraseAsTyped
                    }
                    repetitionsRemaining={appState.repetitionsRemaining}
                    startTime={appState.startTime}
                    settings={appState.lesson.settings}
                    showStrokesInLesson={appState.showStrokesInLesson}
                    targetStrokeCount={appState.targetStrokeCount}
                    timer={appState.timer}
                    totalNumberOfMatchedWords={
                      appState.totalNumberOfMatchedWords
                    }
                    totalNumberOfNewWordsMet={appState.totalNumberOfNewWordsMet}
                    totalNumberOfLowExposuresSeen={
                      appState.totalNumberOfLowExposuresSeen
                    }
                    totalNumberOfRetainedWords={
                      appState.totalNumberOfRetainedWords
                    }
                    totalNumberOfMistypedWords={
                      appState.totalNumberOfMistypedWords
                    }
                    totalNumberOfHintedWords={appState.totalNumberOfHintedWords}
                    totalWordCount={
                      appProps.stateLesson.presentedMaterial.length
                    }
                    upcomingPhrases={appProps.upcomingMaterial}
                    focusTriggerInt={appState.focusTriggerInt}
                  />
                </ErrorBoundary>
              </DocumentTitle>
            </div>
          </Route>
          <Route>
            <div>
              <DocumentTitle title={"Typey Type | Page not found"}>
                <AsyncPageNotFound />
              </DocumentTitle>
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </AnnouncerController>
  );
};

export default AppRoutes;
