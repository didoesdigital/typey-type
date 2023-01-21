import hasMedical from "./hasMedical";

describe("hasMedical", () => {
  it("returns true for neurological", async () => {
    expect(hasMedical("TPH*LG", "neurological")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasMedical("TEFT", "test")).toEqual(false);
  });
});
