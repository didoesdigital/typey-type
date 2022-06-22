import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";

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

const Games = ({
  match,
  globalLookupDictionary,
  startingMetWordsToday,
  updateMetWords,
}) => {
  return (
    <Switch>
      <Route
        exact={true}
        path={`${match.url}/KAOES`}
        render={() => <AsyncKAOES />}
      />
      <Route
        exact={true}
        path={`${match.url}/SHUFL`}
        render={() => (
          <AsyncSHUFL
            globalLookupDictionary={globalLookupDictionary}
            startingMetWordsToday={startingMetWordsToday}
            updateMetWords={updateMetWords}
          />
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/TPEUBGSZ`}
        render={() => <AsyncTPEUBGSZ />}
      />
      <Route
        exact={true}
        path={`${match.url}`}
        render={() => <AsyncGamesIndex />}
      />
    </Switch>
  );
};

export default Games;
