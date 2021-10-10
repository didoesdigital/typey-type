import * as React from 'react'
import { Component } from 'react';
import { SOURCE_NAMESPACES } from '../constant/index.js';
import { AffixList } from '../utils/affixList';
import {
  rankOutlines,
  splitIntoStrokesDictsAndNamespaces
} from './../utils/transformingDictionaries';
import AmericanStenoDiagram from './../StenoLayout/AmericanStenoDiagram';
import DanishStenoDiagram from './../StenoLayout/DanishStenoDiagram';
import ItalianMichelaStenoDiagram from './../StenoLayout/ItalianMichelaStenoDiagram';
import JapaneseStenoDiagram from './../StenoLayout/JapaneseStenoDiagram';
import KoreanModernCStenoDiagram from './../StenoLayout/KoreanModernCStenoDiagram';
import PalantypeDiagram from './../StenoLayout/PalantypeDiagram';
import {
  mapBriefToAmericanStenoKeys,
  mapBriefToDanishStenoKeys,
  mapBriefToItalianMichelaStenoKeys,
  mapBriefToJapaneseStenoKeys,
  mapBriefToKoreanModernCStenoKeys,
  mapBriefToPalantypeKeys,
  splitBriefsIntoStrokes
} from './../utils/typey-type';
import misstrokesJSON from '../json/misstrokes.json'

class StrokesForWords extends Component {
  state = {
    modifiedWordOrPhrase: "",
    phrase: "",
    listOfStrokesAndDicts: []
  }

