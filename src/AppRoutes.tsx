import { lazy, Suspense } from "react";
import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DocumentTitle from "react-document-title";
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

const LazyBreak = lazy(() => import("./pages/break/Break"));

const LazyContribute = lazy(() => import("./pages/contribute/Contribute"));

const LazyPageNotFound = lazy(() => import("./pages/pagenotfound/PageNotFound"));

const LazyProgress = lazy(() => import("./pages/progress/Progress"));

const LazyWriter = lazy(() => import("./pages/writer/Writer"));

const LazyFlashcards = lazy(() => import("./pages/lessons/flashcards/Flashcards"));

const LazyHome = lazy(() => import("./pages/home/Home"));

const LazySupport = lazy(() => import("./pages/support/Support"));

const LazyLookup = lazy(() => import("./pages/lookup/Lookup"));

const LazyDictionaries = lazy(() => import("./pages/dictionaries/Dictionaries"));

const LazyGames = lazy(() => import("./pages/games/Games"));

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
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />

                <DocumentTitle title="Typey Type for Stenographers">
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyHome />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="support"
            element={
              <div>
                <Header />

                <DocumentTitle title={"Typey Type | About"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazySupport />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="writer"
            element={
              <div>
                <Header />

                <DocumentTitle title={"Typey Type | Writer"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyWriter />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="games/*"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Games"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyGames
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        metWords={appState.metWords}
                        personalDictionaries={appState.personalDictionaries}
                        startingMetWordsToday={appState.startingMetWordsToday}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="break"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Take a break"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyBreak />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="contribute"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Contribute"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyContribute />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="progress"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Progress"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyProgress
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
            }
          />
          <Route
            path="flashcards"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Flashcards"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyFlashcards
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        lessonpath="flashcards"
                        locationpathname={location.pathname}
                        personalDictionaries={appState.personalDictionaries}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="lookup"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Lookup"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyLookup
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        personalDictionaries={appState.personalDictionaries}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="dictionaries/*"
            element={
              <div>
                <Header />
                <DocumentTitle title={"Typey Type | Dictionaries"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyDictionaries
                        globalLookupDictionary={appState.globalLookupDictionary}
                        globalLookupDictionaryLoaded={
                          appState.globalLookupDictionaryLoaded
                        }
                        personalDictionaries={appState.personalDictionaries}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path="lessons/*"
            element={
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
                      lessonLength={
                        appProps.stateLesson.presentedMaterial.length
                      }
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
                      repetitionsRemaining={appState.repetitionsRemaining}
                      startTime={appState.startTime}
                      settings={appState.lesson.settings}
                      showStrokesInLesson={appState.showStrokesInLesson}
                      targetStrokeCount={appState.targetStrokeCount}
                      timer={appState.timer}
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
                      focusTriggerInt={appState.focusTriggerInt}
                    />
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
          <Route
            path={":notfound"}
            element={
              <div>
                <DocumentTitle title={"Typey Type | Page not found"}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading pastDelay={true} />}>
                      <LazyPageNotFound />
                    </Suspense>
                  </ErrorBoundary>
                </DocumentTitle>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </AnnouncerController>
  );
};

export default AppRoutes;
