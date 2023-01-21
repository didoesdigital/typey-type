import hasDiphthong from "./hasDiphthong";

describe("hasDiphthong", () => {
  it("returns true for soil", async () => {
    expect(hasDiphthong("SOEUL", "soil")).toEqual(true);
  });

  it("returns false for a", async () => {
    expect(hasDiphthong("AEU", "a")).toEqual(false);
  });
});
