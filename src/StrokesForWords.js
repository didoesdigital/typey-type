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
    if (this.props.globalLookupDictionary && this.props.globalLookupDictionary.size < 2) {
      getTypeyTypeDict()
        .then(dictAndMisstrokes => {
          getLatestPloverDict()
            .then(latestPloverDict => {
              // if (this.props.globalUserSettings && this.props.globalUserSettings.showMisstrokesInLookup) {
              //   dictAndMisstrokes[1] = {};
              // }
              let sortedAndCombinedLookupDictionary = createAGlobalLookupDictionary(["plover-main-3-jun-2018.json"], [["plover-main-3-jun-2018.json", latestPloverDict]], ["plover-main-3-jun-2018.json"], dictAndMisstrokes);
              this.props.updateGlobalLookupDictionary(sortedAndCombinedLookupDictionary);
            });
        })
        .catch(error => {
          console.error(error);
          // this.showDictionaryErrorNotification();
        });
    }
  }

  updateWordsForStrokes(event) {
    let phrase = event.target.value;
    let lookupText = phrase;

    if (phrase === "{") { lookupText = "\\{{^}"; }
    if (phrase === "}") { lookupText = "{^}\\}"; }
    if (phrase === "{ ") { lookupText = "\\{"; }
    if (phrase === "} ") { lookupText = "\\}"; }
    if (phrase === "[") { lookupText = "{^[^}"; }
    if (phrase === "]") { lookupText = "{^]^}"; }
    if (phrase === "[ ") { lookupText = "{[}"; }
    if (phrase === "] ") { lookupText = "{]}"; }
    if (phrase === "?") { lookupText = "{?}"; }
    if (phrase === ".") { lookupText = "{^.^}"; }
    if (phrase === ". ") { lookupText = "{.}"; }
    if (phrase === ", ") { lookupText = "{,}"; }
    if (phrase === `” `) { lookupText = "{^~|”}"; }
    if (phrase === `”`) { lookupText = "{^~|”}"; }
    if (phrase === `“`) { lookupText = "{~|“^}"; }
    if (phrase === ` “`) { lookupText = "{~|“^}"; }
    if (phrase === `“`) { lookupText = "{~|“^}"; }
    if (phrase === ` ‘`) { lookupText = "{~|‘^}"; }
    if (phrase === `‘`) { lookupText = "{~|‘^}"; }
    if (phrase === `’ `) { lookupText = "{^~|’}"; }
    if (phrase === `’`) { lookupText = "{^~|’}"; }
    if (phrase === `" `) { lookupText = "{^~|\"}"; }
    if (phrase === `"`) { lookupText = "{~|\"^}"; }
    if (phrase === ` "`) { lookupText = "{~|\"^}"; }
    if (phrase === ` '`) { lookupText = "{~|'^}"; }
    if (phrase === `' `) { lookupText = "{^~|'}"; }
    if (phrase === ` `) { lookupText = "{^ ^}"; }

    if (phrase === "1") { lookupText = "{&1}"; }
    if (phrase === "2") { lookupText = "{&2}"; }
    if (phrase === "3") { lookupText = "{&3}"; }
    if (phrase === "4") { lookupText = "{&4}"; }
    if (phrase === "5") { lookupText = "{&5}"; }
    if (phrase === "6") { lookupText = "{&6}"; }
    if (phrase === "7") { lookupText = "{&7}"; }
    if (phrase === "8") { lookupText = "{&8}"; }
    if (phrase === "9") { lookupText = "{&9}"; }
    if (phrase === "0") { lookupText = "{&0}"; }

    if (phrase === "A") { lookupText = "{&A}"; }
    if (phrase === "B") { lookupText = "{&B}"; }
    if (phrase === "C") { lookupText = "{&C}"; }
    if (phrase === "D") { lookupText = "{&D}"; }
    if (phrase === "E") { lookupText = "{&E}"; }
    if (phrase === "F") { lookupText = "{&F}"; }
    if (phrase === "G") { lookupText = "{&G}"; }
    if (phrase === "H") { lookupText = "{&H}"; }
    if (phrase === "I") { lookupText = "{&I}"; }
    if (phrase === "J") { lookupText = "{&J}"; }
    if (phrase === "K") { lookupText = "{&K}"; }
    if (phrase === "L") { lookupText = "{&L}"; }
    if (phrase === "M") { lookupText = "{&M}"; }
    if (phrase === "N") { lookupText = "{&N}"; }
    if (phrase === "O") { lookupText = "{&O}"; }
    if (phrase === "P") { lookupText = "{&P}"; }
    if (phrase === "Q") { lookupText = "{&Q}"; }
    if (phrase === "R") { lookupText = "{&R}"; }
    if (phrase === "S") { lookupText = "{&S}"; }
    if (phrase === "T") { lookupText = "{&T}"; }
    if (phrase === "U") { lookupText = "{&U}"; }
    if (phrase === "V") { lookupText = "{&V}"; }
    if (phrase === "W") { lookupText = "{&W}"; }
    if (phrase === "X") { lookupText = "{&X}"; }
    if (phrase === "Y") { lookupText = "{&Y}"; }
    if (phrase === "Z") { lookupText = "{&Z}"; }

    let listOfStrokesAndDicts = createListOfStrokes(lookupText, this.props.globalLookupDictionary);

    if (phrase === "{") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes("{^}" + lookupText, this.props.globalLookupDictionary)); }
    if (phrase === "}") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes(lookupText + "{^}", this.props.globalLookupDictionary)); }
    // if (phrase === "[") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes("{^}" + lookupText, this.props.globalLookupDictionary)); }
    // if (phrase === "]") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes(lookupText + "{^}", this.props.globalLookupDictionary)); }

    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes("{^}" + lookupText + "{^}", this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes("{^}" + lookupText, this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(lookupText + "{^}", this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes("{^" + lookupText + "^}", this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes("{^" + lookupText + "}", this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes("{" + lookupText + "^}", this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
    if (listOfStrokesAndDicts.length === 0) {
      let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes("{" + lookupText + "}", this.props.globalLookupDictionary);
      listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
    }
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
              <span className="steno-stroke steno-stroke--subtle px05 inline-flex flex-wrap" aria-label={[...strokeAndDict[0]].join(" ").replace("-","dash")}>
                {strokeAndDict[0].split('').map((item, i) =>
                  <React.Fragment key={i}>
                    {item}
                  </React.Fragment>
                )}
              </span>
            </pre>
          </span>
          <span className={ strokeAndDict[1] === "typey-type.json" ? "text-small" : "text-small de-emphasized"}>{strokeAndDict[1]}</span>
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
        {this.props.globalUserSettings && this.props.globalUserSettings.showMisstrokesInLookup
          ?
          <p className="text-small"><span className="bg-danger">(Plover misstrokes included.)</span></p> :
          <p className="text-small"><span className="de-emphasized">(3000 Plover misstrokes hidden.)</span></p>
        }
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
