import React from "react";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loadable from "react-loadable";
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

const AsyncTPEURPBGS = Loadable({
  loader: () => import("./TPEURPBGS/Index"),
  loading: PageLoading,
  delay: 300,
});

type Props = {
  match: any;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries?: ImportedPersonalDictionaries;
  metWords: MetWords;
  startingMetWordsToday: MetWords;
};

const Games = ({
  match,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  metWords,
  personalDictionaries,
  startingMetWordsToday,
}: Props) => {
  const globalUserSettings = useAtomValue(globalUserSettingsState);
  const userSettings = useAtomValue(userSettingsState);
  return (
    <Switch>
      <Route exact={true} path={`${match.url}/KAOES`}>
        <DocumentTitle title={"Typey Type | KAOES game"}>
          <ErrorBoundary>
            <AsyncKAOES inputForKAOES={globalUserSettings.inputForKAOES} />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/KHAERT`}>
        <DocumentTitle title={"Typey Type | KHAERT"}>
          <ErrorBoundary>
            <AsyncKHAERT globalLookupDictionary={globalLookupDictionary} />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/SHUFL`}>
        <DocumentTitle title={"Typey Type | SHUFL game"}>
          <ErrorBoundary>
            <AsyncSHUFL
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              startingMetWordsToday={startingMetWordsToday}
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
      <Route exact={true} path={`${match.url}/TPEURPBGS`}>
        <DocumentTitle title={"Typey Type | TPEURPBGS game"}>
          <ErrorBoundary>
            <AsyncTPEURPBGS />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/KPOES`}>
        <DocumentTitle title={"Typey Type | KPOES game"}>
          <ErrorBoundary>
            <AsyncKPOES
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              metWords={metWords}
              personalDictionaries={personalDictionaries}
              userSettings={userSettings}
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
