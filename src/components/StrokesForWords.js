import * as React from "react";
import { useEffect, useState } from "react";
import SOURCE_NAMESPACES from "../constant/sourceNamespaces";
import splitBriefsIntoStrokes from "./../utils/splitBriefsIntoStrokes";
import lookupListOfStrokesAndDicts from "../utils/lookupListOfStrokesAndDicts";

import misstrokesJSON from "../json/misstrokes.json";
import PloverMisstrokesDetail from "./PloverMisstrokesDetail";
import StrokesAsDiagrams from "./StrokesAsDiagrams";
import MatchedModifiedTranslation from "./MatchedModifiedTranslation";
import LookupResultsOutlinesAndDicts from "./LookupResultsOutlinesAndDicts";

const StrokesForWords = ({
  personalDictionaries,
  fetchAndSetupGlobalDict,
  lookupTerm,
  onChange,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  globalUserSettings,
  trackPhrase,
  userSettings,
}) => {
  const [modifiedWordOrPhraseState, setModifiedWordOrPhraseState] =
    useState("");
  const [phraseState, setPhraseState] = useState("");
  const [listOfStrokesAndDictsState, setListOfStrokesAndDictsState] = useState(
    []
  );

  useEffect(() => {
    // if (this.props.globalLookupDictionary && this.props.globalLookupDictionary.size < 2 && !this.props.globalLookupDictionaryLoaded) {

    const shouldUsePersonalDictionaries =
      personalDictionaries &&
      Object.entries(personalDictionaries).length > 0 &&
      !!personalDictionaries.dictionariesNamesAndContents;

    fetchAndSetupGlobalDict(
      true,
      shouldUsePersonalDictionaries ? personalDictionaries : null
    )
      .then(() => {
        if (lookupTerm && lookupTerm !== undefined && lookupTerm.length > 0) {
          setPhraseState(lookupTerm);
          updateWordsForStrokes(lookupTerm);
        }
      })
      .catch((error) => {
        console.error(error);
        // this.showDictionaryErrorNotification();
      });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [fetchAndSetupGlobalDict, lookupTerm, personalDictionaries, updateWordsForStrokes]);

  function handleWordsOnChange(event) {
    let phrase = event.target.value;
    updateWordsForStrokes(phrase);
  }

  function updateWordsForStrokes(phrase) {
    if (onChange) {
      onChange(phrase);
    }

    let [listOfStrokesAndDicts, modifiedWordOrPhrase] =
      lookupListOfStrokesAndDicts(phrase, globalLookupDictionary);

    if (!globalUserSettings?.showMisstrokesInLookup) {
      listOfStrokesAndDicts = listOfStrokesAndDicts.filter(
        (row) =>
          row[2] === SOURCE_NAMESPACES.get("user") ||
          !(
            misstrokesJSON[row[0]] &&
            modifiedWordOrPhrase === misstrokesJSON[row[0]]
          )
      );
    }

    if (trackPhrase) {
      trackPhrase(phrase);
    }

    setModifiedWordOrPhraseState(modifiedWordOrPhrase);
    setPhraseState(phrase);
    setListOfStrokesAndDictsState(listOfStrokesAndDicts);
  }

  const stenoLayout = userSettings?.stenoLayout ?? "stenoLayoutAmericanSteno";

  const brief =
    listOfStrokesAndDictsState &&
    listOfStrokesAndDictsState[0] &&
    listOfStrokesAndDictsState[0][0]
      ? listOfStrokesAndDictsState[0][0]
      : "";

  const strokes = splitBriefsIntoStrokes(brief);

  if (!globalLookupDictionaryLoaded) return <>Loading…</>;

  return (
    <React.Fragment>
      <label
        htmlFor="words-for-strokes"
        className="input-textarea-label input-textarea-label--large mb1 overflow-hidden"
      >
        Enter words to look up
      </label>
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="input-textarea input-textarea--large mb3 w-100 overflow-hidden"
        id="words-for-strokes"
        onChange={handleWordsOnChange.bind(this)}
        placeholder="e.g. quadruplicate"
        rows={1}
        spellCheck={false}
        value={phraseState}
        wrap="off"
      ></textarea>
      <MatchedModifiedTranslation
        listOfStrokesAndDicts={listOfStrokesAndDictsState}
        modifiedWordOrPhrase={modifiedWordOrPhraseState}
        phrase={phraseState}
      />
      <div className="mb1">
        <StrokesAsDiagrams
          listOfStrokesAndDicts={listOfStrokesAndDictsState}
          stenoLayout={stenoLayout}
          strokes={strokes}
          userSettings={userSettings}
        />
      </div>
      <LookupResultsOutlinesAndDicts
        listOfStrokesAndDicts={listOfStrokesAndDictsState}
        stenoLayout={stenoLayout}
      />
      <PloverMisstrokesDetail
        showMisstrokesInLookup={globalUserSettings?.showMisstrokesInLookup}
      />
    </React.Fragment>
  );
};

export default StrokesForWords;
