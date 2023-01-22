import startsWithPrefix from "./startsWithPrefix";
import { AffixList } from "../../../../../utils/affixList";

describe("startsWithPrefix", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{^en}", [["*EPB", "typey:typey-type.json"]]],
        ["{^ment}", [["*PLT", "typey:typey-type.json"]]],
        ["{a^}", [["A", "typey:typey-type.json"]]],
        ["{in^}", [["EUPB", "typey:typey-type.json"]]],
        ["{^ly}", [["HREU", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns true for entries that start with a prefix outline that matches the start of the translation", async () => {
    expect(startsWithPrefix("A/HROEPB", "alone")).toEqual(true);
  });

  it("returns false for entries that start with a prefix outline that do not match the start of the translation", async () => {
    expect(startsWithPrefix("EUPBD/KWRAPB", "Indian")).toEqual(false);
  });

  it("returns false for entries that start with prefix outline but lack a slash", async () => {
    expect(startsWithPrefix("AF", "after")).toEqual(false);
  });

  it("returns false for entries with no slashes", async () => {
    expect(startsWithPrefix("TEFT", "teft")).toEqual(false);
  });
});
