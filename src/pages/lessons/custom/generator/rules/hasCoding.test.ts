import hasCoding from "./hasCoding";

describe("hasCoding", () => {
  it("returns true for method names", async () => {
    expect(hasCoding("TKR*BT", "distribute()")).toEqual(true);
  });

  it("returns true for raw_input", async () => {
    expect(hasCoding("REUPT", 'raw_input("')).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasCoding("TEFT", "test")).toEqual(false);
  });
});
