import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import unknownStroke from "../../constant/unknownStroke";

import type { PersonalDictionaryNameAndContents } from "../../types";

const globalLookupDictionary = createAGlobalLookupDictionary(
  personalDictionaries,
  testTypeyTypeDict,
  testPloverDict
);

describe("recursively build stroke hint for phrase", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  describe("no matches", () => {
    describe("over limit", () => {
      it("handles a large number of unknown words with no fingerspelling fallbacks", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "çççççççççççççççççççççççççç";
        const result = recursiveBuildStrokeHint(
          wordOrPhraseMaterial,
          createAGlobalLookupDictionary(
            emptyPersonalDictionaries,
            {
              "KR*": "{&c}",
            },
            {}
          ),
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
          createAGlobalLookupDictionary(
            emptyPersonalDictionaries,
            {
              "KR*": "{&c}",
            },
            {}
          ),
          AffixList.getSharedInstance(),
          0
        );
        expect(result).toEqual(unknownStroke);
      });
    });
  });
});
