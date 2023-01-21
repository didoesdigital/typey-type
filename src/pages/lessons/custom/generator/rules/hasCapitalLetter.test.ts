import hasCapitalLetter from "./hasCapitalLetter";

describe("hasCapitalLetter", () => {
  it("returns true for iPhone", async () => {
    expect(hasCapitalLetter("APB/KWREU/TPOEPB", "an iPhone")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasCapitalLetter("TEFT", "test")).toEqual(false);
  });
});
