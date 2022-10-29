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
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  const affixList = AffixList.getSharedInstance();

  it("returns fingerspelled outline for symbol", () => {
    const lookupDict = new Map([["&", [["SKP", "typey-type.json"]]]]);
    expect(
      findFingerspellingOutline("&", lookupDict, "SKP*", affixList, "")
    ).toEqual("SKP*");
  });

  it('returns fingerspelled outline for phrase `houses?" It`', () => {
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
});
