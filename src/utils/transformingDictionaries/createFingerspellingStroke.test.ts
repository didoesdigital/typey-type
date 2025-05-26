import createFingerspellingStroke from "./createFingerspellingStroke";
import AFFIXES from "../affixes/affixes";
import testAffixes from "../affixes/testAffixes.fixtures";
import type { LookupDictWithNamespacedDicts } from "../../types";

describe("createFingerspellingStroke", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      return testAffixes;
    });
  });

  beforeEach(() => {
    AFFIXES.setSharedAffixes({
      prefixes: [
        ["A/", "a"],
        ["EUPB/", "in"],
        ["KAUPB/", "con"],
      ],
      suffixes: [
        ["/*EPB", "en"],
        ["/*PLT", "ment"],
        ["/HREU", "ly"],
        ["/EPBT", "ent"],
        ["/-D", "ed"],
      ],
    });
  });

  afterEach(() => {
    AFFIXES.setSharedAffixes({ prefixes: [], suffixes: [] });
  });

  it("returns fingerspelled strokes for Kosciusko", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
    ]);
    expect(
      createFingerspellingStroke("Kosciusko", lookupDict, affixList)
    ).toEqual("K*P/O*/S*/KR*/*EU/*U/S*/K*/O*");
  });

  it('returns fingerspelled strokes for "es"', () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{&e}", [["E*", "typey:typey-type.json"]]],
      ["{&s}", [["S*", "typey:typey-type.json"]]],
    ]);
    expect(createFingerspellingStroke("es", lookupDict, affixList)).toEqual(
      "E*/S*"
    );
  });

  it("returns empty string in strokes for €100", () => {
    const affixList = AFFIXES.getSharedAffixes();
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
    ]);
    expect(createFingerspellingStroke("€100", lookupDict, affixList)).toEqual(
      "xxx/#S/#O/#O"
    );
  });

  // xit("returns number bar key and letter keys for numbers", () => {
  //   const affixList = AFFIXES.getSharedAffixes();
  //   const lookupDict: LookupDictWithNamespacedDicts = new Map([
  //     ["a", [["AEU", "typey:typey-type.json"]]],
  //   ]);
  //   expect(
  //     createFingerspellingStroke("100", lookupDict, affixList)
  //   ).toEqual("#S/#O/#O");
  // });
});
