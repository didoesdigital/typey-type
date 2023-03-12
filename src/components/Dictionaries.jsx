import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "../pages/dictionaries/DictionariesIndex";
import PageLoading from "./PageLoading";

const AsyncDictionary = Loadable({
  loader: () => import("../pages/dictionaries/Dictionary"),
  loading: PageLoading,
  delay: 300,
});

const AsyncDictionaryManagement = Loadable({
  loader: () => import("../pages/dictionaries/DictionaryManagement"),
  loading: PageLoading,
  delay: 300,
});

const Dictionaries = ({
  match,
  globalLookupDictionaryLoaded,
  globalLookupDictionary,
  globalUserSettings,
  personalDictionaries,
  toggleExperiment,
  updateGlobalLookupDictionary,
  updatePersonalDictionaries,
  fetchAndSetupGlobalDict,
  ...dictionaryProps
}) => {
  return (
    <div>
      <Switch>
        <Route
          path={`${match.url}/lessons/:category/:subcategory/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          path={`${match.url}/lessons/fundamentals/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          path={`${match.url}/lessons/drills/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          path={`${match.url}/typey-type/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          path={`${match.url}/individual/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          path={`${match.url}/didoesdigital/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          path={`${match.url}/plover/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary {...dictionaryProps} {...props} />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/management`}
          render={(props) => (
            <AsyncDictionaryManagement
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalUserSettings={globalUserSettings}
              personalDictionaries={personalDictionaries}
              toggleExperiment={toggleExperiment}
              updateGlobalLookupDictionary={updateGlobalLookupDictionary}
              updatePersonalDictionaries={updatePersonalDictionaries}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={match.url}
          render={(props) => (
            <DictionariesIndex
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              globalUserSettings={globalUserSettings}
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              personalDictionaries={personalDictionaries}
              updateGlobalLookupDictionary={updateGlobalLookupDictionary}
              updatePersonalDictionaries={updatePersonalDictionaries}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default Dictionaries;
