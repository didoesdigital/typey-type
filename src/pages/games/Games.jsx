import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";

const AsyncGamesIndex = Loadable({
  loader: () => import("./GamesIndex"),
  loading: PageLoading,
  delay: 300,
});

const AsyncSHUFL = Loadable({
  loader: () => import("./SHUFL/SHUFLIndex"),
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
        path={`${match.url}`}
        render={() => <AsyncGamesIndex />}
      />
    </Switch>
  );
};

export default Games;
