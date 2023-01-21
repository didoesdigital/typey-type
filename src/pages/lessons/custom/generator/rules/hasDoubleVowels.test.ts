import hasDoubleVowels from "./hasDoubleVowels";

describe("hasDoubleVowels", () => {
  it("returns true for seems", async () => {
    expect(hasDoubleVowels("SAOEPLS", "seems")).toEqual(true);
  });

  it("returns false for mess", async () => {
    expect(hasDoubleVowels("TPHES", "mess")).toEqual(false);
  });
});
