import AFFIXES from "./affixes/affixes";
import lookupListOfStrokesAndDicts from "./lookupListOfStrokesAndDicts";
import { testAffixes } from "./transformingDictionaries/transformingDictionaries.fixtures";

import type {
  DictionaryConfig,
  LookupDictWithNamespacedDicts,
  LookupDictWithNamespacedDictsAndConfig,
  StrokeAndDictionaryAndNamespace,
} from "types";

describe("lookup list of strokes and dicts with punctuation with carry capitalisation", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      return testAffixes;
    });
  });

  const lookupDictionary: LookupDictWithNamespacedDicts = new Map(
    Object.entries({
      "ago": [["AG", "typey:typey-type.json"]],
      '{~|"^}': [["KW-GS", "typey:typey-type.json"]],
      '{^~|"}': [["KR-GS", "typey:typey-type.json"]],
    })
  );
  const config: DictionaryConfig = {
    configuration: ["typey:typey-type.json"],
  };
  lookupDictionary.configuration = config.configuration;

  const globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig =
    lookupDictionary as LookupDictWithNamespacedDictsAndConfig;

  it("shows list of strokes and dictionary for word without whitespace", () => {
    const phrase = "ago";
    const listOfStrokesAndDicts = [["AG", "typey-type.json", "typey"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase]
    );
  });

  it("shows list of strokes and dictionary for word with preceding whitespace", () => {
    const phrase = " ago";
    const listOfStrokesAndDicts = [["AG", "typey-type.json", "typey"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  it("shows list of strokes and dictionary for closing quote without whitespace", () => {
    const phrase = '"';
    const listOfStrokesAndDicts = [["KW-GS", "typey-type.json", "typey"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, '{~|"^}']
    );
  });

  it("shows list of strokes and dictionary for closing quote with trailing whitespace", () => {
    const phrase = '" ';
    const listOfStrokesAndDicts = [["KR-GS", "typey-type.json", "typey"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, '{^~|"}']
    );
  });
});

describe("lookup list of strokes and dicts with fingerspelling and single-letter words", () => {
  const lookupDictionary: LookupDictWithNamespacedDicts = new Map(
    Object.entries({
      "{a^}": [
        ["AEU", "user:personal.json"],
        ["A", "typey:typey-type.json"],
      ],
      "a": [
        ["A", "user:personal.json"],
        ["AEU", "typey:typey-type.json"],
      ],
      "{>}{&a}": [
        ["A*", "user:personal.json"],
        ["A*", "typey:typey-type.json"],
      ],
      "{&A}": [
        ["A*P", "user:personal.json"],
        ["A*P", "typey:typey-type.json"],
      ],
      "{>}{&x}": [
        ["BGS", "user:personal.json"],
        ["KP-FPLT", "user:personal.json"],
        ["KP*", "typey:typey-type.json"],
      ],
      "{&X}": [
        ["*BGS", "user:personal.json"],
        ["KP*FPLT", "user:personal.json"],
        ["XP*P", "typey:typey-type.json"],
      ],
      "I": [
        ["EU", "user:personal.json"],
        ["EU", "typey:typey-type.json"],
      ],
      "{>}{&i}": [
        ["EUFPLT", "user:personal.json"],
        ["EUP", "typey:typey-type.json"],
      ],
      "{&I}": [
        ["*EUFPLT", "user:personal.json"],
        ["*EUP", "typey:typey-type.json"],
      ],
      "{>}{&z}": [
        ["SKPWR-FPLT", "user:personal.json"],
        ["SKPWR*", "typey:typey-type.json"],
      ],
      "{&Z}": [
        ["SKPWR*FPLT", "user:personal.json"],
        ["SKPWR*P", "typey:typey-type.json"],
      ],
      "{&%}": [
        ["P*ERS", "user:personal.json"],
        ["P*ERS", "plover:plover.json"],
      ],
      "{&&}": [["SKP*", "plover:plover.json"]],
      "&&": [["SPHAPBD/SPHAPBD", "plover:plover.json"]],
      "{&}": [["SKP*", "user:personal.json"]],
      "&": [["SP-PBD", "plover:plover.json"]],
    })
  );
  lookupDictionary.configuration = [
    "typey:typey-type.json",
    "user:personal.json",
    "plover:plover.json",
  ];
  const globalLookupDictionary =
    lookupDictionary as LookupDictWithNamespacedDictsAndConfig;

  it("shows list of strokes and dictionary for fingerspelled letter “a” without whitespace", () => {
    const phrase = "a";
    const listOfStrokesAndDicts = [
      ["A*", "personal.json", "user"],
      ["A*", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "{>}{&a}"]
    );
  });

  it("shows list of strokes and dictionary for word “ a” with whitespace", () => {
    const phrase = " a";
    const listOfStrokesAndDicts = [
      ["A", "personal.json", "user"],
      ["AEU", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  it("shows list of strokes and dictionary for word “a ” with trailing whitespace", () => {
    const phrase = "a ";
    const listOfStrokesAndDicts = [
      ["A", "personal.json", "user"],
      ["AEU", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimEnd()]
    );
  });

  it("shows list of strokes and dictionary for fingerspelled letter “A” without whitespace", () => {
    const phrase = "A";
    const listOfStrokesAndDicts = [
      ["A*P", "personal.json", "user"],
      ["A*P", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "{&A}"]
    );
  });

  // TODO: might be wrong expectation
  it("shows list of strokes and dictionary for word “ A” with whitespace", () => {
    const phrase = " A";
    const listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[] = [];
    // TODO: make this possible:
    // let listOfStrokesAndDicts = [
    //   ["KPA/A", "personal.json", "user"],
    //   ["KPA/AEU", "typey-type.json", "typey"]
    // ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  it("shows list of strokes and dictionary for fingerspelled letter “i” without whitespace", () => {
    const phrase = "i";
    const listOfStrokesAndDicts = [
      ["EUFPLT", "personal.json", "user"],
      ["EUP", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "{>}{&i}"]
    );
  });

  it("shows list of strokes and dictionary for word “ i” with whitespace", () => {
    const phrase = " i";
    const listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[] = [];
    // TODO: make this possible:
    // let listOfStrokesAndDicts = [
    //   ["*EU", "personal.json", "user"],
    //   ["*EU", "typey-type.json", "typey"]
    // ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  it("shows list of strokes and dictionary for fingerspelled letter “I” without whitespace", () => {
    const phrase = "I";
    const listOfStrokesAndDicts = [
      ["*EUFPLT", "personal.json", "user"],
      ["*EUP", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "{&I}"]
    );
  });

  it("shows list of strokes and dictionary for word “ I” with whitespace", () => {
    const phrase = " I";
    const listOfStrokesAndDicts = [
      ["EU", "personal.json", "user"],
      ["EU", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  it("shows list of strokes and dictionary for fingerspelled letter “x” without whitespace", () => {
    const phrase = "x";
    const listOfStrokesAndDicts = [
      ["BGS", "personal.json", "user"],
      ["KP-FPLT", "personal.json", "user"],
      ["KP*", "typey-type.json", "typey"],
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "{>}{&x}"]
    );
  });

  it("shows list of strokes and dictionary for word “ x” with whitespace", () => {
    const phrase = " x";
    const listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[] = [];
    // TODO: make this possible:
    // let listOfStrokesAndDicts = [
    //   [KP-FPLT", "personal.json", "user"],
    //   [KP", "typey-type.json", "typey"]
    // ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  // TODO: might be wrong expectation
  it("shows list of strokes and dictionary for word “&” unspaced", () => {
    const phrase = "&";
    const listOfStrokesAndDicts = [["SP-PBD", "plover.json", "plover"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase]
    );
  });

  // TODO: might be wrong expectation
  it("shows list of strokes and dictionary for word “&&” unspaced", () => {
    const phrase = "&&";
    const listOfStrokesAndDicts = [["SPHAPBD/SPHAPBD", "plover.json", "plover"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase]
    );
  });

  it("shows list of strokes and dictionary for word “ &” with leading whitespace", () => {
    const phrase = " &";
    const listOfStrokesAndDicts = [["SP-PBD", "plover.json", "plover"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });

  it("shows list of strokes and dictionary for word “ &&” with leading whitespace", () => {
    const phrase = " &&";
    const listOfStrokesAndDicts = [["SPHAPBD/SPHAPBD", "plover.json", "plover"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, phrase.trimStart()]
    );
  });
});

describe("lookup list of strokes and dicts with capitalization dictionary formatting", () => {
  const lookupDictionary: LookupDictWithNamespacedDicts = new Map(
    Object.entries({
      "Mx.{-|}": [["PH-BGS", "typey:typey-type-full.json"]],
      "{~|'^}til": [["T*EUL", "typey:typey-type-full.json"]],
    })
  );
  lookupDictionary.configuration = ["typey:typey-type-full.json"];
  const globalLookupDictionary =
    lookupDictionary as LookupDictWithNamespacedDictsAndConfig;

  it("shows list of strokes and dictionary for “Mx.” that use capitalize next word dictionary formatting", () => {
    const phrase = "Mx.";
    const listOfStrokesAndDicts = [["PH-BGS", "typey-type-full.json", "typey"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "Mx.{-|}"]
    );
  });

  it("shows list of strokes and dictionary for “'til” that use carry capitalization dictionary formatting", () => {
    const phrase = "'til";
    const listOfStrokesAndDicts = [["T*EUL", "typey-type-full.json", "typey"]];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(
      [listOfStrokesAndDicts, "{~|'^}til"]
    );
  });
});
