import hasPrefix from "./hasPrefix";
import { AffixList } from "../../affixList";

describe("hasPrefix", () => {
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

  it("returns true for outline with prefix", () => {
    const outline = "A/HROEPB";
    const translation = "along";

    expect(
      hasPrefix(outline, translation, AffixList.getSharedInstance().prefixes)
    ).toEqual(true);
  });

  it("returns false for outline that does not start with a prefix", () => {
    const outline = "TKPWUT/*EPB/PWERG";
    const translation = "Gutenberg";
    expect(
      hasPrefix(outline, translation, AffixList.getSharedInstance().prefixes)
    ).toEqual(false);
  });

  it("returns false for single-stroke outlines", () => {
    const outline = "TEFT";
    const translation = "test";
    expect(
      hasPrefix(outline, translation, AffixList.getSharedInstance().prefixes)
    ).toEqual(false);
  });
});
