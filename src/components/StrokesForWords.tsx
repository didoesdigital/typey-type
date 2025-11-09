import { useEffect, useState } from "react";
import * as React from "react";
import lookupListOfStrokesAndDicts from "../utils/lookupListOfStrokesAndDicts";
import splitBriefsIntoStrokes from "./../utils/splitBriefsIntoStrokes";
import LookupResultsOutlinesAndDicts from "./LookupResultsOutlinesAndDicts";
import MatchedModifiedTranslation from "./MatchedModifiedTranslation";
import StrokesAsDiagrams from "./StrokesAsDiagrams";
import addMisstrokeStatus from "utils/transformingDictionaries/addMisstrokeStatus";

import type {
  FetchAndSetupGlobalDict,
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
  StrokeDictNamespaceAndMisstrokeStatus,
  UserSettings,
} from "../types";
import removePreferredOutlineDuplicates from "utils/transformingDictionaries/removePreferredOutlineDuplicates";

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
  const [modifiedWordOrPhraseState, setModifiedWordOrPhraseState] =
    useState("");
  const [phraseState, setPhraseState] = useState("");
  const [
    listOfStrokeDictNamespaceMisstroke,
    setListOfStrokeDictNamespaceMisstroke,
  ] = useState<StrokeDictNamespaceAndMisstrokeStatus[]>([]);

  useEffect(() => {
    const shouldUsePersonalDictionaries =
      globalLookupDictionaryLoaded && personalDictionaries;

    const maybeImportedPersonalDictionaries = shouldUsePersonalDictionaries
      ? personalDictionaries
      : null;

    fetchAndSetupGlobalDict(maybeImportedPersonalDictionaries).catch(
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
    const phrase = event.target.value;
    updateWordsForStrokes(phrase);
  };

  function updateWordsForStrokes(phrase: string) {
    if (onChange) {
      onChange(phrase);
    }

    const [listOfStrokesAndDicts, modifiedWordOrPhrase] =
      lookupListOfStrokesAndDicts(phrase, globalLookupDictionary);

    const listOfStrokesDictsNamespaceMisstroke: StrokeDictNamespaceAndMisstrokeStatus[] =
      removePreferredOutlineDuplicates(
        addMisstrokeStatus(listOfStrokesAndDicts, modifiedWordOrPhrase)
      );

    if (trackPhrase) {
      trackPhrase(phrase);
    }

    setModifiedWordOrPhraseState(modifiedWordOrPhrase);
    setPhraseState(phrase);
    setListOfStrokeDictNamespaceMisstroke(listOfStrokesDictsNamespaceMisstroke);
  }

  const stenoLayout = userSettings?.stenoLayout ?? "stenoLayoutAmericanSteno";

  const brief =
    listOfStrokeDictNamespaceMisstroke &&
    listOfStrokeDictNamespaceMisstroke[0] &&
    listOfStrokeDictNamespaceMisstroke[0][0]
      ? listOfStrokeDictNamespaceMisstroke[0][0]
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
        listOfStrokeDictNamespaceMisstroke={listOfStrokeDictNamespaceMisstroke}
        modifiedWordOrPhrase={modifiedWordOrPhraseState}
        phrase={phraseState}
      />
      <div className="mb1">
        <StrokesAsDiagrams
          listOfStrokeDictNamespaceMisstroke={
            listOfStrokeDictNamespaceMisstroke
          }
          stenoLayout={stenoLayout}
          strokes={strokes}
          userSettings={userSettings}
        />
      </div>
      <LookupResultsOutlinesAndDicts
        listOfStrokeDictNamespaceMisstroke={listOfStrokeDictNamespaceMisstroke}
        stenoLayout={stenoLayout}
      />
    </React.Fragment>
  );
};

export default StrokesForWords;
