import tryMatchingCompoundWords from "./tryMatchingCompoundWords";
import { AffixList } from "../affixList";
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";

const globalLookupDictionary = createAGlobalLookupDictionary(
  [],
  {
    "PHAERPBLG": "marriage",
    "PORGS": "portion",
    "H-PB": "{^-^}",
    "SEF": "{self-^}",
    "KROL": "control",
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

  it("returns strokes, stroke, and number of attempts for “self-control” using self-^ prefix not self word and hyphen", () => {
    const compoundWordParts = ["self", "control"];
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
    ).toEqual(["SEF/KROL", "xxx", 3]);
  });

  it("returns strokes, stroke, and number of attempts for “self-notarealword” using self-^ prefix and fingerspelled word", () => {
    const compoundWordParts = ["self", "notarealword"];
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
    ).toEqual(["SEF/TPH*/O*/T*/A*/R*/*E/A*/HR*/W*/O*/R*/TK*", "xxx", 3]);
  });
});
