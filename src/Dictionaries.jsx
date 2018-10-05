import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dictionary from './Dictionary';
import DictionariesIndex from './DictionariesIndex';

const Dictionaries = ({match, dictionaryIndex, handleDictionary, dictionary, ...dictionaryProps}) => {
  return(
    <div>
      <Switch>
        <Route path={`${match.url}/lessons/:category/:subcategory/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            dictionaryIndex={dictionaryIndex}
            handleDictionary={handleDictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/lessons/fundamentals/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            dictionaryIndex={dictionaryIndex}
            handleDictionary={handleDictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/lessons/drills/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            dictionaryIndex={dictionaryIndex}
            handleDictionary={handleDictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/dictionaries/typey-type/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            dictionaryIndex={dictionaryIndex}
            handleDictionary={handleDictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/dictionaries/didoesdigital/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            dictionaryIndex={dictionaryIndex}
            handleDictionary={handleDictionary}
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/dictionaries/plover/:dictionaryPath`} render={ (props) =>
          <Dictionary
            dictionary={dictionary}
            dictionaryIndex={dictionaryIndex}
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
            dictionaryIndex={dictionaryIndex}
            dictionary={dictionary}
            match={match}
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
