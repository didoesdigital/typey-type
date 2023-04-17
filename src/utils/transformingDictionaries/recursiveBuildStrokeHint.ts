import { AffixList } from "../affixList";
import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import splitOnPrefix from "./splitOnPrefix";
import splitOnPrefixWithHyphen from "./splitOnPrefixWithHyphen";
import splitOnSuffix from "./splitOnSuffix";
import splitOnSuffixWithHyphen from "./splitOnSuffixWithHyphen";
import splitOnSuffixWithFullStop from "./splitOnSuffixWithFullStop";
import splitOnRegex from "./splitOnRegex";
import splitOnSpace from "./splitOnSpace";
import createFingerspellingStroke from "./createFingerspellingStroke";
import unknownStroke from "../../constant/unknownStroke";
import strokeLimit from "../../constant/strokeLimit";

import type {
  AffixObject,
  LookupDictWithNamespacedDicts,
  Outline,
  UnknownStroke,
} from "../../types";

export type SplitterArgs = [
  wordOrPhraseMaterial: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  affixList: AffixObject,
  depth: number,
  precedingChar: string
];

export type SplitterFunction = (...args: SplitterArgs) => Outline | null;

const limit = strokeLimit + 1;

/**
 * Recursively chooses outlines for words and splits the phrase until all words are found or fingerspelled or indicates an unknown stroke
 *
 * @remarks
 * This method is used for producing a string of strokes as a hint for how to write a phrase.
 *
 * WARNING: The phrase may include JavaScript words such as `hasOwnProperty` that could break behaviour if not careful.
 *
 * Examples:
 * `it can't`
 * `KPWHO`
 *
 * `'twas`
 * `TWA*S`
 *
 * `hasOwnProperty`
 * `HAS/OEPB/PROT`
 *
 * @param wordOrPhraseMaterial - a piece of material, ideally with no internal spaces except for phrasing briefs
 * @param globalLookupDictionary
 * @param affixList
 * @param depth - prevents deep recursion
 * @param precedingChar - initial preceding character to manage first word's capitalisation and spacing strokes
 *
 */
const recursiveBuildStrokeHint = (
  wordOrPhraseMaterial: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  affixList = AffixList.getSharedInstance(),
  depth: number,
  precedingChar = ""
): null | Outline | UnknownStroke => {
  if (depth > limit) {
    return unknownStroke;
  }
  // These should be removed and instead handled by logic in the future:
  const hardCodedPatches = new Map([
    ["it'd", "T*D"], // should prioritise phrasing brief starts
    ["why it's", "KWR/T-S"], // should use space separated outlines for different words
  ]);
  const foundHardCodedPatch = hardCodedPatches.get(wordOrPhraseMaterial);
  if (foundHardCodedPatch) {
    return foundHardCodedPatch;
  }

  // Whole match:
  let stroke = "";
  let strokeLookupAttempts = depth;
  [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(
    wordOrPhraseMaterial,
    globalLookupDictionary,
    stroke,
    strokeLookupAttempts,
    precedingChar,
    affixList
  );
  if (stroke !== "xxx") return stroke;

  const splitterArgs: SplitterArgs = [
    wordOrPhraseMaterial,
    globalLookupDictionary,
    affixList,
    depth++,
    precedingChar,
  ];

  const splitOnEmDash = splitOnRegex(/(—)/);
  const splitOnApostropheEss = splitOnRegex(/('s)[ ]?\b/);
  const splitOnComma = splitOnRegex(/(,)[ ]?/);
  const splitOnDash = splitOnRegex(/(-)/);
  const splitOnDubQuote = splitOnRegex(/(")/);
  const splitOnSingleQuote = splitOnRegex(/(')/);
  const splitOnColon = splitOnRegex(/(:)/);
  const splitOnSemiColon = splitOnRegex(/(;)/);
  const splitOnFullStop = splitOnRegex(/(\.)/);
  const splitOnOtherSymbols = splitOnRegex(/(\p{Symbol})/gu);
  const splitOnOtherPunctuation = splitOnRegex(/(\p{Punctuation})/gu);

  const splitsToTry = [
    splitOnEmDash,
    splitOnSpace,
    splitOnSuffixWithFullStop,
    splitOnPrefixWithHyphen,
    splitOnSuffixWithHyphen,
    splitOnDubQuote,
    splitOnComma,
    splitOnDash,
    splitOnApostropheEss,
    splitOnSingleQuote,
    splitOnColon,
    splitOnSemiColon,
    splitOnFullStop,
    splitOnOtherSymbols,
    splitOnOtherPunctuation,
    splitOnPrefix,
    splitOnSuffix,
  ];

  for (let i = 0; i < splitsToTry.length; i++) {
    const splitter = splitsToTry[i];
    const splitStrokes = splitter.apply(null, splitterArgs);
    if (splitStrokes !== null) {
      return splitStrokes;
    }
  }

  const fingerspelledStrokes: Outline | UnknownStroke =
    createFingerspellingStroke(
      wordOrPhraseMaterial,
      globalLookupDictionary,
      affixList
    );

  if (fingerspelledStrokes !== null) return fingerspelledStrokes;

  return null;
};

export default recursiveBuildStrokeHint;
