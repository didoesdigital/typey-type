import penaliseSlashesWithoutPrefixesOrSuffixes from "./penaliseSlashesWithoutPrefixesOrSuffixes";
import { AffixList } from "../../affixList";

describe("penaliseSlashesWithoutPrefixesOrSuffixes", () => {
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

  it("returns penalty of 2 for multi-stroke outlines without affix strokes", () => {
    const outline = "TKPWUT/*EPB/PWERG";
    const translation = "Gutenberg";
    expect(
      penaliseSlashesWithoutPrefixesOrSuffixes(
        outline,
        translation,
        AffixList.getSharedInstance()
      )
    ).toEqual(2);
  });

  // NOTE: one day, we might add an extra penalty to suffixes used as prefixes e.g. "O*R": "{^or}"
  it("returns penalty greater than zero multi-stroke outline without prefix strokes at the start or suffix strokes at the end", () => {
    const outline = "O*R/TK*EFRBZ";
    const translation = "hors d'oeuvres";
    const penalty = penaliseSlashesWithoutPrefixesOrSuffixes(
      outline,
      translation,
      AffixList.getSharedInstance()
    );

    expect(penalty).toBeGreaterThan(0);
  });

  it("returns no penalty for multi-stroke outlines with prefix strokes", () => {
    const outline = "EUPB/TKAOUFD";
    const translation = "induced";
    expect(
      penaliseSlashesWithoutPrefixesOrSuffixes(
        outline,
        translation,
        AffixList.getSharedInstance()
      )
    ).toEqual(0);
  });

  it("returns no penalty for multi-stroke outlines with suffix strokes", () => {
    const outline = "SWEUFT/HREU";
    const translation = "swiftly";
    const penalty = penaliseSlashesWithoutPrefixesOrSuffixes(
      outline,
      translation,
      AffixList.getSharedInstance()
    );

    expect(penalty).toEqual(0);
  });

  it("returns no penalty for single-stroke outlines", () => {
    const outline = "TEFT";
    const translation = "test";
    expect(
      penaliseSlashesWithoutPrefixesOrSuffixes(
        outline,
        translation,
        AffixList.getSharedInstance()
      )
    ).toEqual(0);
  });
});
