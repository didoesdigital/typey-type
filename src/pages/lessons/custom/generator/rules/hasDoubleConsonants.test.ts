import hasDoubleConsonants from "./hasDoubleConsonants";

describe("hasDoubleConsonants", () => {
  it("returns true for Harry", async () => {
    expect(hasDoubleConsonants("HAR/REU", "Harry")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasDoubleConsonants("TEFT", "test")).toEqual(false);
  });
});
