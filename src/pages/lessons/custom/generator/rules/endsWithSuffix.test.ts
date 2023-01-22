import endsWithSuffix from "./endsWithSuffix";
import { AffixList } from "../../../../../utils/affixList";

describe("endsWithSuffix", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{^ed}", [["-D", "typey:typey-type.json"]]],
        ["{^ing}", [["-G", "typey:typey-type.json"]]],
        ["{^licious}", [["HREURBS", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns true for word ending in suffix text and outline ending in suffix outline", async () => {
    expect(endsWithSuffix("AEPBS/-D", "answered")).toEqual(true);
  });

  it("returns false for outline ending in suffix outline and translation that ends with something else", async () => {
    expect(endsWithSuffix("RE/HREURBS", "religious")).toEqual(false);
  });

  it("returns false for outline ending with suffix outline but missing a slash", async () => {
    expect(endsWithSuffix("SR-G", "having")).toEqual(false);
  });
});
