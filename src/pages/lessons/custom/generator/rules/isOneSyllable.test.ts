import isOneSyllable from "./isOneSyllable";

describe("isOneSyllable", () => {
  it("returns false for genre", async () => {
    expect(isOneSyllable("SKWREPB/ER", "genre")).toEqual(false);
  });

  it("returns false for kettle", async () => {
    expect(isOneSyllable("K*ELT", "kettle")).toEqual(false);
  });

  it("returns true for short words", async () => {
    expect(isOneSyllable("AEU", "a")).toEqual(true);
  });

  it("returns true for scored", async () => {
    expect(isOneSyllable("SKORD", "scored")).toEqual(true);
  });

  it("returns true for year", async () => {
    expect(isOneSyllable("KWRAOER", "year")).toEqual(true);
  });

  it("returns true for queue", async () => {
    expect(isOneSyllable("KWAOU", "queue")).toEqual(true);
  });

  it("returns true for word with no vowels", async () => {
    expect(isOneSyllable("H-PL", "hmm")).toEqual(true);
  });

  it("returns false for initialisms", async () => {
    expect(isOneSyllable("HAOEPLT", "HTML")).toEqual(false);
  });
});
