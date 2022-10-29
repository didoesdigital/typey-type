import findFingerspellingOutline from "./findFingerspellingOutline";
import { AffixList } from "../affixList";

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

  it("returns fingerspelled outline for symbol", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([["&", [["SKP", "typey-type.json"]]]]);
    expect(
      findFingerspellingOutline("&", lookupDict, "SKP*", affixList, "")
    ).toEqual("SKP*");
  });

  it('returns fingerspelled outline for phrase `houses?" It`', () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["{?}", [["H-F", "typey-type.json"]]],
      ["it", [["EUT", "typey-type.json"]]],
      ["houses", [["HOUSZ", "typey-type.json"]]],
      ["{}{-|}", [["KPA", "typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline('"', lookupDict, "KR-GS", affixList, "?")
    ).toEqual("KR-GS");
  });

  it("returns fingerspelled outline from personal dict for glued B", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "{&B}",
        [
          ["-BZ", "my-personal-dict.json"],
          ["PW*FPLT", "my-personal-dict.json"],
        ],
      ],
      ["{&L}", ["-LZ", "my-personal-dict.json"]],
    ]);
    expect(
      findFingerspellingOutline("B", lookupDict, "PW*P", affixList, "")
    ).toEqual("-BZ");
  });

  it("returns fingerspelled outline from personal dict for C", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "{&B}",
        [
          ["-BZ", "my-personal-dict.json"],
          ["PW*FPLT", "my-personal-dict.json"],
        ],
      ],
      ["{&L}", ["-LZ", "my-personal-dict.json"]],
    ]);
    expect(
      findFingerspellingOutline("C", lookupDict, "KR*P", affixList, "")
    ).toEqual("KR*P");
  });

  it("returns fingerspelled outline for letter e in grinned, which has no available outline, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["grin", [["TKPWREUPB", "typey-type.json"]]],
      ["{^ed}", [["-D", "typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("*E");
  });

  it("returns fingerspelled outline for letter e in grinned, which has no available outline, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["grin", [["TKPWREUPB", "typey-type.json"]]],
      ["{^ed}", [["-D", "typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("*E");
  });
});
