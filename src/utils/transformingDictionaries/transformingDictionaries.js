import { LATEST_PLOVER_DICT_NAME, SOURCE_NAMESPACES } from '../../constant/index.js';
import createStrokeHintForPhrase from './createStrokeHintForPhrase';

function generateListOfWordsAndStrokes(wordList, globalLookupDictionary) {
  // wordList = [ 'bed,', 'man!', "'sinatra'", 'and again', 'media query', 'push origin master', 'diff --cached', 'diff -- cached' ]
  let sourceAndPresentedMaterial = [];

  for (let i = 0; i < wordList.length; i++) {
    // if (wordOrPhraseMaterial === "and! and") { debugger; }
    let wordOrPhraseMaterial = wordList[i];

    let strokes = createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary);

    sourceAndPresentedMaterial.push({phrase: wordOrPhraseMaterial, stroke: strokes});
  }

  return sourceAndPresentedMaterial;
}

function rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary) {
  // This code causes the browser to hang
  // for (let [translation, outlinesAndSourceDicts] of combinedLookupDictionary) {
  //   let rankedOutlinesAndSourceDicts = rankOutlines(outlinesAndSourceDicts, translation);
  //   combinedLookupDictionary.set(translation, rankedOutlinesAndSourceDicts);
  // }
  return combinedLookupDictionary;
}

function addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, outlinesWeHaveSeen) {

  for (let [outline, translation] of Object.entries(dictContent)) {
    let seen = outlinesWeHaveSeen.has(outline);
    if (!seen) {
      // current = [[PWAZ: dict.json], [PWA*Z: typey.json]];
      let current = combinedLookupDictionary.get(translation);
      if (current) {
        current.push([outline, dictName]);
        combinedLookupDictionary.set(translation, current);
      }
      else {
        combinedLookupDictionary.set(translation, [[outline, dictName]]);
      }
      outlinesWeHaveSeen.add(outline);
    }
  }
  return [combinedLookupDictionary, outlinesWeHaveSeen];
}

function combineValidDictionaries(personalDictionariesNamesAndContents, dictTypeyType, ploverDict = null) {
  let combinedLookupDictionary = new Map();
  let numberOfPersonalDictionaries = personalDictionariesNamesAndContents.length;
  let outlinesWeHaveSeen = new Set();
  // eslint-disable-next-line
  let _;

  // 1. Add personal dictionaries entries
  for (let i = 0; i < numberOfPersonalDictionaries; i++) {
    let dictName = personalDictionariesNamesAndContents[i][0];
    let dictContent = personalDictionariesNamesAndContents[i][1];
    [combinedLookupDictionary, outlinesWeHaveSeen] = addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, `${SOURCE_NAMESPACES.get('user')}:${dictName}`, outlinesWeHaveSeen);
  }

  // 2. Add Typey Type entries
  [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(dictTypeyType, combinedLookupDictionary, `${SOURCE_NAMESPACES.get('typey')}:typey-type.json`, new Set());

  // 3. Add Plover dictionary entries
  if (!!ploverDict) {
    // eslint-disable-next-line
    [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(ploverDict, combinedLookupDictionary, `${SOURCE_NAMESPACES.get('plover')}:${LATEST_PLOVER_DICT_NAME}`, new Set());
  }

  outlinesWeHaveSeen = new Set();

  return combinedLookupDictionary;
}

function getListOfValidDictionariesAddedAndInConfig(dictNamesFromAddedConfig, namesOfValidAddedDictionaries) {
  let listOfValidDictionariesAddedAndInConfig = [];
  const numberOfDictionariesInAddedConfig = dictNamesFromAddedConfig.length;

  for (let i = 0; i < numberOfDictionariesInAddedConfig; i++) {
    if (namesOfValidAddedDictionaries.indexOf(dictNamesFromAddedConfig[i]) > -1) {
      listOfValidDictionariesAddedAndInConfig.push(dictNamesFromAddedConfig[i]);
    }
  }

  return listOfValidDictionariesAddedAndInConfig;
}

export {
  addOutlinesToWordsInCombinedDict,
  combineValidDictionaries,
  generateListOfWordsAndStrokes,
  getListOfValidDictionariesAddedAndInConfig,
  rankAllOutlinesInCombinedLookupDictionary,
};
