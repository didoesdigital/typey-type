import hasUnstressedVowels from "./hasUnstressedVowels";

describe("hasUnstressedVowels", () => {
  it("returns true for dropped unstressed vowels", async () => {
    expect(hasUnstressedVowels("R*UFL/-D", "ruffled")).toEqual(true);
    expect(hasUnstressedVowels("TEPD", "tepid")).toEqual(true);
    expect(hasUnstressedVowels("TABLT", "tablet")).toEqual(true);
  });

  it("returns false for included vowels", async () => {
    expect(hasUnstressedVowels("TEFT", "test")).toEqual(false);
  });
});
