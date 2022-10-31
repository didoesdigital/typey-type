import combineValidDictionaries from "./combineValidDictionaries";
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import { AffixList } from "../affixList";
import type { PersonalDictionaryNameAndContents } from "../../types";

const globalLookupDictionary = createAGlobalLookupDictionary(
  personalDictionaries,
  testTypeyTypeDict,
  testPloverDict
);

describe("combining valid dictionaries without sorting", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns a combined Map with strokes left unsorted which means dictionary insertion order and alphabetic where personal dictionaries are processed first, then Typey Type, then Plover", () => {
    let personalDictionaries: PersonalDictionaryNameAndContents[] = [
      ["personal.json", { "TAO*EUPT": "Typey Type" }],
      ["overrides.json", { "SED": "sed" }],
      ["misstrokes.json", { "E": "he" }],
    ];

    let testTypeyTypeDict = {
      "-F": "of",
      "EU": "I",
      "HE": "he",
      "SAEUD": "said",
      "SED": "said",
      "SKP": "and",
      "SOPL": "some",
      "SOUPBDZ": "sounds",
      "TO": "to",
      "TPHO": "no",
      "TPOR": "for",
      "WHEPB": "when",
    };

    let testPloverDict = {
      "*F": "of",
      "-F": "of",
      "1-R": "I",
      "APBD": "and",
      "E": "he",
      "HE": "he",
      "O": "to",
      "P-R": "for",
      "PHO": "no",
      "SAEUD": "said",
      "SED": "said",
      "SKP": "and",
      "SOUPBD/-Z": "sounds",
      "SOUPBDZ": "sounds",
      "SOUPBSD": "sounds",
      "SP": "and",
      "SPH": "some",
      "WH": "when",
    };

    let expectedCombinedDict = new Map([
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
      [
        "to",
        [
          ["TO", "typey:typey-type.json"],
          ["O", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "said",
        [
          ["SAEUD", "typey:typey-type.json"],
          ["SED", "typey:typey-type.json"],
          ["SAEUD", "plover:plover-main-3-jun-2018.json"],
          ["SED", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      ["sed", [["SED", "user:overrides.json"]]],
      [
        "sounds",
        [
          ["SOUPBDZ", "typey:typey-type.json"],
          ["SOUPBD/-Z", "plover:plover-main-3-jun-2018.json"],
          ["SOUPBDZ", "plover:plover-main-3-jun-2018.json"],
          ["SOUPBSD", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "he",
        [
          ["E", "user:misstrokes.json"],
          ["HE", "typey:typey-type.json"],
          ["E", "plover:plover-main-3-jun-2018.json"],
          ["HE", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "of",
        [
          ["-F", "typey:typey-type.json"],
          ["*F", "plover:plover-main-3-jun-2018.json"],
          ["-F", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "I",
        [
          ["EU", "typey:typey-type.json"],
          ["1-R", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "some",
        [
          ["SOPL", "typey:typey-type.json"],
          ["SPH", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "no",
        [
          ["TPHO", "typey:typey-type.json"],
          ["PHO", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "for",
        [
          ["TPOR", "typey:typey-type.json"],
          ["P-R", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
      [
        "when",
        [
          ["WHEPB", "typey:typey-type.json"],
          ["WH", "plover:plover-main-3-jun-2018.json"],
        ],
      ],
    ]);

    expect(
      combineValidDictionaries(
        personalDictionaries,
        testTypeyTypeDict,
        testPloverDict
      )
    ).toEqual(expectedCombinedDict);
  });

  it("returns a combined Map with no Plover dict", () => {
    let personalDictionaries: PersonalDictionaryNameAndContents[] = [
      ["personal.json", { "TAO*EUPT": "Typey Type" }],
      ["overrides.json", { "SED": "sed" }],
      ["misstrokes.json", { "E": "he" }],
    ];

    let testTypeyTypeDict = {
      "-F": "of",
      "EU": "I",
      "HE": "he",
      "SAEUD": "said",
      "SED": "said",
      "SKP": "and",
      "SOPL": "some",
      "SOUPBDZ": "sounds",
      "TO": "to",
      "TPHO": "no",
      "TPOR": "for",
      "WHEPB": "when",
    };

    let expectedCombinedDict = new Map([
      ["Typey Type", [["TAO*EUPT", "user:personal.json"]]],
      ["and", [["SKP", "typey:typey-type.json"]]],
      ["to", [["TO", "typey:typey-type.json"]]],
      [
        "said",
        [
          ["SAEUD", "typey:typey-type.json"],
          ["SED", "typey:typey-type.json"],
        ],
      ],
      ["sed", [["SED", "user:overrides.json"]]],
      ["sounds", [["SOUPBDZ", "typey:typey-type.json"]]],
      [
        "he",
        [
          ["E", "user:misstrokes.json"],
          ["HE", "typey:typey-type.json"],
        ],
      ],
      ["of", [["-F", "typey:typey-type.json"]]],
      ["I", [["EU", "typey:typey-type.json"]]],
      ["some", [["SOPL", "typey:typey-type.json"]]],
      ["no", [["TPHO", "typey:typey-type.json"]]],
      ["for", [["TPOR", "typey:typey-type.json"]]],
      ["when", [["WHEPB", "typey:typey-type.json"]]],
    ]);

    expect(
      combineValidDictionaries(personalDictionaries, testTypeyTypeDict)
    ).toEqual(expectedCombinedDict);
  });
});
