import hasSomeConsonants from "./hasSomeConsonants";

describe("hasSomeConsonants", () => {
  it("returns true for world", async () => {
    expect(hasSomeConsonants("WORLD", "world")).toEqual(true);
  });

  it("returns false for cat", async () => {
    expect(hasSomeConsonants("KAT", "cat")).toEqual(false);
  });
});
