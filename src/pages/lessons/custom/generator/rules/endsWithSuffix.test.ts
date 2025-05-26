import AFFIXES from "../../../../../utils/affixes/affixes";
import endsWithSuffix from "./endsWithSuffix";
import type { AffixObject } from "../../../../../types";

describe("endsWithSuffix", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      const affixObject: AffixObject = {
        prefixes: [["RE/", "re"]],
        suffixes: [
          ["/-D", "ed"],
          ["/-G", "ing"],
          ["/PHRAEU/SHA", "plasia"],
          // Alternate outlines are not included in affixes lists:
          // ["/PHRAEUS/KWRA", "plasia"],
          // ["/PHRAEURB/KWRA", "plasia"],
          // ["/PHRAEU/PHRA*EU/SHA", "plasia"],
        ],
      };
      return affixObject;
    });
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

  it("returns false for outline ending with a down-ranked suffix outline when there is a better, shorter suffix outline included in the affixes suffixes list", async () => {
    expect(endsWithSuffix("A/PHRAEU/PHRA*EU/SHA", "aplasia")).toEqual(false);
  });

  it("returns true for outline ending with a up-ranked suffix outline", async () => {
    expect(endsWithSuffix("A/PHRAEU/SHA", "aplasia")).toEqual(true);
  });
});
