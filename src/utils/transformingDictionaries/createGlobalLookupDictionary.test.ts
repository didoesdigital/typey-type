import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import AFFIXES from "../affixes/affixes";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import { testAffixes } from "./transformingDictionaries.fixtures";

import type { PersonalDictionaryNameAndContents } from "../../types";

describe("create a global lookup dictionary", () => {
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

  it("returns combined lookup Map of words with strokes and their source dictionaries", () => {
    const personalDicts: PersonalDictionaryNameAndContents[] = [
      ["personal.json", { "TAO*EUPT": "Typey Type" }],
    ];
    const typeyDict = {
      "SKP": "and",
      "APBD": "and",
    };
    const expectedGlobalDict = new Map([
      ["Typey Type", [["TAO*EUPT", "user:personal.json"]]],
      [
        "and",
        [
          ["SKP", "typey:typey-type-full.json"],
          ["APBD", "typey:typey-type-full.json"],
        ],
      ],
    ]);
    expect(
      createGlobalLookupDictionary(personalDicts, [
        [typeyDict, LATEST_TYPEY_TYPE_FULL_DICT_NAME],
      ])
    ).toEqual(expectedGlobalDict);
  });
});
