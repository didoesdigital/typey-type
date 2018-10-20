import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dictionary from './Dictionary';
import DictionariesIndex from './DictionariesIndex';

const Dictionaries = ({match, ...dictionaryProps}) => {
  return(
    <div>
      <Switch>
        <Route path={`${match.url}/lessons/:category/:subcategory/:dictionaryPath`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/lessons/fundamentals/:dictionaryPath`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/lessons/drills/:dictionaryPath`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/typey-type/:dictionaryPath`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/didoesdigital/:dictionaryPath`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
      <Route path={`${match.url}/plover/:dictionaryPath`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/custom`} render={ (props) =>
          <Dictionary
            {...dictionaryProps}
            {...props}
          />
        } />
        <Route exact={true} path={match.url} render={ (props) =>
          <DictionariesIndex
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
