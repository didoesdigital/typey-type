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

const Dictionaries = ({match, dictionaryIndex, setDictionaryIndex, ...dictionaryProps}) => {
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
        <Route exact={true} path={`${match.url}/custom`} render={ (props) =>
          <AsyncDictionary
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={match.url} render={ (props) =>
          <DictionariesIndex
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
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
