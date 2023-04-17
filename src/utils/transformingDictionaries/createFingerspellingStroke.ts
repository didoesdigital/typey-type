import fingerspelledCharacters from "../../constant/fingerspelledCharacters";
import findFingerspellingOutline from "./findFingerspellingOutline";
import unknownStroke from "../../constant/unknownStroke";

import type {
  AffixObject,
  LookupDictWithNamespacedDicts,
  Outline,
  UnknownStroke,
} from "../../types";

/**
 * Examples:
 * "store"
 * "room"
 * '"To-morrow'
 * "snubbed"
 * "€100"
 */
type InputText = string;

const createFingerspellingStroke = (
  inputText: InputText,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  affixList: AffixObject
): Outline | UnknownStroke =>
  [...inputText]
    .map(
      (singleCharacter: string) =>
        // (singleCharacter: string, i) =>
        findFingerspellingOutline(
          singleCharacter,
          globalLookupDictionary,
          fingerspelledCharacters[singleCharacter] || "",
          affixList
          // i === 0 ? "" : [...inputText][i - 1].slice(-1)
        ) || unknownStroke
    )
    .join("/");

export default createFingerspellingStroke;
