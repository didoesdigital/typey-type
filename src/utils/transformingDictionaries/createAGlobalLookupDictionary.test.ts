import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import type { PersonalDictionaryNameAndContents } from "../../types";

const globalLookupDictionary = createAGlobalLookupDictionary(
  personalDictionaries,
  testTypeyTypeDict,
  testPloverDict
);

describe("create a global lookup dictionary", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns combined lookup Map of words with strokes and their source dictionaries", () => {
    let personalDicts: PersonalDictionaryNameAndContents[] = [
      ["personal.json", { "TAO*EUPT": "Typey Type" }],
    ];
    let typeyDict = { "SKP": "and" };
    let ploverDict = {
      "APBD": "and",
      "SKP": "and",
      "SP": "and",
    };
    let expectedGlobalDict = new Map([
      ["Typey Type", [["TAO*EUPT", "user:personal.json"]]],
      [
        "and",
        [
          ["SKP", "typey:typey-type.json"],
          ["APBD", "plover:plover-main-3-jun-2018.json"],
          ["SKP", "plover:plover-main-3-jun-2018.json"],
          ["SP", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
    ]);
    expect(
      createAGlobalLookupDictionary(personalDicts, typeyDict, ploverDict)
    ).toEqual(expectedGlobalDict);
  });
});
