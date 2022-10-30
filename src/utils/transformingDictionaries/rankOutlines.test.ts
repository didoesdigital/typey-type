import rankOutlines from "./rankOutlines/rankOutlines";

describe("rankOutlines", () => {
  it("returns A user entry before B non-user entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "typey-type.json", "typey"],
      ["O", "typey-type.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type.json", "typey"],
    ]);
  });

  it("returns B user entry before A non-user entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type.json", "typey"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type.json", "typey"],
    ]);
  });

  it("returns A plover entry after B non-plover entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "plover-main-3-jun-2018.json", "plover"],
      ["O", "typey-type.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["O", "typey-type.json", "user"],
      ["TO", "plover-main-3-jun-2018.json", "plover"],
    ]);
  });

  it("returns B plover entry after A non-plover entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "typey-type.json", "user"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "typey-type.json", "user"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
    ]);
  });

  it("returns A Gutenberg dict entry before B", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
      ["O", "typey-type.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
      ["O", "typey-type.json", "user"],
    ]);
  });

  it("returns B Gutenberg dict entry before A", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["O", "typey-type.json", "user"],
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
      ["O", "typey-type.json", "user"],
    ]);
  });

  it("returns A misstroke entry after B non-misstroke entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["O", "plover-main-3-jun-2018.json", "plover"],
      ["TO", "plover-main-3-jun-2018.json", "plover"],
    ];
    const misstrokesJSON = { O: "to" };
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "plover-main-3-jun-2018.json", "plover"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
    ]);
  });

  it("returns B misstroke entry after A non-misstroke entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "plover-main-3-jun-2018.json", "plover"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
    ];
    const misstrokesJSON = { O: "to" };
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "plover-main-3-jun-2018.json", "plover"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
    ]);
  });

  it("returns a ranked list of strokes and their source dictionary names", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO/TK-LS", "typey-type.json", "typey"],
      ["TO", "typey-type.json", "typey"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
      ["TO", "plover-main-3-jun-2018.json", "plover"],
    ];
    const misstrokesJSON = { TEF: "test", O: "to" };
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "typey-type.json", "typey"],
      ["TO/TK-LS", "typey-type.json", "typey"],
      ["TO", "plover-main-3-jun-2018.json", "plover"],
      ["O", "plover-main-3-jun-2018.json", "plover"],
    ]);
  });
});
