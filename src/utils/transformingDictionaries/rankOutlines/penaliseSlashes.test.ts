import penaliseSlashes from "./penaliseSlashes";

describe("penaliseSlashes", () => {
  it("returns double the number of slashes in 2-slash outline", () => {
    const outline = "TKPWUT/*EPB/PWERG";
    const translation = "Gutenberg";
    expect(penaliseSlashes(outline, translation)).toEqual(4);
  });

  it("returns double the number of slashes in 1-slash outline", () => {
    const outline = "A/HROEPB";
    const translation = "alone";
    expect(penaliseSlashes(outline, translation)).toEqual(2);
  });

  it("returns 0 for outline with no slashes", () => {
    const outline = "AOEULS";
    const translation = "aisle";
    expect(penaliseSlashes(outline, translation)).toEqual(0);
  });
});
