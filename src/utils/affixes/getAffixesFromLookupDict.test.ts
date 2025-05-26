import getAffixesFromLookupDict from "./getAffixesFromLookupDict";

import type { AffixObject, LookupDictWithNamespacedDicts } from "../../types";

describe("getAffixesFromLookupDict", () => {
  it("returns only the highest ranked affix outlines", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      [
        "{hypo^}",
        [
          ["HOEUP", "typey:typey-type.json"],
          ["HO*EUP", "typey:typey-type.json"],
          ["HAO*EUP", "typey:typey-type.json"],
          ["HAOEUP/O*", "typey:typey-type.json"],
          ["HAOEUP/OE", "typey:typey-type.json"],
          ["HAOEUP/KWRO", "typey:typey-type.json"],
          ["HAOEUP/SKWRO", "typey:typey-type.json"],
        ],
      ],
      [
        "{^plasia}",
        [
          ["PHRAEUS/KWRA", "typey:typey-type.json"],
          ["PHRAEURB/KWRA", "typey:typey-type.json"],
          ["PHRAEU/PHRA*EU/SHA", "typey:typey-type.json"],
        ],
      ],
    ]);
    const affixMisstrokes = {};

    const expectedResult: AffixObject = {
      prefixes: [["HOEUP/", "hypo"]],
      suffixes: [["/PHRAEUS/KWRA", "plasia"]],
    };

    expect(getAffixesFromLookupDict(lookupDict, affixMisstrokes)).toEqual(
      expectedResult
    );
  });

  // NOTE: Treating these as affixes improves some stroke hints so it is
  // probably worth keeping this behaviour.
  it("allows affixes containing only punctuation", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{^'}", [["AE", "typey:typey-type.json"]]],
      ["{'^}", [["A*E", "typey:typey-type.json"]]],
      ["{-^}", [["H*PB", "typey:typey-type.json"]]],
      ["{.^}", [["PO*EUP", "typey:typey-type.json"]]],
      ["{^...}", [["HR-PS", "typey:typey-type.json"]]],
    ]);
    const affixMisstrokes = {};

    const expectedResult: AffixObject = {
      prefixes: [
        ["A*E/", "'"],
        ["H*PB/", "-"],
        ["PO*EUP/", "."],
      ],
      suffixes: [
        ["/HR-PS", "..."],
        ["/AE", "'"],
      ],
    };

    expect(getAffixesFromLookupDict(lookupDict, affixMisstrokes)).toEqual(
      expectedResult
    );
  });
});
