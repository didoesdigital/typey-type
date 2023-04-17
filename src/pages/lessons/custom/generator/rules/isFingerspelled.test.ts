import isFingerspelled from "./isFingerspelled";

describe("isFingerspelled", () => {
  it("returns true for standalone fingerspelled letter", async () => {
    expect(isFingerspelled("A*", "{>}{&a}")).toEqual(true);
  });

  it("returns true for multi-stroke fingerspelled word", async () => {
    expect(isFingerspelled("*E/KP*/T*/O*/R*/T*", "extort")).toEqual(true);
  });

  it("returns true for multi-stroke fingerspelled word with punctuation", async () => {
    expect(
      isFingerspelled("S*/*E/AE/*E/TPH*/TPH*/*EU/TKPW*/H*/T*", "se'ennight")
    ).toEqual(true);
  });

  it("returns false for partially fingerspelled entries", async () => {
    expect(isFingerspelled("HAPBD/SO*PL/TK-LS/S*/T*", "handsomest")).toEqual(
      false
    );
  });
});
