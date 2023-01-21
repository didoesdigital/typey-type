import hasVowelDisambiguator from "./hasVowelDisambiguator";

describe("hasVowelDisambiguator", () => {
  it("returns true for hear", async () => {
    expect(hasVowelDisambiguator("HAER", "hear")).toEqual(true);
  });

  it("returns false for hare", async () => {
    expect(hasVowelDisambiguator("HA*ER", "hare")).toEqual(false);
  });

  it("returns false for here", async () => {
    expect(hasVowelDisambiguator("HAOER", "here")).toEqual(false);
  });
});
