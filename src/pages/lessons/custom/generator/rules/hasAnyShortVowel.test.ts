import hasAnyShortVowel from "./hasAnyShortVowel";

describe("hasAnyShortVowel", () => {
  it("returns true for word with short o vowel", async () => {
    expect(hasAnyShortVowel("TOLD", "told")).toEqual(true);
  });

  it("returns false for AO", async () => {
    expect(hasAnyShortVowel("HRAOPBG", "along")).toEqual(false);
  });

  it("returns false for AOEU", async () => {
    expect(hasAnyShortVowel("AOEU", "eye")).toEqual(false);
  });

  it("returns false for AEU", async () => {
    expect(hasAnyShortVowel("A/WAEU", "away")).toEqual(false);
  });
});
