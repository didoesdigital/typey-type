import hasOnlyShortIVowel from "./hasOnlyShortIVowel";

describe("hasOnlyShortIVowel", () => {
  it("returns true for something with EU keys and short 'i' sound", async () => {
    expect(hasOnlyShortIVowel("SEUBGS", "six")).toEqual(true);
  });

  it("returns false for something with only E key", async () => {
    expect(hasOnlyShortIVowel("RER", "remember")).toEqual(false);
  });

  it("returns false for something with only U key", async () => {
    expect(hasOnlyShortIVowel("RUPB", "run")).toEqual(false);
  });

  it("returns false for something with EU keys and long 'i' sound", async () => {
    expect(hasOnlyShortIVowel("STREUF", "strive")).toEqual(false);
  });
});
