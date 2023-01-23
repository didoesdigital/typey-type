import isSuperlative from "./isSuperlative";

describe("isSuperlative", () => {
  xit("returns true for simpler", async () => {
    expect(isSuperlative("SEUFRP/HRER", "simpler")).toEqual(true);
  });

  it("returns true for happier", async () => {
    expect(isSuperlative("HAP/KWRER", "happier")).toEqual(true);
  });

  it("returns true for happiest", async () => {
    expect(isSuperlative("HAP/KWREFT", "happiest")).toEqual(true);
  });

  it("returns true for most loyal", async () => {
    expect(isSuperlative("PHOEFT/HROEUL", "most loyal")).toEqual(true);
  });

  it("returns true for more finely", async () => {
    expect(isSuperlative("PHOR/TPAOEUPB/HREU", "more finely")).toEqual(true);
  });

  it("returns false for kitten", async () => {
    expect(isSuperlative("KEUT/-PB", "kitten")).toEqual(false);
  });

  it("returns false for prier", async () => {
    expect(isSuperlative("PRAOEU/ER", "prier")).toEqual(false);
  });

  it("returns false for west", async () => {
    expect(isSuperlative("WEFT", "west")).toEqual(false);
  });

  it("returns true for freest", async () => {
    expect(isSuperlative("TPRAOE/*ES", "freest")).toEqual(true);
  });

  it("returns false for unrest", async () => {
    expect(isSuperlative("UPB/REFT", "unrest")).toEqual(false);
  });

  it("returns false for wildebeest", async () => {
    expect(isSuperlative("WEULD/PWAOEFT", "wildebeest")).toEqual(false);
  });

  it("returns false for blest", async () => {
    expect(isSuperlative("PWRES/*T", "blest")).toEqual(false);
  });

  it("returns false for conflict of interest", async () => {
    expect(isSuperlative("K*PBGS", "conflict of interest")).toEqual(false);
  });

  it("returns false for each other", async () => {
    expect(isSuperlative("AOEFP/OER", "each other")).toEqual(false);
  });
});
