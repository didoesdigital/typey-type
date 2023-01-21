import hasLongWords from "./hasLongWords";

describe("hasLongWords", () => {
  it("returns true for 11-letter words with no dashes or spaces", async () => {
    expect(hasLongWords("HRAOEBD", "leaderboard")).toEqual(true);
  });

  it("returns false for 11-letter words with a dash", async () => {
    expect(hasLongWords("HRAOEUBG/PHAOEUPBD/-D", "like-minded")).toEqual(false);
  });

  it("returns false for 11-letter phrases with a space", async () => {
    expect(hasLongWords("HRET/PHAE/SKWRUFT", "let me just")).toEqual(false);
  });

  it("returns false for 10-letter words with no dashes or spaces", async () => {
    expect(hasLongWords("WRAUL", "withdrawal")).toEqual(false);
  });
});
