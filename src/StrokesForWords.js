import * as React from 'react'
import { Component } from 'react';
import {
  getLatestPloverDict,
  getTypeyTypeDict
} from './utils/getData';
import { createAGlobalLookupDictionary, } from './utils/transformingDictionaries';

class StrokesForWords extends Component {
  state = {
    phrase: "",
    dictionaryOfWordsStrokesAndSourceDictionary: {
      // "silent": [
      //   ["SAOEU/HREPBT", "dict.json"],
      //   ["SHREPBT", "dict.json"],
      //   ["SHRAOEUPBT", "dict.json"],
      //   ["SHREPBT", "personal.json"]
      // ],
      // "sentiment": [
      //   ["SEPB/TEUPLT", "sentiment"],
      //   ["SEPBT/*PLT", "sentiment"]
      // ],
      // "foo": [
      //   ["TPAO", "dict.json"],
      //   ["TPAO*", "personal.json"]
      // ],
      // "bar": [
      //   ["PWA*R", "personal.json"],
      //   ["PWAR", "dict.json"]
      // ],
      // "baz": [
      //   ["PWAZ", "personal.json"],
      //   ["PWAZ", "code.json"]
      // ]
    },
    listOfStrokesAndDicts: []
  }

  componentDidMount() {
    getTypeyTypeDict()
      .then(dictTypeyType => {
        getLatestPloverDict()
          .then(latestPloverDict => {
            let sortedAndCombinedLookupDictionary = createAGlobalLookupDictionary(["plover.json"], [["plover.json", latestPloverDict]], ["plover.json"], dictTypeyType);
            this.props.updateGlobalLookupDictionary(sortedAndCombinedLookupDictionary);
          });
      })
      .catch(error => {
        console.error(error);
        // this.showDictionaryErrorNotification();
      });
  }

  updateWordsForStrokes(event) {
    let phrase = event.target.value;
    let listOfStrokesAndDicts = createListOfStrokes(phrase, this.props.globalLookupDictionary);
    this.setState({
      phrase: phrase,
      listOfStrokesAndDicts: listOfStrokesAndDicts
    })
  }

  render () {
    let strokeListItems = this.state.listOfStrokesAndDicts.map( (strokeAndDict, i) => {
      return(
        <li className="unstyled-list-item mb1" key={ i }>
          <div className="">{"" + strokeAndDict[0]}</div>
          <div className="text-small de-emphasized">{strokeAndDict[1]}</div>
        </li>
      )
    });

    return (
      <React.Fragment>
        <label htmlFor="words-for-strokes">Enter words to see strokes</label>
        <textarea
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="input-textarea mb3 w-100"
          id="words-for-strokes"
          onChange={this.updateWordsForStrokes.bind(this)}
          placeholder="e.g. surprise"
          rows="1"
          spellCheck="false"
          value={this.state.phrase}
          wrap="off"
          >
        </textarea>
        <ul className="unstyled-list wrap">
          {strokeListItems}
        </ul>
      </React.Fragment>
    );
  }
}

function createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary) {
  let listOfStrokesAndDicts = [];
  if (dictionaryOfWordsStrokesAndSourceDictionary.get(phrase)) {
    listOfStrokesAndDicts = dictionaryOfWordsStrokesAndSourceDictionary.get(phrase);
  }
  return listOfStrokesAndDicts;
}

export default StrokesForWords;
export {
  createListOfStrokes
};
