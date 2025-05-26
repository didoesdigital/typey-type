import misstrokesJSON from "../../json/misstrokes.json";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import AFFIXES from "../affixes/affixes";
import getAffixMisstrokesFromMisstrokes from "../affixes/getAffixMisstrokesFromMisstrokes";
import getAffixesFromLookupDict from "../affixes/getAffixesFromLookupDict";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import findSingleLetterWordOutline from "./findSingleLetterWordOutline";
import { testAffixes } from "./transformingDictionaries.fixtures";

import type {
  LookupDictWithNamespacedDicts,
  PersonalDictionaryNameAndContents,
  StenoDictionary,
} from "../../types";

const misstrokes = misstrokesJSON as StenoDictionary;

describe("findSingleLetterWordOutline", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      return testAffixes;
    });
  });

  beforeEach(() => {
    const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
    const customGlobalLookupDictionary = createGlobalLookupDictionary(
      emptyPersonalDictionaries,
      [
        [
          {
            "*EPB": "{^en}",
            "*PLT": "{^ment}",
            "A": "{a^}",
            "EUPB": "{in^}",
            "HREU": "{^ly}",
            "KAUPB": "{con^}",
            "EPBT": "{^ent}",
            "-D": "{^ed}",
          },
          LATEST_TYPEY_TYPE_FULL_DICT_NAME,
        ],
      ]
    );

    const customAffixMisstrokes = getAffixMisstrokesFromMisstrokes(misstrokes);
    const customTestAffixes = getAffixesFromLookupDict(
      customGlobalLookupDictionary,
      customAffixMisstrokes
    );

    AFFIXES.setSharedAffixes(customTestAffixes);
  });

  afterEach(() => {
    AFFIXES.setSharedAffixes({ prefixes: [], suffixes: [] });
  });

  it("returns outline for word “a” in the middle of a sentence with no personal dictionary entry", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("a", lookupDict, "AEU", affixList, " ")
    ).toEqual("AEU");
  });

  it("returns outline for word “a” in the middle of a sentence with personal dictionary entry for “a”", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "a",
        [
          ["AEUZ", "user:personal.json"],
          ["AEU", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("a", lookupDict, "AEU", affixList, " ")
    ).toEqual("AEUZ");
  });

  it("returns outline for word “A” at the start of a lesson with no personal dictionary entry", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["{}{-|}", [["KPA", "typey:typey-type.json"]]],
      ["{^}{-|}", [["KPA*", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "")
    ).toEqual("KPA/AEU");
  });

  it("returns outline for word “A” after a dash with no personal dictionary entry", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["{}{-|}", [["KPA", "typey:typey-type.json"]]],
      ["{^}{-|}", [["KPA*", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "-")
    ).toEqual("KPA*/AEU");
  });

  it("returns outline for word “A” at the start of a lesson with personal dictionary entry for “a” and capitalisation strokes", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "a",
        [
          ["AEUZ", "user:personal.json"],
          ["AEU", "typey:typey-type.json"],
        ],
      ],
      ["{}{-|}", [["KPA", "typey:typey-type.json"]]],
      [
        "{^}{-|}",
        [
          ["KPA*", "typey:typey-type.json"],
          ["KPA*Z", "user:personal.json"],
        ],
      ],
      [
        "{}{-|}",
        [
          ["KPAZ", "user:personal.json"],
          ["KPA", "plover:plover.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "")
    ).toEqual("KPAZ/AEUZ");
  });

  it("returns outline for word “I” at the start of a sentence is missing from global lookup dict", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, "")
    ).toEqual("EU");
  });

  it("returns outline for word “I” in the middle of a sentence with no personal dictionary entry", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["I", [["EU", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, " ")
    ).toEqual("EU");
  });

  it("returns outline for word “I” in the middle of a sentence with personal dictionary entry for “I”", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "I",
        [
          ["EUZ", "user:personal.json"],
          ["EU", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, " ")
    ).toEqual("EUZ");
  });

  it("returns outline for word “X” with no personal dictionary entry", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["X", [["10R", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("X", lookupDict, "10R", affixList, "")
    ).toEqual("10R");
  });

  it("returns outline for word “P” which is not a real single-letter word", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([]);
    expect(
      findSingleLetterWordOutline("P", lookupDict, "xxx", affixList, "")
    ).toEqual("xxx");
  });

  it("returns outline for word “V” with missing entry from global lookup dict", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([]);
    expect(
      findSingleLetterWordOutline("V", lookupDict, "5R", affixList, "")
    ).toEqual("5R");
  });

  it("returns outline for word “X” with personal dictionary entry for “X”", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "X",
        [
          ["10RZ", "user:personal.json"],
          ["10R", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("X", lookupDict, "10R", affixList, "")
    ).toEqual("10RZ");
  });
});
