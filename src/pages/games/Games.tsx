import React from "react";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";
import "./Games.scss";
import type {
  GlobalUserSettings,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
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

const AsyncTPEURPBGS = Loadable({
  loader: () => import("./TPEURPBGS/Index"),
  loading: PageLoading,
  delay: 300,
});

type Props = {
  match: any;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  metWords: MetWords;
  startingMetWordsToday: MetWords;
  globalUserSettings: GlobalUserSettings;
  userSettings: UserSettings;
};

const Games = ({
  match,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  metWords,
  globalUserSettings,
  userSettings,
  startingMetWordsToday,
}: Props) => {
  return (
    <Switch>
      <Route exact={true} path={`${match.url}/KAOES`}>
        <DocumentTitle title={"Typey Type | KAOES game"}>
          <ErrorBoundary>
            <AsyncKAOES
              inputForKAOES={globalUserSettings.inputForKAOES}
            />
          </ErrorBoundary>
        </DocumentTitle>
      </Route>
      <Route exact={true} path={`${match.url}/KHAERT`}>
        <DocumentTitle title={"Typey Type | KHAERT"}>
          <ErrorBoundary>
            <AsyncKHAERT
              globalLookupDictionary={globalLookupDictionary}
            />
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
              globalUserSettings={globalUserSettings}
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
