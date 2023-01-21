import hasAnyLongVowel from "./hasAnyLongVowel";

describe("hasAnyLongVowel", () => {
  it("returns true for sight", async () => {
    expect(hasAnyLongVowel("SAOEUT", "sight")).toEqual(true);
  });

  it("returns true for here", async () => {
    expect(hasAnyLongVowel("HAOER", "here")).toEqual(true);
  });

  it("returns false for sits", async () => {
    expect(hasAnyLongVowel("SEUTS", "sits")).toEqual(false);
  });
});
