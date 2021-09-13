import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import DictionariesIndex from './DictionariesIndex';
import PageLoading from './PageLoading';

const AsyncDictionary = Loadable({
  loader: () => import("./Dictionary"),
  loading: PageLoading,
  delay: 300
});

const AsyncDictionaryImport = Loadable({
  loader: () => import("./DictionaryImport"),
  loading: PageLoading,
  delay: 300
});

const Dictionaries = ({match, dictionaryIndex, setDictionaryIndex, setGlobalDictionaryLoaded, globalLookupDictionaryLoaded, globalLookupDictionary, globalUserSettings, personalDictionariesAndConfig, updateGlobalLookupDictionary, updatePersonalDictionariesAndConfig, fetchAndSetupGlobalDict, ...dictionaryProps}) => {
  return(
    <div>
      <Switch>
        <Route path={`${match.url}/lessons/:category/:subcategory/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/lessons/fundamentals/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/lessons/drills/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/typey-type/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/individual/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/didoesdigital/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/plover/:dictionaryPath`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/import`} render={ (props) =>
          <AsyncDictionaryImport
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            setGlobalDictionaryLoaded={setGlobalDictionaryLoaded}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            personalDictionariesAndConfig={personalDictionariesAndConfig}
            updateGlobalLookupDictionary={updateGlobalLookupDictionary}
            updatePersonalDictionariesAndConfig={updatePersonalDictionariesAndConfig}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={match.url} render={ (props) =>
          <DictionariesIndex
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={globalUserSettings}
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            personalDictionariesAndConfig={personalDictionariesAndConfig}
            updateGlobalLookupDictionary={updateGlobalLookupDictionary}
            updatePersonalDictionariesAndConfig={updatePersonalDictionariesAndConfig}
            match={match}
            {...dictionaryProps}
            {...props}
          />
        } />
      </Switch>
    </div>
  )

};

export default Dictionaries;
