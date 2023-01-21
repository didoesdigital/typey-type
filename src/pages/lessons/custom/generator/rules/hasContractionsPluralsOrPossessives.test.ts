import hasContractionsPluralsOrPossessives from "./hasContractionsPluralsOrPossessives";

describe("hasContractionsPluralsOrPossessives", () => {
  it("returns true for hasn't", async () => {
    expect(hasContractionsPluralsOrPossessives("HAFPBT", "hasn't")).toEqual(
      true
    );
  });

  it("returns true for I' words", async () => {
    expect(hasContractionsPluralsOrPossessives("AOEUF", "I've")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasContractionsPluralsOrPossessives("TEFT", "test")).toEqual(false);
  });
});
