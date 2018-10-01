import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dictionary from './Dictionary';
import DictionariesIndex from './DictionariesIndex';

const Dictionaries = ({match, dictionaryIndex, handleDictionary, dictionary, ...dictionaryProps}) => {
  return(
    <div>
      <Switch>
        <Route path={`${match.url}/:category/:subcategory/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            handleDictionary={handleDictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/custom`} render={ (props) =>
          <Dictionary
            dictionaryIndex={dictionaryIndex}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={match.url} render={ (props) =>
          <DictionariesIndex
            match={match}
            dictionaryIndex={dictionaryIndex}
            dictionary={dictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
      </Switch>
    </div>
  )

};
            // dictionaryIndex={dictionaryIndex}
            // handleDictionary={handleDictionary}
            // dictionary={dictionary}
            //
            // dictionaryIndex={dictionaryIndex}
            // handleDictionary={handleDictionary}
            // dictionary={dictionary}
            //
            // dictionaryIndex={dictionaryIndex}
            // handleDictionary={handleDictionary}

export default Dictionaries;
