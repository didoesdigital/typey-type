import findSingleLetterWordOutline from "./findSingleLetterWordOutline";
import { AffixList } from "../affixList";
import type { LookupDictWithNamespacedDicts } from "../../types";

describe("findSingleLetterWordOutline", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{^en}", [["*EPB", "typey:typey-type.json"]]],
        ["{^ment}", [["*PLT", "typey:typey-type.json"]]],
        ["{a^}", [["A", "typey:typey-type.json"]]],
        ["{in^}", [["EUPB", "typey:typey-type.json"]]],
        ["{^ly}", [["HREU", "typey:typey-type.json"]]],
        ["{con^}", [["KAUPB", "typey:typey-type.json"]]],
        ["{^ent}", [["EPBT", "typey:typey-type.json"]]],
        ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns outline for word “a” in the middle of a sentence with no personal dictionary entry", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("a", lookupDict, "AEU", affixList, " ")
    ).toEqual("AEU");
  });

  it("returns outline for word “a” in the middle of a sentence with personal dictionary entry for “a”", () => {
    const affixList = AffixList.getSharedInstance();
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
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["{ }{-|}", [["KPA", "typey:typey-type.json"]]],
      ["{^}{-|}", [["KPA*", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "")
    ).toEqual("KPA/AEU");
  });

  it("returns outline for word “A” after a dash with no personal dictionary entry", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["{ }{-|}", [["KPA", "typey:typey-type.json"]]],
      ["{^}{-|}", [["KPA*", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "-")
    ).toEqual("KPA*/AEU");
  });

  it("returns outline for word “A” at the start of a lesson with personal dictionary entry for “a” and capitalisation strokes", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "a",
        [
          ["AEUZ", "user:personal.json"],
          ["AEU", "typey:typey-type.json"],
        ],
      ],
      ["{ }{-|}", [["KPA", "typey:typey-type.json"]]],
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
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, "")
    ).toEqual("EU");
  });

  it("returns outline for word “I” in the middle of a sentence with no personal dictionary entry", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["I", [["EU", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, " ")
    ).toEqual("EU");
  });

  it("returns outline for word “I” in the middle of a sentence with personal dictionary entry for “I”", () => {
    const affixList = AffixList.getSharedInstance();
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
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["X", [["10R", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("X", lookupDict, "10R", affixList, "")
    ).toEqual("10R");
  });

  it("returns outline for word “P” which is not a real single-letter word", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([]);
    expect(
      findSingleLetterWordOutline("P", lookupDict, "xxx", affixList, "")
    ).toEqual("xxx");
  });

  it("returns outline for word “V” with missing entry from global lookup dict", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([]);
    expect(
      findSingleLetterWordOutline("V", lookupDict, "5R", affixList, "")
    ).toEqual("5R");
  });

  it("returns outline for word “X” with personal dictionary entry for “X”", () => {
    const affixList = AffixList.getSharedInstance();
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
