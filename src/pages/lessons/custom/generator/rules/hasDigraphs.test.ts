import hasDigraphs from "./hasDigraphs";

describe("hasDigraphs", () => {
  it("returns true for strong", async () => {
    expect(hasDigraphs("STROPBG", "strong")).toEqual(true);
  });

  it("returns false for cat", async () => {
    expect(hasDigraphs("KAT", "cat")).toEqual(false);
  });
});
