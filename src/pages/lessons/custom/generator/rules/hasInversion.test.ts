import hasInversion from "./hasInversion";

describe("hasInversion", () => {
  it("returns true for FL used for lf or lv", async () => {
    expect(hasInversion("TWEFL", "twelve")).toEqual(true);
    expect(hasInversion("SOFL", "solve")).toEqual(true);
  });

  it("returns true for FR used for rf", async () => {
    expect(hasInversion("SKAFR", "scarf")).toEqual(true);
  });

  it("returns true for FR used for rs", async () => {
    expect(hasInversion("OFRS", "offers")).toEqual(true);
  });

  it("returns true for RL used for ler", async () => {
    expect(hasInversion("RORL", "roller")).toEqual(true);
  });

  it("returns true for edit but not adopted", async () => {
    expect(hasInversion("ETD", "edit")).toEqual(true);
    expect(hasInversion("A/TKOPTD", "adopted")).toEqual(false);
  });

  it("returns true for sewing but not farewell", async () => {
    expect(hasInversion("SWEG", "sewing")).toEqual(true);
    expect(hasInversion("TPAER/WEL", "farewell")).toEqual(false);
  });

  it("returns true for portal but not development or nationality", async () => {
    expect(hasInversion("PORLT", "portal")).toEqual(true);
    expect(hasInversion("SREPLT/AL", "developmental")).toEqual(false);
    expect(hasInversion("TPHAT/ALT", "nationality")).toEqual(false);
  });

  it("returns true for absolutely but not alternatively", async () => {
    expect(hasInversion("SHRAOULT", "absolutely")).toEqual(true);
    expect(hasInversion("AULT/TEUFL", "alternatively")).toEqual(false);
  });

  it("returns false for test", async () => {
    expect(hasInversion("TEFT", "test")).toEqual(false);
  });
});
