import hasDisambiguatingBrief from "./hasDisambiguatingBrief";

describe("hasDisambiguatingBrief", () => {
  it("returns true for hired", async () => {
    expect(hasDisambiguatingBrief("HEURD", "hired")).toEqual(true);
  });

  it("returns false for hydro^", async () => {
    expect(hasDisambiguatingBrief("HAOEURD", "{hydro^}")).toEqual(false);
  });
});
