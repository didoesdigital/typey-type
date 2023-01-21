import hasCompoundClusters from "./hasCompoundClusters";

describe("hasCompoundClusters", () => {
  it("returns true for FRB", async () => {
    expect(hasCompoundClusters("PHAFRBL", "marvel")).toEqual(true);
  });

  it("returns true for FRPB", async () => {
    expect(hasCompoundClusters("PHAFRPB", "march")).toEqual(true);
  });

  it("returns true for *LG -lk", async () => {
    expect(hasCompoundClusters("H*ULG", "hulk")).toEqual(true);
  });

  it("returns true for LG -lch", async () => {
    expect(hasCompoundClusters("PHULG", "mulch")).toEqual(true);
  });

  it("returns true for GS -cean", async () => {
    expect(hasCompoundClusters("OEGS", "ocean")).toEqual(true);
  });

  it("returns true for BGS -ction", async () => {
    expect(hasCompoundClusters("PHAL/TPUPBGS", "malfunction")).toEqual(true);
  });

  it("returns true for *PL -mp", async () => {
    expect(hasCompoundClusters("RA*PL", "ramp")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasCompoundClusters("TEFT", "test")).toEqual(false);
  });
});
