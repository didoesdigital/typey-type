import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import PageLoading from "../../components/PageLoading";
import "./Games.scss";
import type {
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
} from "../../types";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import { globalUserSettingsState } from "../../states/globalUserSettingsState";

const LazyGamesIndex = lazy(() => import("./GamesIndex"));

const LazyKAOES = lazy(() => import("./KAOES/Index"));

const LazyKHAERT = lazy(() => import("./KHAERT/Index"));

const LazySHUFL = lazy(() => import("./SHUFL/Index"));

const LazyTPEUBGSZ = lazy(() => import("./TPEUBGSZ/Index"));

const LazyKPOES = lazy(() => import("./KPOES/Index"));

const LazyTPEURPBGS = lazy(() => import("./TPEURPBGS/Index"));

type Props = {
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries?: ImportedPersonalDictionaries;
  metWords: MetWords;
  startingMetWordsToday: MetWords;
};

const Games = ({
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  metWords,
  personalDictionaries,
  startingMetWordsToday,
}: Props) => {
  const globalUserSettings = useAtomValue(globalUserSettingsState);
  const userSettings = useAtomValue(userSettingsState);

  return (
    <Routes>
      <Route
        path={"KAOES"}
        element={
          <DocumentTitle title={"Typey Type | KAOES game"}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <LazyKAOES inputForKAOES={globalUserSettings.inputForKAOES} />
              </Suspense>
            </ErrorBoundary>
          </DocumentTitle>
        }
      />
      <Route
        path={"KHAERT"}
        element={
          <DocumentTitle title={"Typey Type | KHAERT"}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <LazyKHAERT globalLookupDictionary={globalLookupDictionary} />
              </Suspense>
            </ErrorBoundary>
          </DocumentTitle>
        }
      />
      <Route
        path={"SHUFL"}
        element={
          <DocumentTitle title={"Typey Type | SHUFL game"}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <LazySHUFL
                  globalLookupDictionary={globalLookupDictionary}
                  globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                  startingMetWordsToday={startingMetWordsToday}
                />
              </Suspense>
            </ErrorBoundary>
          </DocumentTitle>
        }
      />
      <Route
        path={"TPEUBGSZ"}
        element={
          <DocumentTitle title={"Typey Type | TPEUBGSZ game"}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <LazyTPEUBGSZ startingMetWordsToday={startingMetWordsToday} />
              </Suspense>
            </ErrorBoundary>
          </DocumentTitle>
        }
      />
      <Route
        path={"TPEURPBGS"}
        element={
          <DocumentTitle title={"Typey Type | TPEURPBGS game"}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <LazyTPEURPBGS />
              </Suspense>
            </ErrorBoundary>
          </DocumentTitle>
        }
      />
      <Route
        path={"KPOES"}
        element={
          <DocumentTitle title={"Typey Type | KPOES game"}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <LazyKPOES
                  globalLookupDictionary={globalLookupDictionary}
                  globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                  metWords={metWords}
                  personalDictionaries={personalDictionaries}
                  userSettings={userSettings}
                />
              </Suspense>
            </ErrorBoundary>
          </DocumentTitle>
        }
      />
      <Route
        path={`/`}
        element={
          <Suspense fallback={<PageLoading pastDelay={true} />}>
            <LazyGamesIndex />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Games;
