import { AffixList } from '../affixList';
import chooseOutlineForPhrase from './chooseOutlineForPhrase';
import tryMatchingCompoundWords from './tryMatchingCompoundWords';
import createFingerspellingStroke from './createFingerspellingStroke';
import type { LookupDictWithNamespacedDicts } from "../../types";

const punctuationSplittingRegex = /([!"“”#$%&'‘’()*,.:;<=>?@[\\\]^`{|}~—–-])/; // includes en and em dashes, curly quotes
// const punctuationSplittingWholeMatchRegex = /^[!"“”#$%&'‘’()*,./:;<=>?@[\\\]^`{|}~—–-]?$/; // includes en and em dashes, curly quotes
const strokeLookupAttemptsLimit = 12;

const createStrokeHintForPhrase = (
  wordOrPhraseMaterial: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  affixList = AffixList.getSharedInstance()
) => {
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
  let listOfWordsToLookUp = listOfWords.length;

  // Arbitrary limit to prevent making Typey Type slow from excess look ups
  if (listOfWordsToLookUp > strokeLookupAttemptsLimit) {
    listOfWordsToLookUp = strokeLookupAttemptsLimit;
    overLimit = true;
  }

  for (let i = 0; i < listOfWordsToLookUp; i++) {
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
  // 31 Oct 2022: these can possibly be removed now… e.g. we check for {?} before ? in `chooseOutlineForPhrase.ts` so it returns H-F not KWEZ and this hard-coded patch probably isn't needed
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

export default createStrokeHintForPhrase;
