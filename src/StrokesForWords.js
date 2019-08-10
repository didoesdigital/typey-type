import * as React from 'react'
import { Component } from 'react';
import {
  rankOutlines
} from './utils/transformingDictionaries';

class StrokesForWords extends Component {
  state = {
    phrase: "",
    listOfStrokesAndDicts: []
  }

  componentDidMount() {
    // if (this.props.globalLookupDictionary && this.props.globalLookupDictionary.size < 2 && !this.props.globalLookupDictionaryLoaded) {
      this.props.fetchAndSetupGlobalDict().then(() => {
        if (this.props.lookupTerm && this.props.lookupTerm !== undefined && this.props.lookupTerm.length > 0) {
          this.setState({phrase: this.props.lookupTerm});
          this.updateWordsForStrokes(this.props.lookupTerm);
        }
      })
      .catch(error => {
        console.error(error);
        // this.showDictionaryErrorNotification();
      });
    // }
  }

  handleWordsOnChange(event) {
    let phrase = event.target.value;
    this.updateWordsForStrokes(phrase);
  }

  updateWordsForStrokes(phrase) {
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

    if (phrase === "A") { listOfStrokesAndDicts = [["A*P", "fingerspelling"]]; }
    if (phrase === "B") { listOfStrokesAndDicts = [["PW*P", "fingerspelling"]]; }
    if (phrase === "C") { listOfStrokesAndDicts = [["KR*P", "fingerspelling"]]; }
    if (phrase === "D") { listOfStrokesAndDicts = [["TK*P", "fingerspelling"]]; }
    if (phrase === "E") { listOfStrokesAndDicts = [["*EP", "fingerspelling"]]; }
    if (phrase === "F") { listOfStrokesAndDicts = [["TP*P", "fingerspelling"]]; }
    if (phrase === "G") { listOfStrokesAndDicts = [["TKPW*P", "fingerspelling"]]; }
    if (phrase === "H") { listOfStrokesAndDicts = [["H*P", "fingerspelling"]]; }
    if (phrase === "I") { listOfStrokesAndDicts = [["*EUP", "fingerspelling"]]; }
    if (phrase === "J") { listOfStrokesAndDicts = [["SKWR*P", "fingerspelling"]]; }
    if (phrase === "K") { listOfStrokesAndDicts = [["K*P", "fingerspelling"]]; }
    if (phrase === "L") { listOfStrokesAndDicts = [["HR*P", "fingerspelling"]]; }
    if (phrase === "M") { listOfStrokesAndDicts = [["PH*P", "fingerspelling"]]; }
    if (phrase === "N") { listOfStrokesAndDicts = [["TPH*P", "fingerspelling"]]; }
    if (phrase === "O") { listOfStrokesAndDicts = [["O*P", "fingerspelling"]]; }
    if (phrase === "P") { listOfStrokesAndDicts = [["P*P", "fingerspelling"]]; }
    if (phrase === "Q") { listOfStrokesAndDicts = [["KW*P", "fingerspelling"]]; }
    if (phrase === "R") { listOfStrokesAndDicts = [["R*P", "fingerspelling"]]; }
    if (phrase === "S") { listOfStrokesAndDicts = [["S*P", "fingerspelling"]]; }
    if (phrase === "T") { listOfStrokesAndDicts = [["T*P", "fingerspelling"]]; }
    if (phrase === "U") { listOfStrokesAndDicts = [["*UP", "fingerspelling"]]; }
    if (phrase === "V") { listOfStrokesAndDicts = [["SR*P", "fingerspelling"]]; }
    if (phrase === "W") { listOfStrokesAndDicts = [["W*P", "fingerspelling"]]; }
    if (phrase === "X") { listOfStrokesAndDicts = [["KP*P", "fingerspelling"]]; }
    if (phrase === "Y") { listOfStrokesAndDicts = [["KWR*P", "fingerspelling"]]; }
    if (phrase === "Z") { listOfStrokesAndDicts = [["STKPW*P", "fingerspelling"]]; }
    if (phrase === "a") { listOfStrokesAndDicts = [["A*", "fingerspelling"]]; }
    if (phrase === "b") { listOfStrokesAndDicts = [["PW*", "fingerspelling"]]; }
    if (phrase === "c") { listOfStrokesAndDicts = [["KR*", "fingerspelling"]]; }
    if (phrase === "d") { listOfStrokesAndDicts = [["TK*", "fingerspelling"]]; }
    if (phrase === "e") { listOfStrokesAndDicts = [["*E", "fingerspelling"]]; }
    if (phrase === "f") { listOfStrokesAndDicts = [["TP*", "fingerspelling"]]; }
    if (phrase === "g") { listOfStrokesAndDicts = [["TKPW*", "fingerspelling"]]; }
    if (phrase === "h") { listOfStrokesAndDicts = [["H*", "fingerspelling"]]; }
    if (phrase === "i") { listOfStrokesAndDicts = [["*EU", "fingerspelling"]]; }
    if (phrase === "j") { listOfStrokesAndDicts = [["SKWR*", "fingerspelling"]]; }
    if (phrase === "k") { listOfStrokesAndDicts = [["K*", "fingerspelling"]]; }
    if (phrase === "l") { listOfStrokesAndDicts = [["HR*", "fingerspelling"]]; }
    if (phrase === "m") { listOfStrokesAndDicts = [["PH*", "fingerspelling"]]; }
    if (phrase === "n") { listOfStrokesAndDicts = [["TPH*", "fingerspelling"]]; }
    if (phrase === "o") { listOfStrokesAndDicts = [["O*", "fingerspelling"]]; }
    if (phrase === "p") { listOfStrokesAndDicts = [["P*", "fingerspelling"]]; }
    if (phrase === "q") { listOfStrokesAndDicts = [["KW*", "fingerspelling"]]; }
    if (phrase === "r") { listOfStrokesAndDicts = [["R*", "fingerspelling"]]; }
    if (phrase === "s") { listOfStrokesAndDicts = [["S*", "fingerspelling"]]; }
    if (phrase === "t") { listOfStrokesAndDicts = [["T*", "fingerspelling"]]; }
    if (phrase === "u") { listOfStrokesAndDicts = [["*U", "fingerspelling"]]; }
    if (phrase === "v") { listOfStrokesAndDicts = [["SR*", "fingerspelling"]]; }
    if (phrase === "w") { listOfStrokesAndDicts = [["W*", "fingerspelling"]]; }
    if (phrase === "x") { listOfStrokesAndDicts = [["KP*", "fingerspelling"]]; }
    if (phrase === "y") { listOfStrokesAndDicts = [["KWR*", "fingerspelling"]]; }
    if (phrase === "z") { listOfStrokesAndDicts = [["STKPW*", "fingerspelling"]]; }

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
          <div className={"overflow-auto di mw-408 mr1" + layoutTypeStyle}>
            <span className={strokeAndDict[1] === "typey-type.json" ? "steno-stroke px05 db" : "steno-stroke px05 db steno-stroke--subtle"} aria-label={[...strokeAndDict[0]].join(" ").replace("-","dash")}>
              {strokeAndDict[0].split('').map((item, i) =>
                <React.Fragment key={i}>
                  {item}
                </React.Fragment>
              )}
            </span>
          </div>
          <span className={ strokeAndDict[1] === "typey-type.json" ? "" : "de-emphasized"}>{strokeAndDict[1]}</span>
        </li>
      )
    });

    let emptyState = (<div className="mb2">No results found</div>);

    if (this.state.phrase === "") {
      emptyState = (<div className="mb2"></div>);
    }

    let lookupResults;

    if (this.state.listOfStrokesAndDicts && this.state.listOfStrokesAndDicts.length > 0) {
      lookupResults = (
        <ul className="unstyled-list wrap">
          {strokeListItems}
        </ul>
      );
    } else {
      lookupResults = emptyState;
    }

    let ploverMisstrokesDetail;

    if (this.props.globalUserSettings && this.props.globalUserSettings.showMisstrokesInLookup) {
      ploverMisstrokesDetail = <p><span className="bg-danger">(Plover misstrokes included.)</span></p>
    }
    else {
      ploverMisstrokesDetail = <p><span className="de-emphasized">(3000 misstrokes hidden.)</span></p>
    }

    let loadingOrError;
    let hasError = false; // TODO: move this into state and actually set if errors are hit

    if (!this.props.globalLookupDictionaryLoaded) {
      loadingOrError = (
        <React.Fragment>
          Loading…
        </React.Fragment>
      );
    }

    if (hasError) {
      loadingOrError = (
        <React.Fragment>
          Sorry, there was an error loading strokes. Try <a href=".">refresh the page</a>.
        </React.Fragment>
      );
    }

    return (
      this.props.globalLookupDictionaryLoaded ?
        <React.Fragment>
          <label htmlFor="words-for-strokes" className="input-textarea-label input-textarea-label--large">Enter words to look up</label>
          <textarea
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="input-textarea input-textarea--large mb3 w-100"
            id="words-for-strokes"
            onChange={this.handleWordsOnChange.bind(this)}
            placeholder="e.g. quadruplicate"
            rows="1"
            spellCheck="false"
            value={this.state.phrase}
            wrap="off"
            >
          </textarea>
          {lookupResults}
          {ploverMisstrokesDetail}
        </React.Fragment>
      :
        loadingOrError
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
