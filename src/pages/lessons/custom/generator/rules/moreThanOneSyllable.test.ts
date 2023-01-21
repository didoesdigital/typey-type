import moreThanOneSyllable from "./moreThanOneSyllable";

describe("moreThanOneSyllable", () => {
  it("returns true for genre", async () => {
    expect(moreThanOneSyllable("SKWREPB/ER", "genre")).toEqual(true);
  });

  it("returns true for kettle", async () => {
    expect(moreThanOneSyllable("K*ELT", "kettle")).toEqual(true);
  });

  it("returns false for short words", async () => {
    expect(moreThanOneSyllable("AEU", "a")).toEqual(false);
  });

  it("returns false for scored", async () => {
    expect(moreThanOneSyllable("SKORD", "scored")).toEqual(false);
  });

  it("returns false for year", async () => {
    expect(moreThanOneSyllable("KWRAOER", "year")).toEqual(false);
  });

  it("returns false for queue", async () => {
    expect(moreThanOneSyllable("KWAOU", "queue")).toEqual(false);
  });

  it("returns false for word with no vowels", async () => {
    expect(moreThanOneSyllable("H-PL", "hmm")).toEqual(false);
  });

  it("returns true for initialisms", async () => {
    expect(moreThanOneSyllable("HAOEPLT", "HTML")).toEqual(true);
  });

  it("returns true for two-syllable words", async () => {
    expect(moreThanOneSyllable("AEPBS/-D", "answered")).toEqual(true);
  });

  it("returns true for three-syllable words", async () => {
    expect(moreThanOneSyllable("TPH-FGS", "information")).toEqual(true);
  });
});
