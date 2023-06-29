import React from "react";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";
import "./Games.scss";
import type {
  GlobalUserSettings,
  LookupDictWithNamespacedDicts,
  MetWords,
  PersonalDictionaryNameAndContents,
  UserSettings,
} from "../../types";

const AsyncGamesIndex = Loadable({
  loader: () => import("./GamesIndex"),
  loading: PageLoading,
  delay: 300,
});

const AsyncKAOES = Loadable({
  loader: () => import("./KAOES/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncKHAERT = Loadable({
  loader: () => import("./KHAERT/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncSHUFL = Loadable({
  loader: () => import("./SHUFL/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncTPEUBGSZ = Loadable({
  loader: () => import("./TPEUBGSZ/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncKPOES = Loadable({
  loader: () => import("./KPOES/Index"),
  loading: PageLoading,
  delay: 300,
});

type Props = {
  match: any;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries: PersonalDictionaryNameAndContents[];
  startingMetWordsToday: MetWords;
  globalUserSettings: GlobalUserSettings;
  userSettings: UserSettings;
  updateMetWords: any;
  updateMultipleMetWords: (newMetWords: string[]) => void;
};

const Games = ({
  match,
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  globalUserSettings,
  userSettings,
  startingMetWordsToday,
  updateMetWords,
  updateMultipleMetWords,
}: Props) => {
  return (
    <Switch>
      <Route exact={true} path={`${match.url}/KAOES`}>
        <DocumentTitle title={"Typey Type | KAOES game"}>
          <ErrorBoundary>
            <AsyncKAOES />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/KHAERT`}>
        <DocumentTitle title={"Typey Type | KHAERT"}>
          <ErrorBoundary>
            <AsyncKHAERT
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              personalDictionaries={personalDictionaries}
            />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/SHUFL`}>
        <DocumentTitle title={"Typey Type | SHUFL game"}>
          <ErrorBoundary>
            <AsyncSHUFL
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              personalDictionaries={personalDictionaries}
              startingMetWordsToday={startingMetWordsToday}
              updateMetWords={updateMetWords}
            />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/TPEUBGSZ`}>
        <DocumentTitle title={"Typey Type | TPEUBGSZ game"}>
          <ErrorBoundary>
            <AsyncTPEUBGSZ startingMetWordsToday={startingMetWordsToday} />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/KPOES`}>
        <DocumentTitle title={"Typey Type | KPOES game"}>
          <ErrorBoundary>
            <AsyncKPOES
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              personalDictionaries={personalDictionaries}
              globalUserSettings={globalUserSettings}
              userSettings={userSettings}
              updateMultipleMetWords={updateMultipleMetWords}
              // startingMetWordsToday={startingMetWordsToday}
              // updateMetWords={updateMetWords}
            />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}`}>
        <AsyncGamesIndex />
      </Route>
    </Switch>
  );
};

export default Games;
