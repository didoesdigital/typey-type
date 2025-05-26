import combineValidDictionaries from "./combineValidDictionaries";
import AFFIXES from "../affixes/affixes";
import testAffixes from "../affixes/testAffixes.fixtures";
import type { PersonalDictionaryNameAndContents } from "../../types";

describe("combining valid dictionaries without sorting", () => {
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

  it("returns a combined Map with strokes left unsorted which means dictionary insertion order and alphabetic where personal dictionaries are processed first, then Typey Type", () => {
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
      "1-R": "I",
      "P-R": "for",
      "WH": "when",
      "PHO": "no",
      "SPH": "some",
      "APBD": "and",
      "SOUPBD/-Z": "sounds",
    };

    let expectedCombinedDict = new Map([
      ["Typey Type", [["TAO*EUPT", "user:personal.json"]]],
      [
        "and",
        [
          ["SKP", "typey:typey-type-full.json"],
          ["APBD", "typey:typey-type-full.json"],
        ],
      ],
      ["to", [["TO", "typey:typey-type-full.json"]]],
      [
        "said",
        [
          ["SAEUD", "typey:typey-type-full.json"],
          ["SED", "typey:typey-type-full.json"],
        ],
      ],
      ["sed", [["SED", "user:overrides.json"]]],
      [
        "sounds",
        [
          ["SOUPBDZ", "typey:typey-type-full.json"],
          ["SOUPBD/-Z", "typey:typey-type-full.json"],
        ],
      ],
      [
        "he",
        [
          ["E", "user:misstrokes.json"],
          ["HE", "typey:typey-type-full.json"],
        ],
      ],
      ["of", [["-F", "typey:typey-type-full.json"]]],
      [
        "I",
        [
          ["EU", "typey:typey-type-full.json"],
          ["1-R", "typey:typey-type-full.json"],
        ],
      ],
      [
        "some",
        [
          ["SOPL", "typey:typey-type-full.json"],
          ["SPH", "typey:typey-type-full.json"],
        ],
      ],
      [
        "no",
        [
          ["TPHO", "typey:typey-type-full.json"],
          ["PHO", "typey:typey-type-full.json"],
        ],
      ],
      [
        "for",
        [
          ["TPOR", "typey:typey-type-full.json"],
          ["P-R", "typey:typey-type-full.json"],
        ],
      ],
      [
        "when",
        [
          ["WHEPB", "typey:typey-type-full.json"],
          ["WH", "typey:typey-type-full.json"],
        ],
      ],
    ]);

    expect(
      combineValidDictionaries(personalDictionaries, [
        [testTypeyTypeDict, "typey-type-full.json"],
      ])
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
      combineValidDictionaries(personalDictionaries, [
        [testTypeyTypeDict, "typey-type.json"],
      ])
    ).toEqual(expectedCombinedDict);
  });
});
