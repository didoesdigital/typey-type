import hasDoubleLetters from "./hasDoubleLetters";

describe("hasDoubleLetters", () => {
  it("returns true for letter", async () => {
    expect(hasDoubleLetters("HRERT", "letter")).toEqual(true);
  });

  it("returns false for triple letters", async () => {
    expect(hasDoubleLetters("3-R", "III")).toEqual(false);
  });

  it("returns false for test", async () => {
    expect(hasDoubleLetters("TEFT", "test")).toEqual(false);
  });
});
