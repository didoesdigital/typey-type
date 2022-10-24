import penaliseStars from "./penaliseStars";

describe("penaliseStars", () => {
  it("returns the number of stars in 1-star outline", () => {
    const outline = "AO*EUL";
    const translation = "aisle";
    expect(penaliseStars(outline, translation)).toEqual(1);
  });

  it("returns 0 for outline with no stars", () => {
    const outline = "AOEULS";
    const translation = "aisle";
    expect(penaliseStars(outline, translation)).toEqual(0);
  });
});
