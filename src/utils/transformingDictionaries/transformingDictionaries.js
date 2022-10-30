import { LATEST_PLOVER_DICT_NAME, SOURCE_NAMESPACES } from '../../constant/index.js';
import { AffixList } from '../affixList';
import getRankedOutlineFromLookupEntry from './getRankedOutlineFromLookupEntry';
import createFingerspellingStroke from './createFingerspellingStroke';
import chooseOutlineForPhrase from './chooseOutlineForPhrase';

const punctuationSplittingRegex = /([!"“”#$%&'‘’()*,.:;<=>?@[\\\]^`{|}~—–-])/; // includes en and em dashes, curly quotes
// const punctuationSplittingWholeMatchRegex = /^[!"“”#$%&'‘’()*,./:;<=>?@[\\\]^`{|}~—–-]?$/; // includes en and em dashes, curly quotes
const strokeLookupAttemptsLimit = 12;

function tryMatchingCompoundWords(compoundWordParts, globalLookupDictionary, strokes, stroke, strokeLookupAttempts, affixList) {
  let compoundWordFirstWord = compoundWordParts[0];
  let compoundWordSecondWord = compoundWordParts[1];
  let prefixes = affixList.prefixes;

  let hyphenOutline = 'H-PB';
  let hyphenTranslation = "{^-^}"
  let hyphenEntry = globalLookupDictionary.get(hyphenTranslation)
  if (hyphenEntry) {
    hyphenOutline = getRankedOutlineFromLookupEntry(hyphenEntry, hyphenTranslation, affixList);
  }

  const matchingPrefixWithHyphenEntry = prefixes.find(prefixEntry => prefixEntry[1] === compoundWordFirstWord + "-");
  if (matchingPrefixWithHyphenEntry) {
    stroke = matchingPrefixWithHyphenEntry[0]; // self-
    strokes = strokes === "" ? stroke : strokes + " " + stroke;
    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordSecondWord, globalLookupDictionary, stroke, strokeLookupAttempts, '-');
    if (stroke && stroke.length > 0 && stroke !== "xxx") {
      strokes = strokes + stroke;
      stroke = "xxx";
    }
    else if (stroke === "xxx") {
      stroke = createFingerspellingStroke(compoundWordSecondWord, globalLookupDictionary, affixList);
      strokes = strokes + stroke;
      stroke = "xxx";
    }
  }
  else {
    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordFirstWord, globalLookupDictionary, stroke, strokeLookupAttempts, ''); // "store" => ["STOR", 3]

    if (stroke && stroke.length > 0 && stroke !== "xxx") {
      strokes = strokes === "" ? stroke + " " + hyphenOutline : strokes + " " + stroke + " " + hyphenOutline;
      [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordSecondWord, globalLookupDictionary, stroke, strokeLookupAttempts, '-'); // "room"

      if (stroke && stroke.length > 0) {
        strokes = strokes + " " + stroke;
        stroke = "xxx";
      }
    }
    else if (stroke === "xxx") {
      stroke = createFingerspellingStroke(compoundWordFirstWord, globalLookupDictionary, affixList);
      strokes = strokes === "" ? stroke + " " + hyphenOutline : strokes + " " + stroke + " " + hyphenOutline;
      stroke = createFingerspellingStroke(compoundWordSecondWord, globalLookupDictionary, affixList);
      strokes = strokes + " " + stroke;
      stroke = "xxx";
    }
  }

  return [strokes, stroke, strokeLookupAttempts];
}

function createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary, affixList = AffixList.getSharedInstance()) {
  let stroke = "";
  let strokes = "";
  let strokeLookupAttempts = 0;
  let precedingChar = '';
  let overLimit = false;
  [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(wordOrPhraseMaterial, globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar); // given "off went the man!" return "xxx"

  if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
    return strokes = stroke;
  }

  let listOfWords = wordOrPhraseMaterial.split(" ").filter(nonEmptyItem => nonEmptyItem);
  let listOfWordsLength = listOfWords.length;

  // Arbitrary limit to prevent making Typey Type slow from excess look ups
  if (listOfWordsLength > strokeLookupAttemptsLimit) {
    listOfWords.length = strokeLookupAttemptsLimit;
    listOfWordsLength = strokeLookupAttemptsLimit;
    overLimit = true;
  }

  for (let i = 0; i < listOfWordsLength; i++) {
    let wordToLookUp = listOfWords[i];
    // 1. Try exact match
    precedingChar = i === 0 ? '' : ' ';

    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(wordToLookUp, globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar);

    if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
      strokes = strokes === "" ? stroke : strokes + " " + stroke;
      stroke = "xxx";
    }
    // 2. Try punctuation matching
    else {
      let compoundWordParts = wordToLookUp.split("-");
      if (wordToLookUp.match(punctuationSplittingRegex) !== null) { // "man!"
        // 2.1 compound words
        // if there is exactly 1 hyphen in the middle of a word, it's probably a compound word e.g. "store-room"
        if (compoundWordParts && compoundWordParts.length === 2 && compoundWordParts[0] !== "" && compoundWordParts[1] !== "") {
          [strokes, stroke, strokeLookupAttempts] = tryMatchingCompoundWords(compoundWordParts, globalLookupDictionary, strokes, stroke, strokeLookupAttempts, affixList); // "store-room"
          stroke = "xxx";
        }
        // 2.2 any punctuation, noting preceding char
        else {
          let listOfPunctuationSeparatedWords = wordToLookUp.split(punctuationSplittingRegex).filter(nonEmptyItem => nonEmptyItem);
          let len = listOfPunctuationSeparatedWords.length;

          // Arbitrary limit to prevent making Typey Type slow from excess look ups
          if (len > strokeLookupAttemptsLimit) {
            listOfPunctuationSeparatedWords.length = strokeLookupAttemptsLimit;
            len = strokeLookupAttemptsLimit;
          }

          for (let j = 0; j < len; j++) {

            // If it's the first char of a word and it's punctuation, pretend the preceding character was a space so that we recommend the right opening or closing punctuation
            if (j === 0) { precedingChar = ' '; } else { precedingChar = ''; }

            [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(listOfPunctuationSeparatedWords[j], globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar);
            if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
              strokes = strokes === "" ? stroke : strokes + " " + stroke;
              stroke = "xxx";
            }
            else {
              // 2.3 resort to fingerspelling
              stroke = createFingerspellingStroke(listOfPunctuationSeparatedWords[j], globalLookupDictionary, affixList);
              strokes = strokes === "" ? stroke : strokes + " " + stroke;
            }
          }
        }
      }
      // 3. Resort to fingerspelling
      else {
        stroke = createFingerspellingStroke(wordToLookUp, globalLookupDictionary, affixList);
        strokes = strokes === "" ? stroke : strokes + " " + stroke;
      }
    }
  }
  precedingChar = '';

  // FIXME: this is a brute force approach that will have unintended consequences and fail to catch scenarios it should e.g. if you use personal dictionaries without H-F this will be confusing
  if (strokes.startsWith("KR-GS KPA/")) {
    strokes = strokes.replace("KR-GS KPA/", "KW-GS KPA*/");
  }
  if (strokes.startsWith("KW-GS KPA/")) {
    strokes = strokes.replace("KW-GS KPA/", "KW-GS KPA*/");
  }
  if (strokes.endsWith("KWEZ")) {
    strokes = strokes.replace("KWEZ", "H-F");
  }
  if (strokes.includes(" PR-D")) {
    strokes = strokes.replace(" PR-D", " TP-PL");
  }
  if (strokes.endsWith(" P-P")) {
    strokes = strokes.replace(" P-P", " TP-PL");
  }

  if (overLimit) { strokes = strokes + " xxx"; }

  return strokes;
}

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

function createAGlobalLookupDictionary(personalDictionariesNamesAndContents, dictTypeyType, ploverDict = null) {
  // TODO: one day, this could be the place we check for whether Typey Type dictionaries or the Plover dictionary are enabled and if so combineValidDictionaries with them and add to 'configuration'

  let combinedLookupDictionary = combineValidDictionaries(personalDictionariesNamesAndContents, dictTypeyType, ploverDict);
  // let sortedAndCombinedLookupDictionary = rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary); // has a bug; instead of sorted entire dict, we sort per entry used within chooseOutlineForPhrase function
  let configuration = [`${SOURCE_NAMESPACES.get('typey')}:typey-type.json`, ...personalDictionariesNamesAndContents.map(d => `${SOURCE_NAMESPACES.get('user')}:${d[0]}`)];
  if (!!ploverDict) { configuration.push(`${SOURCE_NAMESPACES.get('plover')}:${LATEST_PLOVER_DICT_NAME}`); }
  combinedLookupDictionary['configuration'] = configuration;

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
  createStrokeHintForPhrase,
  createAGlobalLookupDictionary,
  generateListOfWordsAndStrokes,
  getListOfValidDictionariesAddedAndInConfig,
  rankAllOutlinesInCombinedLookupDictionary,
};
