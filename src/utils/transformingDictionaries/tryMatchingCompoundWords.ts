import createFingerspellingStroke from './createFingerspellingStroke';
import chooseOutlineForPhrase from './chooseOutlineForPhrase';
import type { AffixObject, LookupDictWithNamespacedDicts } from "../../types";
import getRankedOutlineFromLookupEntry from './getRankedOutlineFromLookupEntry';

type TryMatchingCompoundWordsResult = [string, string, number];

const tryMatchingCompoundWords = (
    compoundWordParts: string[],
    globalLookupDictionary: LookupDictWithNamespacedDicts,
    strokes: string,
    stroke: string,
    strokeLookupAttempts: number,
    affixList: AffixObject
  ): TryMatchingCompoundWordsResult => {
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

export default tryMatchingCompoundWords;
