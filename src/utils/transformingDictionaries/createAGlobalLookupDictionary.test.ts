import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testTypeyTypeExtras,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import type { PersonalDictionaryNameAndContents } from "../../types";

const testTypeyTypeFull = { ...testTypeyTypeDict, ...testTypeyTypeExtras };

const globalLookupDictionary = createAGlobalLookupDictionary(
  personalDictionaries,
  testTypeyTypeFull,
  {}
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
    let typeyDict = {
      "SKP": "and",
      "APBD": "and",
    };
    let expectedGlobalDict = new Map([
      ["Typey Type", [["TAO*EUPT", "user:personal.json"]]],
      [
        "and",
        [
          ["SKP", "typey:typey-type.json"],
          ["APBD", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(createAGlobalLookupDictionary(personalDicts, typeyDict, {})).toEqual(
      expectedGlobalDict
    );
  });
});
