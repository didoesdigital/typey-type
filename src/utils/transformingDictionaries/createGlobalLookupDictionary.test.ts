import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testTypeyTypeExtras,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import type { PersonalDictionaryNameAndContents } from "../../types";

const testTypeyTypeFull = { ...testTypeyTypeDict, ...testTypeyTypeExtras };

const globalLookupDictionary = createGlobalLookupDictionary(
  personalDictionaries,
  [[testTypeyTypeFull, LATEST_TYPEY_TYPE_FULL_DICT_NAME]]
);

describe("create a global lookup dictionary", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  it("returns combined lookup Map of words with strokes and their source dictionaries", () => {
    let personalDicts: PersonalDictionaryNameAndContents[] = [
      ["personal.json", { "TAO*EUPT": "Typey Type" }],
    ];
    let typeyDict = {
      "SKP": "and",
      "APBD": "and",
    };
    let expectedGlobalDict = new Map([
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
