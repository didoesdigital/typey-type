import penaliseStars from "./penaliseStars";

describe("penaliseStars", () => {
  it("returns the number of stars", () => {
    const outline = "AO*EUL";
    const translation = "AOEULS";
    expect(penaliseStars(outline, translation)).toEqual(1);
  });
});
