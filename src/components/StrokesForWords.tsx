import React, { useEffect, useState } from "react";
import SOURCE_NAMESPACES from "../constant/sourceNamespaces";
import misstrokes from "../json/misstrokes.json";
import lookupListOfStrokesAndDicts from "../utils/lookupListOfStrokesAndDicts";
import splitBriefsIntoStrokes from "./../utils/splitBriefsIntoStrokes";
import LookupResultsOutlinesAndDicts from "./LookupResultsOutlinesAndDicts";
import MatchedModifiedTranslation from "./MatchedModifiedTranslation";
import PloverMisstrokesDetail from "./PloverMisstrokesDetail";
import StrokesAsDiagrams from "./StrokesAsDiagrams";

import type {
  FetchAndSetupGlobalDict,
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
  StenoDictionary,
  StrokeAndDictionaryAndNamespace,
  UserSettings,
} from "../types";
import { useAtomValue } from "jotai";
import { globalUserSettingsState } from "../states/globalUserSettingsState";

type Props = {
  fetchAndSetupGlobalDict: FetchAndSetupGlobalDict;
  lookupTerm?: string;
  onChange?: (phrase: string) => void;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries?: ImportedPersonalDictionaries;
  trackPhrase?: (value: React.SetStateAction<string>) => void;
  userSettings: UserSettings;
};

const StrokesForWords = ({
  fetchAndSetupGlobalDict,
  lookupTerm,
  onChange,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  trackPhrase,
  userSettings,
}: Props) => {
  const globalUserSettings = useAtomValue(globalUserSettingsState);
  const [modifiedWordOrPhraseState, setModifiedWordOrPhraseState] =
    useState("");
  const [phraseState, setPhraseState] = useState("");
  const [listOfStrokesAndDictsState, setListOfStrokesAndDictsState] = useState<
    StrokeAndDictionaryAndNamespace[]
  >([]);

  const misstrokesJSON = misstrokes as StenoDictionary;

  useEffect(() => {
    const shouldUsePersonalDictionaries =
      globalLookupDictionaryLoaded && personalDictionaries;

    const maybeImportedPersonalDictionaries = shouldUsePersonalDictionaries
      ? personalDictionaries
      : null;

    fetchAndSetupGlobalDict(true, maybeImportedPersonalDictionaries).catch(
      (error) => {
        console.error(error);
        // this.showDictionaryErrorNotification();
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAndSetupGlobalDict, lookupTerm]);
  // }, [fetchAndSetupGlobalDict, lookupTerm, updateWordsForStrokes]);

  useEffect(() => {
    if (lookupTerm && lookupTerm !== undefined && lookupTerm.length > 0) {
      setPhraseState(lookupTerm);
      updateWordsForStrokes(lookupTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lookupTerm, globalLookupDictionaryLoaded]);
  // }, [lookupTerm, updateWordsForStrokes, globalLookupDictionaryLoaded]);

  const handleWordsOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    let phrase = event.target.value;
    updateWordsForStrokes(phrase);
  };

  const showMisstrokesInLookup =
    globalUserSettings.showMisstrokesInLookup ?? false;

  function updateWordsForStrokes(phrase: string) {
    if (onChange) {
      onChange(phrase);
    }

    let [listOfStrokesAndDicts, modifiedWordOrPhrase] =
      lookupListOfStrokesAndDicts(phrase, globalLookupDictionary);

    if (!showMisstrokesInLookup) {
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
        onChange={handleWordsOnChange}
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