  componentDidMount() {
    // if (this.props.globalLookupDictionary && this.props.globalLookupDictionary.size < 2 && !this.props.globalLookupDictionaryLoaded) {

    const shouldUsePersonalDictionaries = this.props.personalDictionaries
      && Object.entries(this.props.personalDictionaries).length > 0
      && !!this.props.personalDictionaries.dictionariesNamesAndContents;

    this.props.fetchAndSetupGlobalDict(true, shouldUsePersonalDictionaries ? this.props.personalDictionaries : null).then(() => {
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
    if (this.props.onChange) {
      this.props.onChange(phrase);
    }

    let [listOfStrokesAndDicts, modifiedWordOrPhrase] = lookupListOfStrokesAndDicts(phrase, this.props.globalLookupDictionary);

    if (!(this.props.globalUserSettings && this.props.globalUserSettings.showMisstrokesInLookup)) {
      listOfStrokesAndDicts = listOfStrokesAndDicts
        .filter(row => row[2] === SOURCE_NAMESPACES.get("user") || !(misstrokesJSON[row[0]] && modifiedWordOrPhrase === misstrokesJSON[row[0]]))
    }

    this.setState({
      modifiedWordOrPhrase: modifiedWordOrPhrase,
      phrase: phrase,
      listOfStrokesAndDicts: listOfStrokesAndDicts
    })
  }

  render () {
    let layoutTypeStyle = '';
    if (this.props.userSettings && this.props.userSettings.stenoLayout === 'stenoLayoutKoreanModernCSteno') { layoutTypeStyle = ' heavy-type-face--korean'; }
    if (this.props.userSettings && this.props.userSettings.stenoLayout === 'stenoLayoutJapaneseSteno') { layoutTypeStyle = ' type-face--japanese'; }

    let strokeListItems = this.state.listOfStrokesAndDicts.map( (strokeAndDict, indexInListOfStrokesAndDicts) => {
      let classes = strokeAndDict[2] === SOURCE_NAMESPACES.get("typey") ? "steno-stroke px05 db fw7" : "steno-stroke px05 db steno-stroke--subtle";
      let briefWithSpacesBetweenLetters = [...strokeAndDict[0]].join(" ").replace("-","dash");

      let stenoBriefKeys = (
        <span className={classes} aria-label={briefWithSpacesBetweenLetters}>
          {strokeAndDict[0].split('').map((stenoKey, stenoKeyIndex) =>
            <React.Fragment key={stenoKeyIndex}>
              {stenoKey}
            </React.Fragment>
          )}
        </span>
      );

      let stenoBriefKeysWithOrWithoutStrongTag = stenoBriefKeys;

      if (strokeAndDict[2] === SOURCE_NAMESPACES.get("typey")) {
        stenoBriefKeysWithOrWithoutStrongTag = <strong>{stenoBriefKeys}</strong>;
      }

      return (
        <li className="unstyled-list-item mb1 flex flex-wrap items-baseline" key={ indexInListOfStrokesAndDicts }>
          <div className={"overflow-auto di mw-408 mr1" + layoutTypeStyle}>
            {stenoBriefKeysWithOrWithoutStrongTag}
          </div>
          <span className={ strokeAndDict[2] === SOURCE_NAMESPACES.get("typey") ? "" : "de-emphasized"}>{strokeAndDict[1]}</span>
        </li>
      )
    });

    let emptyState = (<div className="mb2">No results found</div>);

    if (this.state.phrase === "") {
      emptyState = (<div className="mb2"></div>);
    }

    let lookupResults;

    let classes = this.state.modifiedWordOrPhrase === this.state.phrase ? "py05 bg-slat" : "py05 bg-warning"

    if (this.state.listOfStrokesAndDicts && this.state.listOfStrokesAndDicts.length > 0) {
      lookupResults = (
        <>
          {this.state.modifiedWordOrPhrase ? <p className="de-emphasized"><span className={classes}>{this.state.modifiedWordOrPhrase}</span> <span className="de-emphasized">matched translation</span></p> : null}
          <ul className="unstyled-list wrap">
            {strokeListItems}
          </ul>
        </>
      );
    } else {
      lookupResults = emptyState;
    }

    let ploverMisstrokesDetail;

    if (this.props.globalUserSettings && this.props.globalUserSettings.showMisstrokesInLookup) {
      ploverMisstrokesDetail = <p><span className="py05 bg-danger">(Plover misstrokes included.)</span></p>
    }
    else {
      ploverMisstrokesDetail = <p><span className="py05 de-emphasized">(4000 misstrokes hidden.)</span></p>
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

    let mapBriefsFunction = mapBriefToAmericanStenoKeys;
    let StenoLayoutDiagram = AmericanStenoDiagram;
    let stenoLayout = (this.props.userSettings && this.props.userSettings.stenoLayout) ? this.props.userSettings.stenoLayout : 'stenoLayoutAmericanSteno';

    switch (stenoLayout) {
      case 'stenoLayoutAmericanSteno':
        mapBriefsFunction = mapBriefToAmericanStenoKeys;
        StenoLayoutDiagram = AmericanStenoDiagram;
        break;
      case 'stenoLayoutDanishSteno':
        mapBriefsFunction = mapBriefToDanishStenoKeys;
        StenoLayoutDiagram = DanishStenoDiagram;
        break;
      case 'stenoLayoutItalianMichelaSteno':
        mapBriefsFunction = mapBriefToItalianMichelaStenoKeys;
        StenoLayoutDiagram = ItalianMichelaStenoDiagram;
        break;
      case 'stenoLayoutJapaneseSteno':
        mapBriefsFunction = mapBriefToJapaneseStenoKeys;
        StenoLayoutDiagram = JapaneseStenoDiagram;
        break;
      case 'stenoLayoutKoreanModernCSteno':
        mapBriefsFunction = mapBriefToKoreanModernCStenoKeys;
        StenoLayoutDiagram = KoreanModernCStenoDiagram;
        break;
      case 'stenoLayoutPalantype':
        mapBriefsFunction = mapBriefToPalantypeKeys;
        StenoLayoutDiagram = PalantypeDiagram;
        break;
      default:
        mapBriefsFunction = mapBriefToAmericanStenoKeys;
        StenoLayoutDiagram = AmericanStenoDiagram;
        break;
    }

    let brief = ''
    if (this.state.listOfStrokesAndDicts && this.state.listOfStrokesAndDicts[0] && this.state.listOfStrokesAndDicts[0][0]) {
      brief = this.state.listOfStrokesAndDicts[0][0];
    }

    let strokes = splitBriefsIntoStrokes(brief);
    let diagrams = (
      <div className="flex flex-wrap mr05 overflow-y-auto max-h-240">
        {this.props.userSettings && this.props.userSettings.showStrokesAsDiagrams && this.state.listOfStrokesAndDicts.length > 0 && strokes.map((strokeToDraw, index) =>
          <React.Fragment key={index}>
            {(Object.values(mapBriefsFunction(strokeToDraw)).some(item => item)) && <div className="mt1 mr2 mb2"><StenoLayoutDiagram stenoHintsOnTheFly={this.props.stenoHintsOnTheFly} id={"diagramID-"+ index + '-' + strokeToDraw} {...mapBriefsFunction(strokeToDraw)} brief="steno-diagram-group" diagramWidth="192" /></div> }
          </React.Fragment>
        )}
        {this.props.userSettings && this.props.userSettings.showStrokesAsDiagrams && this.state.listOfStrokesAndDicts.length === 0 ?
          <React.Fragment>
            <div className="mt1 mr2 mb2"><StenoLayoutDiagram stenoHintsOnTheFly={this.props.stenoHintsOnTheFly} id={"diagramID-"+ 0} {...mapBriefsFunction('')} brief="steno-diagram-group" diagramWidth="192" /></div>
          </React.Fragment>
            :
            null
        }
      </div>
    );

    return (
      this.props.globalLookupDictionaryLoaded ?
        <React.Fragment>
          <label htmlFor="words-for-strokes" className="input-textarea-label input-textarea-label--large mb1">Enter words to look up</label>
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
          <div className="mb1">
            {diagrams}
          </div>
          {lookupResults}
          {ploverMisstrokesDetail}
        </React.Fragment>
      :
        loadingOrError
    );
  }
}

function lookupListOfStrokesAndDicts(phrase, globalLookupDictionary, affixList = AffixList.getSharedInstance()) {
  let lookupText = phrase;
  let modifiedWordOrPhrase = lookupText.slice();

  if (phrase === "{") { modifiedWordOrPhrase = "\\{{^}"; }
  if (phrase === "}") { modifiedWordOrPhrase = "{^}\\}"; }
  if (phrase === "{ ") { modifiedWordOrPhrase = "\\{"; }
  if (phrase === "} ") { modifiedWordOrPhrase = "\\}"; }
  if (phrase === "[") { modifiedWordOrPhrase = "{^[^}"; }
  if (phrase === "]") { modifiedWordOrPhrase = "{^]^}"; }
  if (phrase === "[ ") { modifiedWordOrPhrase = "{[}"; }
  if (phrase === "] ") { modifiedWordOrPhrase = "{]}"; }
  if (phrase === "?") { modifiedWordOrPhrase = "{?}"; }
  if (phrase === ".") { modifiedWordOrPhrase = "{^.^}"; }
  if (phrase === ". ") { modifiedWordOrPhrase = "{.}"; }
  if (phrase === ", ") { modifiedWordOrPhrase = "{,}"; }
  if (phrase === `” `) { modifiedWordOrPhrase = "{^~|”}"; }
  if (phrase === `”`) { modifiedWordOrPhrase = "{^~|”}"; }
  if (phrase === `“`) { modifiedWordOrPhrase = "{~|“^}"; }
  if (phrase === ` “`) { modifiedWordOrPhrase = "{~|“^}"; }
  if (phrase === `“`) { modifiedWordOrPhrase = "{~|“^}"; }
  if (phrase === ` ‘`) { modifiedWordOrPhrase = "{~|‘^}"; }
  if (phrase === `‘`) { modifiedWordOrPhrase = "{~|‘^}"; }
  if (phrase === `’ `) { modifiedWordOrPhrase = "{^~|’}"; }
  if (phrase === `’`) { modifiedWordOrPhrase = "{^~|’}"; }
  if (phrase === `" `) { modifiedWordOrPhrase = "{^~|\"}"; }
  if (phrase === `"`) { modifiedWordOrPhrase = "{~|\"^}"; }
  if (phrase === ` "`) { modifiedWordOrPhrase = "{~|\"^}"; }
  if (phrase === ` '`) { modifiedWordOrPhrase = "{~|'^}"; }
  if (phrase === `' `) { modifiedWordOrPhrase = "{^~|'}"; }
  if (phrase === ` `) { modifiedWordOrPhrase = "{^ ^}"; }

  if (phrase === "1") { modifiedWordOrPhrase = "{&1}"; }
  if (phrase === "2") { modifiedWordOrPhrase = "{&2}"; }
  if (phrase === "3") { modifiedWordOrPhrase = "{&3}"; }
  if (phrase === "4") { modifiedWordOrPhrase = "{&4}"; }
  if (phrase === "5") { modifiedWordOrPhrase = "{&5}"; }
  if (phrase === "6") { modifiedWordOrPhrase = "{&6}"; }
  if (phrase === "7") { modifiedWordOrPhrase = "{&7}"; }
  if (phrase === "8") { modifiedWordOrPhrase = "{&8}"; }
  if (phrase === "9") { modifiedWordOrPhrase = "{&9}"; }
  if (phrase === "0") { modifiedWordOrPhrase = "{&0}"; }

  if (phrase === "A") { modifiedWordOrPhrase = "{&A}"; }
  if (phrase === "B") { modifiedWordOrPhrase = "{&B}"; }
  if (phrase === "C") { modifiedWordOrPhrase = "{&C}"; }
  if (phrase === "D") { modifiedWordOrPhrase = "{&D}"; }
  if (phrase === "E") { modifiedWordOrPhrase = "{&E}"; }
  if (phrase === "F") { modifiedWordOrPhrase = "{&F}"; }
  if (phrase === "G") { modifiedWordOrPhrase = "{&G}"; }
  if (phrase === "H") { modifiedWordOrPhrase = "{&H}"; }
  if (phrase === "I") { modifiedWordOrPhrase = "{&I}"; }
  if (phrase === "J") { modifiedWordOrPhrase = "{&J}"; }
  if (phrase === "K") { modifiedWordOrPhrase = "{&K}"; }
  if (phrase === "L") { modifiedWordOrPhrase = "{&L}"; }
  if (phrase === "M") { modifiedWordOrPhrase = "{&M}"; }
  if (phrase === "N") { modifiedWordOrPhrase = "{&N}"; }
  if (phrase === "O") { modifiedWordOrPhrase = "{&O}"; }
  if (phrase === "P") { modifiedWordOrPhrase = "{&P}"; }
  if (phrase === "Q") { modifiedWordOrPhrase = "{&Q}"; }
  if (phrase === "R") { modifiedWordOrPhrase = "{&R}"; }
  if (phrase === "S") { modifiedWordOrPhrase = "{&S}"; }
  if (phrase === "T") { modifiedWordOrPhrase = "{&T}"; }
  if (phrase === "U") { modifiedWordOrPhrase = "{&U}"; }
  if (phrase === "V") { modifiedWordOrPhrase = "{&V}"; }
  if (phrase === "W") { modifiedWordOrPhrase = "{&W}"; }
  if (phrase === "X") { modifiedWordOrPhrase = "{&X}"; }
  if (phrase === "Y") { modifiedWordOrPhrase = "{&Y}"; }
  if (phrase === "Z") { modifiedWordOrPhrase = "{&Z}"; }
  if (phrase === "a") { modifiedWordOrPhrase = "{>}{&a}"; }
  if (phrase === "b") { modifiedWordOrPhrase = "{>}{&b}"; }
  if (phrase === "c") { modifiedWordOrPhrase = "{>}{&c}"; }
  if (phrase === "d") { modifiedWordOrPhrase = "{>}{&d}"; }
  if (phrase === "e") { modifiedWordOrPhrase = "{>}{&e}"; }
  if (phrase === "f") { modifiedWordOrPhrase = "{>}{&f}"; }
  if (phrase === "g") { modifiedWordOrPhrase = "{>}{&g}"; }
  if (phrase === "h") { modifiedWordOrPhrase = "{>}{&h}"; }
  if (phrase === "i") { modifiedWordOrPhrase = "{>}{&i}"; }
  if (phrase === "j") { modifiedWordOrPhrase = "{>}{&j}"; }
  if (phrase === "k") { modifiedWordOrPhrase = "{>}{&k}"; }
  if (phrase === "l") { modifiedWordOrPhrase = "{>}{&l}"; }
  if (phrase === "m") { modifiedWordOrPhrase = "{>}{&m}"; }
  if (phrase === "n") { modifiedWordOrPhrase = "{>}{&n}"; }
  if (phrase === "o") { modifiedWordOrPhrase = "{>}{&o}"; }
  if (phrase === "p") { modifiedWordOrPhrase = "{>}{&p}"; }
  if (phrase === "q") { modifiedWordOrPhrase = "{>}{&q}"; }
  if (phrase === "r") { modifiedWordOrPhrase = "{>}{&r}"; }
  if (phrase === "s") { modifiedWordOrPhrase = "{>}{&s}"; }
  if (phrase === "t") { modifiedWordOrPhrase = "{>}{&t}"; }
  if (phrase === "u") { modifiedWordOrPhrase = "{>}{&u}"; }
  if (phrase === "v") { modifiedWordOrPhrase = "{>}{&v}"; }
  if (phrase === "w") { modifiedWordOrPhrase = "{>}{&w}"; }
  if (phrase === "x") { modifiedWordOrPhrase = "{>}{&x}"; }
  if (phrase === "y") { modifiedWordOrPhrase = "{>}{&y}"; }
  if (phrase === "z") { modifiedWordOrPhrase = "{>}{&z}"; }

  let listOfStrokesAndDicts = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);

  if (phrase === "{") {
    modifiedWordOrPhrase = "{^}" + lookupText;
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary));
  }
  if (phrase === "}") {
    modifiedWordOrPhrase = lookupText + "{^}";
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary));
  }
  // if (phrase === "[") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes("{^}" + lookupText, globalLookupDictionary)); }
  // if (phrase === "]") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes(lookupText + "{^}", globalLookupDictionary)); }

  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^}" + lookupText + "{^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^}" + lookupText;
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = lookupText + "{^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^" + lookupText + "^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^" + lookupText + "}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{" + lookupText + "^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{" + lookupText + "}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = lookupText.trim();
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary);
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(listOfStrokesAndDictsWithSuppressedSpaces);
  }

  listOfStrokesAndDicts = rankOutlines(listOfStrokesAndDicts, misstrokesJSON, phrase, affixList);

  return [listOfStrokesAndDicts, modifiedWordOrPhrase];
}

function createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary) {
  let listOfStrokesAndDicts = [];
  if (dictionaryOfWordsStrokesAndSourceDictionary.get(phrase)) {
    listOfStrokesAndDicts = dictionaryOfWordsStrokesAndSourceDictionary.get(phrase);
  }

  return splitIntoStrokesDictsAndNamespaces(listOfStrokesAndDicts)
}

export default StrokesForWords;
export {
  createListOfStrokes,
  lookupListOfStrokesAndDicts
};
