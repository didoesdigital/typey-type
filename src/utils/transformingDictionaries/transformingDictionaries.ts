import createStrokeHintForPhrase from "./createStrokeHintForPhrase";
import type {
  DictName,
  LookupDictWithNamespacedDicts,
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

function addOutlinesToWordsInCombinedDict(
  dictContent: StenoDictionary,
  combinedLookupDictionary: LookupDictWithNamespacedDicts,
  dictName: DictName,
  outlinesWeHaveSeen: any //Set<string>
) {
  for (let [outline, translation] of Object.entries(dictContent)) {
    let seen = outlinesWeHaveSeen.has(outline);
    if (!seen) {
      // current = [[PWAZ: dict.json], [PWA*Z: typey.json]];
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
