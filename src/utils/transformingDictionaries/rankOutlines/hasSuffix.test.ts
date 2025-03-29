import hasSuffix from "./hasSuffix";
import { AffixList } from "../../affixList";

describe("hasSuffix", () => {
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
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  it("returns true for outline with suffix", () => {
    const outline = "SWEUFT/HREU";
    const translation = "swiftly";

    expect(
      hasSuffix(outline, translation, AffixList.getSharedInstance().suffixes)
    ).toEqual(true);
  });

  it("returns false for outline that does not end with a suffix", () => {
    const outline = "TKPWUT/*EPB/PWERG";
    const translation = "Gutenberg";
    expect(
      hasSuffix(outline, translation, AffixList.getSharedInstance().suffixes)
    ).toEqual(false);
  });

  it("returns false for single-stroke outlines", () => {
    const outline = "TEFT";
    const translation = "test";
    expect(
      hasSuffix(outline, translation, AffixList.getSharedInstance().suffixes)
    ).toEqual(false);
  });
});
