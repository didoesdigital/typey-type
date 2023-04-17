import hasMedical from "./hasMedical";

describe("hasMedical", () => {
  it("returns true for inferior vena cava", async () => {
    expect(hasMedical("*EUFBG", "inferior vena cava")).toEqual(true);
  });

  it("returns true for neurological", async () => {
    expect(hasMedical("TPH*LG", "neurological")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasMedical("TEFT", "test")).toEqual(false);
  });
});
