import tryMatchingCompoundWords from "./tryMatchingCompoundWords";
import { AffixList } from "../affixList";
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";

const globalLookupDictionary = createAGlobalLookupDictionary(
  [],
  {
    "PHAERPBLG": "marriage",
    "PORGS": "portion",
    "H-PB": "{^-^}",
  },
  {}
);
let sharedAffixes = AffixList.getSharedInstance();

describe("tryMatchingCompoundWords", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns strokes, stroke, and number of attempts for “marriage-portion”", () => {
    const compoundWordParts = ["marriage", "portion"];
    const strokes = "";
    const stroke = "xxx";
    const strokeLookupAttempts = 2;

    expect(
      tryMatchingCompoundWords(
        compoundWordParts,
        globalLookupDictionary,
        strokes,
        stroke,
        strokeLookupAttempts,
        sharedAffixes
      )
    ).toEqual(["PHAERPBLG H-PB PORGS", "xxx", 4]);
  });
});
