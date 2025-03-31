import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testTypeyTypeExtras,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import unknownStroke from "../../constant/unknownStroke";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";

import type { PersonalDictionaryNameAndContents } from "../../types";

const testTypeyTypeFull = { ...testTypeyTypeDict, ...testTypeyTypeExtras };

const globalLookupDictionary = createGlobalLookupDictionary(
  personalDictionaries,
  [[testTypeyTypeFull, LATEST_TYPEY_TYPE_FULL_DICT_NAME]]
);

describe("recursively build stroke hint for phrase", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  describe("no matches", () => {
    describe("over limit", () => {
      it("handles a large number of unknown words with no fingerspelling fallbacks", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "çççççççççççççççççççççççççç";
        const result = recursiveBuildStrokeHint(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "KR*": "{&c}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AffixList.getSharedInstance(),
          25
        );
        expect(result).toEqual(unknownStroke);
      });
    });

    describe("under limit", () => {
      it("handles 1 unknown word with no fingerspelling fallbacks", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "ç";
        const result = recursiveBuildStrokeHint(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "KR*": "{&c}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AffixList.getSharedInstance(),
          0
        );
        expect(result).toEqual(unknownStroke);
      });
    });
  });
});
