import hasDictionaryFormatting from "./hasDictionaryFormatting";

describe("hasDictionaryFormatting", () => {
  it("returns true for Plover toggle command", async () => {
    expect(hasDictionaryFormatting("PHROLG", "{PLOVER:TOGGLE}")).toEqual(true);
  });

  it("returns true for snake case mode", async () => {
    expect(hasDictionaryFormatting("STPHA*EUBG", "{MODE:SNAKE}")).toEqual(true);
  });

  it("returns true for affix entries", async () => {
    expect(hasDictionaryFormatting("PHOPB/OE", "{mono^}")).toEqual(true);
  });

  it("returns false for ampersand", async () => {
    expect(hasDictionaryFormatting("SP-PBD", "&")).toEqual(false);
  });
});
