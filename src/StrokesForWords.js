import * as React from 'react'
import { Component } from 'react';
import {
  getLatestPloverDict,
  getTypeyTypeDict
} from './utils/getData';
import {
  createAGlobalLookupDictionary,
  rankOutlines
} from './utils/transformingDictionaries';

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
            let sortedAndCombinedLookupDictionary = createAGlobalLookupDictionary(["plover-main-3-jun-2018.json"], [["plover-main-3-jun-2018.json", latestPloverDict]], ["plover-main-3-jun-2018.json"], dictTypeyType);
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
    listOfStrokesAndDicts = rankOutlines(listOfStrokesAndDicts, phrase);
    this.setState({
      phrase: phrase,
      listOfStrokesAndDicts: listOfStrokesAndDicts
    })
  }

  render () {
    let layoutTypeStyle = '';
    if (this.props.userSettings.stenoLayout === 'stenoLayoutKoreanModernCSteno') { layoutTypeStyle = ' heavy-type-face--korean'; }
    if (this.props.userSettings.stenoLayout === 'stenoLayoutJapaneseSteno') { layoutTypeStyle = ' type-face--japanese'; }

    let strokeListItems = this.state.listOfStrokesAndDicts.map( (strokeAndDict, i) => {
      return(
        <li className="unstyled-list-item mb1 flex flex-wrap items-baseline" key={ i }>
          <span className={"" + layoutTypeStyle}>
            <pre className="overflow-auto di mw-408 mr1 text-small">
              <span className="steno-stroke steno-stroke--subtle px05 inline-flex flex-wrap">
                {strokeAndDict[0].split('').map((item, i) =>
                  <kbd className="raw-steno-key raw-steno-key--subtle text-small" key={i}>
                    {item}
                  </kbd>
                )}
              </span>
            </pre>
          </span>
          <span className="text-small de-emphasized">{strokeAndDict[1]}</span>
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
