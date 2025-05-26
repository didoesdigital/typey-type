import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import unknownStroke from "../../constant/unknownStroke";
import AFFIXES from "../affixes/affixes";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import { testAffixes } from "./transformingDictionaries.fixtures";

import type { PersonalDictionaryNameAndContents } from "../../types";

describe("recursively build stroke hint for phrase", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      return testAffixes;
    });
  });

  beforeEach(() => {
    AFFIXES.setSharedAffixes(testAffixes);
  });

  afterEach(() => {
    AFFIXES.setSharedAffixes({ prefixes: [], suffixes: [] });
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
          AFFIXES.getSharedAffixes(),
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
          AFFIXES.getSharedAffixes(),
          0
        );
        expect(result).toEqual(unknownStroke);
      });
    });
  });
});
