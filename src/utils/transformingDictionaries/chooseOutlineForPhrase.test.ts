import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import { AffixList } from "../affixList";
import type { LookupDictWithNamespacedDicts } from "../../types";

describe("chooseOutlineForPhrase", () => {
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
    AffixList.setSharedInstance([]);
  });

  it("chooses an outline for a word or phrase", () => {
    const wordOrPhrase = "FIRST";
    const globalLookupDictionary: LookupDictWithNamespacedDicts = new Map([
      ["first", [["TPEUFRT", "typey:typey-type.json"]]],
    ]);
    const chosenStroke = undefined;
    const strokeLookupAttempts = 0;
    const precedingChar = "";
    const affixList = AffixList.getSharedInstance();

    expect(
      chooseOutlineForPhrase(
        wordOrPhrase,
        globalLookupDictionary,
        chosenStroke,
        strokeLookupAttempts,
        precedingChar,
        affixList
      )
    ).toEqual(["*URP/TPEUFRT", 1]);
  });
});
