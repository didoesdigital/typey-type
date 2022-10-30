import fingerspelledCharacters from "../../constant/fingerspelledCharacters";
import findFingerspellingOutline from "./findFingerspellingOutline";
import type { AffixObject, LookupDictWithNamespacedDicts } from "../../types";

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
) =>
  [...inputText]
    .map(
      (singleCharacter: string) =>
        findFingerspellingOutline(
          singleCharacter,
          globalLookupDictionary,
          fingerspelledCharacters[singleCharacter] || "",
          affixList
        ) || "xxx"
    )
    .join("/");

export default createFingerspellingStroke;
