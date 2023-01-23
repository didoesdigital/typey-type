import * as React from 'react'
import { Component } from 'react';
import { SOURCE_NAMESPACES } from '../constant/index.js';
import splitBriefsIntoStrokes from './../utils/splitBriefsIntoStrokes';
import lookupListOfStrokesAndDicts from "../utils/lookupListOfStrokesAndDicts";

import misstrokesJSON from '../json/misstrokes.json'
import getStenoDiagram from "../pages/lessons/utilities/getStenoDiagram";
import getMapBriefsFn from "../pages/lessons/utilities/getMapBriefsFn";

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

    let emptyState = (<p>No results found</p>);

    if (this.state.phrase === "") {
      emptyState = (<p></p>);
    }

    let matchedTranslation = null
    let lookupResults;

    let classes = "dark:text-coolgrey-900 wrap mr1 order-1 fw4 py05 bg-slat bw-1 b--solid";
    classes += this.state.modifiedWordOrPhrase === this.state.phrase ? " b-info" : " b-danger";

    if (this.state.listOfStrokesAndDicts && this.state.listOfStrokesAndDicts.length > 0) {
      matchedTranslation = this.state.modifiedWordOrPhrase ?
        <p className="de-emphasized flex flex-wrap items-center">
          <span className="de-emphasized order-2">(text shown in dictionary)</span>
          <samp className={classes}>{this.state.modifiedWordOrPhrase}</samp>
        </p>
        :
        null

      lookupResults = (
        <ul className="unstyled-list wrap">
          {strokeListItems}
        </ul>
      );
    } else {
      matchedTranslation = emptyState;
      lookupResults = null;
    }

    let ploverMisstrokesDetail;

    if (this.props.globalUserSettings && this.props.globalUserSettings.showMisstrokesInLookup) {
      ploverMisstrokesDetail = <p><span className="py05 bg-danger dark:text-coolgrey-900">(Plover misstrokes included.)</span></p>
    }
    else {
      ploverMisstrokesDetail = <p><span className="py05 de-emphasized dark:text-coolgrey-900">(4000 misstrokes hidden.)</span></p>
    }

    const stenoLayout = (this.props.userSettings && this.props.userSettings.stenoLayout) ? this.props.userSettings.stenoLayout : 'stenoLayoutAmericanSteno';
    const StenoLayoutDiagram = getStenoDiagram(stenoLayout);
    const mapBriefsFunction = getMapBriefsFn(stenoLayout);

    const brief = (this.state.listOfStrokesAndDicts && this.state.listOfStrokesAndDicts[0] && this.state.listOfStrokesAndDicts[0][0]) ? this.state.listOfStrokesAndDicts[0][0] : '';

    let strokes = splitBriefsIntoStrokes(brief);
    let diagrams = (
      <div className="flex flex-wrap mr05 overflow-y-auto max-h-240">
        {this.props.userSettings && this.props.userSettings.showStrokesAsDiagrams && this.state.listOfStrokesAndDicts.length > 0 && strokes.map((strokeToDraw, index) =>
          <React.Fragment key={index}>
            {(Object.values(mapBriefsFunction(strokeToDraw)).some(item => item)) && <div className="mt1 mr2 mb2"><StenoLayoutDiagram classes="steno-diagram-svg" id={"diagramID-"+ index + '-' + strokeToDraw} {...mapBriefsFunction(strokeToDraw)} brief="steno-diagram-group" diagramWidth="192" /></div> }
          </React.Fragment>
        )}
        {this.props.userSettings && this.props.userSettings.showStrokesAsDiagrams && this.state.listOfStrokesAndDicts.length === 0 ?
          <React.Fragment>
            <div className="mt1 mr2 mb2"><StenoLayoutDiagram classes="steno-diagram-svg" id={"diagramID-"+ 0} {...mapBriefsFunction('')} brief="steno-diagram-group" diagramWidth="192" /></div>
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
            rows={1}
            spellCheck={false}
            value={this.state.phrase}
            wrap="off"
            >
          </textarea>
          {matchedTranslation}
          <div className="mb1">
            {diagrams}
          </div>
          {lookupResults}
          {ploverMisstrokesDetail}
        </React.Fragment>
      : (
        <>Loading…</>
      )
    );
  }
}

export default StrokesForWords;
