import hasMoreThanOneConsonant from "./hasMoreThanOneConsonant";

describe("hasMoreThanOneConsonant", () => {
  it("returns true for sap", async () => {
    expect(hasMoreThanOneConsonant("SAP", "sap")).toEqual(true);
  });

  it("returns true for art", async () => {
    expect(hasMoreThanOneConsonant("ART", "art")).toEqual(true);
  });

  it("returns true for world", async () => {
    expect(hasMoreThanOneConsonant("WORLD", "world")).toEqual(true);
  });

  it("returns true for cat", async () => {
    expect(hasMoreThanOneConsonant("KAT", "cat")).toEqual(true);
  });

  it("returns false for at", async () => {
    expect(hasMoreThanOneConsonant("AT", "at")).toEqual(false);
  });
});
