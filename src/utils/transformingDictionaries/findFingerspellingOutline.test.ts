import findFingerspellingOutline from "./findFingerspellingOutline";
import { AffixList } from "../affixList";
import type { LookupDictWithNamespacedDicts } from "../../types";

describe("findFingerspellingOutline", () => {
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

  it('returns fingerspelled outline for phrase `houses?" It`', () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{?}", [["H-F", "typey:typey-type.json"]]],
      ["it", [["EUT", "typey:typey-type.json"]]],
      ["houses", [["HOUSZ", "typey:typey-type.json"]]],
      ["{}{-|}", [["KPA", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline('"', lookupDict, "KR-GS", affixList, "?")
    ).toEqual("KR-GS");
  });

  it("returns fingerspelled outline from personal dict for glued B", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "{&B}",
        [
          ["-BZ", "my-personal-dict.json"],
          ["PW*FPLT", "my-personal-dict.json"],
        ],
      ],
      ["{&L}", [["-LZ", "my-personal-dict.json"]]],
    ]);
    expect(
      findFingerspellingOutline("B", lookupDict, "PW*P", affixList, "")
    ).toEqual("-BZ");
  });

  it("returns fingerspelled outline from personal dict for C", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "{&B}",
        [
          ["-BZ", "my-personal-dict.json"],
          ["PW*FPLT", "my-personal-dict.json"],
        ],
      ],
      ["{&L}", [["-LZ", "my-personal-dict.json"]]],
    ]);
    expect(
      findFingerspellingOutline("C", lookupDict, "KR*P", affixList, "")
    ).toEqual("KR*P");
  });

  it("returns fingerspelled outline for letter e in grinned, which has no available outline for phrase, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["grin", [["TKPWREUPB", "typey:typey-type.json"]]],
      ["{^ed}", [["-D", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("*E");
  });

  it("returns on-the-fly fingerspelled outline for letter e in grinned with no personal dicts with available outline for phrase, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["grin", [["TKPWREUPB", "typey:typey-type.json"]]],
      ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ["{>}{&e}", [["*E", "typey:typey-type.json"]]],
      ["{&e}", [["*E", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("*E");
  });

  it("returns on-the-fly fingerspelled outline for letter e in grinned with personal dicts with no available outline for phrase, and with alternative letter fingerspelling outline", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["grin", [["TKPWREUPB", "typey:typey-type.json"]]],
      ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ["{&e}", [["EFPLT", "user:fingerspelling-FPLT.json"]]],
      ["{>}{&e}", [["*E", "typey:typey-type.json"]]],
      // ["{&e}", [["*E", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("EFPLT");
  });

  it("returns hard-coded number format for on-the-fly fingerspelled outline for 0 in “20/20.” with no personal dicts with no available outline for phrase", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      // ["{&0}", [
      //   ["#O", "typey:typey-type.json"],
      // ]],
    ]);
    expect(
      findFingerspellingOutline("0", lookupDict, "0", affixList, undefined)
    ).toEqual("0"); // thanks to FINGERSPELLED_LETTERS
  });

  it("returns on-the-fly fingerspelled outline for 0 in “20/20.” with personal dicts with no available outline for phrase, and with alternative number fingerspelling outline", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "{&0}",
        [
          ["#O", "typey:typey-type.json"],
          ["#O", "user:numbers.json"],
          ["#0", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findFingerspellingOutline("0", lookupDict, "0", affixList, undefined)
    ).toEqual("#O");
  });

  it("returns on-the-fly fingerspelled outline for symbol with no personal dicts with available outline for phrase, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["&", [["SKP", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("&", lookupDict, "SKP*", affixList, "")
    ).toEqual("SKP*");
  });

  it("returns on-the-fly fingerspelled outline for symbol with personal dicts, specifically ampersand in phrase “&c.”", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{&&}", [["SP-PBD", "user:punctuation.json"]]],
      [
        "&",
        [
          ["SP-PBD", "user:punctuation.json"],
          // ["SKP", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findFingerspellingOutline("&", lookupDict, "SKP*", affixList, "")
    ).toEqual("SP-PBD");
  });

  it("returns on-the-fly fingerspelled outline for [ in “[1]” with preceding space character", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["[", [["PWR-BT", "plover:plover.json"]]],
      ["{[}", [["PWR-BG", "typey:typey-type.json"]]],
      [
        "{^[^}",
        [
          ["PWR-BGT", "typey:typey-type.json"],
          ["PWR-BG", "plover:plover.json"],
          ["PWR*BGS", "plover:plover.json"],
        ],
      ],
      ["{[^}", [["PWR-BGT", "plover:plover.json"]]],
    ]);
    expect(
      findFingerspellingOutline("[", lookupDict, "PWR-BGT", affixList, " ")
    ).toEqual("PWR-BG");
  });

  it("returns on-the-fly fingerspelled outline for [ in “.[” with no preceding character", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["[", [["PWR-BT", "plover:plover.json"]]],
      ["{[}", [["PWR-BG", "typey:typey-type.json"]]],
      [
        "{^[^}",
        [
          ["PWR-BGT", "typey:typey-type.json"],
          ["PWR-BG", "plover:plover.json"],
          ["PWR*BGS", "plover:plover.json"],
        ],
      ],
      ["{[^}", [["PWR-BGT", "plover:plover.json"]]],
    ]);
    expect(
      findFingerspellingOutline("[", lookupDict, "PWR-BGT", affixList, "")
    ).toEqual("PWR-BGT");
  });

  it("returns on-the-fly fingerspelled outline for comma in “krr,”", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        ",",
        [
          ["KW-BG", "typey:typey.json"],
          ["KW-BG", "plover:plover.json"],
        ],
      ],
    ]);
    expect(
      findFingerspellingOutline(",", lookupDict, "KW-BG", affixList, undefined)
    ).toEqual("KW-BG");
  });

  it("returns on-the-fly fingerspelled outline for — em dash in “—whack—”", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      // [
      //   "—",
      //   [
      //     ["PH-RB", "user:dict.json" ],
      //     ["PH-RB", "plover:plover.json"],
      //   ],
      // ],
      [
        "{^}—{^}",
        [
          ["PH-RB", "typey:typey-type.json"],
          // ["EPL/TKA*RB", "user:punctuation-unspaced.json",],
          // ["SPWO*L/EPL/TKARB", "user:symbols.json",]
        ],
      ],
    ]);
    expect(
      findFingerspellingOutline("—", lookupDict, "EPL/TKA*RB", affixList, " ")
    ).toEqual("EPL/TKA*RB"); // thanks to FINGERSPELLED_LETTERS
  });

  it("returns on-the-fly fingerspelled outline for “t” in “t'other” with preceding space char", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["t", [["T*/SP-S", "typey:typey-type.json"]]],
      ["other", [["OER", "typey:typey-type.json"]]],
      ["{'^}", [["A*E", "typey:typey-type.json"]]],
      ["{^'}", [["AE", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("t", lookupDict, "T*", affixList, " ")
    ).toEqual("T*/SP-S");
  });

  it("returns on-the-fly fingerspelled outline for “s” in “Carnations;” with no preceding char", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["carnation", [["KARPB/AEUGS", "typey:typey-type.json"]]],
      ["{^s}", [["-S", "typey:typey-type.json"]]],
      ["{>}{&s}", [["S*", "typey:typey-type.json"]]],
      ["{^};{^}", [["SKHR-PB", "typey:typey-type.json"]]],
      ["{}{-|}", [["KPA", "typey:typey-type.json"]]],
      ["{^}{-|}", [["KPA*", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("s", lookupDict, "S*", affixList, undefined)
    ).toEqual("S*");
  });

  it("returns on-the-fly fingerspelled outline for comma in “hand-bag,” with no preceding char", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["hand", [["HAPBD", "typey:typey-type.json"]]],
      ["bag", [["PWAG", "typey:typey-type.json"]]],
      ["{^-^}", [["H-PB", "typey:typey-type.json"]]],
      ["{,}", [["KW-BG", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline(",", lookupDict, "KW-BG", affixList, undefined)
    ).toEqual("KW-BG");
  });

  it("returns empty string for unknown character “€” in “€100” with no given stroke and no preceding char", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["hand", [["HAPBD", "typey:typey-type.json"]]],
      ["bag", [["PWAG", "typey:typey-type.json"]]],
      ["{^-^}", [["H-PB", "typey:typey-type.json"]]],
      ["{,}", [["KW-BG", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline(",", lookupDict, "", affixList, undefined)
    ).toEqual("");
  });
});
