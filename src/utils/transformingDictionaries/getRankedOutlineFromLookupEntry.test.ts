import getRankedOutlineFromLookupEntry from "./getRankedOutlineFromLookupEntry";
import { AffixList } from "../affixList";
import type { StrokeAndNamespacedDict } from "../../types";

describe("getRankedOutlineFromLookupEntry", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{con^}", [["KAUPB", "typey:typey-type.json"]]],
        ["{^ent}", [["EPBT", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  it("splits the dict names into namespaces and returns the ranked outline with provided affixList", () => {
    const lookupEntry: StrokeAndNamespacedDict[] = [
      ["KOPB/S*EUS/TEPBT", "typey:typey-type.json"],
      ["KAUPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/S*EUS/EPBT", "typey:typey-type.json"],
      ["KAO/*EPBT", "typey:typey-type.json"],
      ["KAOEPBT", "typey:typey-type.json"],
      ["KAOPBT", "typey:typey-type.json"],
    ];
    const translation = "warmly";

    expect(
      getRankedOutlineFromLookupEntry(
        lookupEntry,
        translation,
        AffixList.getSharedInstance()
      )
    ).toEqual("KAOPBT");
  });

  it("splits the dict names into namespaces and returns the ranked outline without an affixList", () => {
    const lookupEntry: StrokeAndNamespacedDict[] = [
      ["KOPB/S*EUS/TEPBT", "typey:typey-type.json"],
      ["KAUPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/S*EUS/EPBT", "typey:typey-type.json"],
      ["KAO/*EPBT", "typey:typey-type.json"],
      ["KAOEPBT", "typey:typey-type.json"],
      ["KAOPBT", "typey:typey-type.json"],
    ];
    const translation = "warmly";

    expect(getRankedOutlineFromLookupEntry(lookupEntry, translation)).toEqual(
      "KAOPBT"
    );
  });
});
