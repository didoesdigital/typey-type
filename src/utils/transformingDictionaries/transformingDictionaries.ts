import createStrokeHintForPhrase from "./createStrokeHintForPhrase";
import type {
  DictName,
  LookupDictWithNamespacedDicts,
  Outline,
  StenoDictionary,
} from "../../types";

function generateListOfWordsAndStrokes(
  wordList: string[],
  globalLookupDictionary: LookupDictWithNamespacedDicts
) {
  // wordList = [ 'bed,', 'man!', "'sinatra'", 'and again', 'media query', 'push origin master', 'diff --cached', 'diff -- cached' ]
  let sourceAndPresentedMaterial = [];

  for (let i = 0; i < wordList.length; i++) {
    // if (wordOrPhraseMaterial === "and! and") { debugger; }
    let wordOrPhraseMaterial = wordList[i];

    let strokes = createStrokeHintForPhrase(
      wordOrPhraseMaterial,
      globalLookupDictionary
    );

    sourceAndPresentedMaterial.push({
      phrase: wordOrPhraseMaterial,
      stroke: strokes,
    });
  }

  return sourceAndPresentedMaterial;
}

// function rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary) {
//   // This code causes the browser to hang
//   // for (let [translation, outlinesAndSourceDicts] of combinedLookupDictionary) {
//   //   let rankedOutlinesAndSourceDicts = rankOutlines(outlinesAndSourceDicts, translation);
//   //   combinedLookupDictionary.set(translation, rankedOutlinesAndSourceDicts);
//   // }
//   return combinedLookupDictionary;
// }

/**
 * This function takes all the entries in a newly provided dictionary and adds
 * its outlines to the combined lookup dictionary unless a specific outline has
 * already been used for another word. An outline can only be used for 1 word
 * using Plover and that will be defined based on dictionary order.
 *
 * @param dictContent - the next Typey Type or personal dictionary in order
 * @param combinedLookupDictionary - the word-first lookup dictionary we have so far
 * @param dictName - the name of this dictionary
 * @param outlinesWeHaveSeen - outlines we have already added for other words
 * @returns the combined lookup dictionary with added entries and the updated list of outlines we've seen
 */
function addOutlinesToWordsInCombinedDict(
  dictContent: StenoDictionary,
  combinedLookupDictionary: LookupDictWithNamespacedDicts,
  dictName: DictName,
  outlinesWeHaveSeen: Set<Outline>
): [LookupDictWithNamespacedDicts, Set<Outline>] {
  for (let [outline, translation] of Object.entries(dictContent)) {
    let seen = outlinesWeHaveSeen.has(outline);
    if (!seen) {
      // current = [[PWAZ, user:dict.json], [PWA*Z, typey:typey.json]];
      let current = combinedLookupDictionary.get(translation);
      if (current) {
        current.push([outline, dictName]);
        combinedLookupDictionary.set(translation, current);
      } else {
        combinedLookupDictionary.set(translation, [[outline, dictName]]);
      }
      outlinesWeHaveSeen.add(outline);
    }
  }
  return [combinedLookupDictionary, outlinesWeHaveSeen];
}

function getListOfValidDictionariesAddedAndInConfig(
  dictNamesFromAddedConfig: DictName[],
  namesOfValidAddedDictionaries: DictName[]
) {
  let listOfValidDictionariesAddedAndInConfig = [];
  const numberOfDictionariesInAddedConfig = dictNamesFromAddedConfig.length;

  for (let i = 0; i < numberOfDictionariesInAddedConfig; i++) {
    if (
      namesOfValidAddedDictionaries.indexOf(dictNamesFromAddedConfig[i]) > -1
    ) {
      listOfValidDictionariesAddedAndInConfig.push(dictNamesFromAddedConfig[i]);
    }
  }

  return listOfValidDictionariesAddedAndInConfig;
}

export {
  addOutlinesToWordsInCombinedDict,
  generateListOfWordsAndStrokes,
  getListOfValidDictionariesAddedAndInConfig,
  // rankAllOutlinesInCombinedLookupDictionary,
};
