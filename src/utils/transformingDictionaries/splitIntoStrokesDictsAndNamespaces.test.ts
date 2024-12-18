import splitIntoStrokesDictsAndNamespaces from "./splitIntoStrokesDictsAndNamespaces";

describe("splitIntoStrokesDictsAndNamespaces", () => {
  it("returns the outlines and its source dictionary with separate namespace", () => {
    const strokesAndSources: [string, string][] = [
      ["WARPL/HREU", "typey:typey-type.json"],
      ["WARPL/HREU", "typey:typey-type-full.json"],
    ];

    expect(splitIntoStrokesDictsAndNamespaces(strokesAndSources)).toEqual([
      ["WARPL/HREU", "typey-type.json", "typey"],
      ["WARPL/HREU", "typey-type-full.json", "typey"],
    ]);
  });

  it("returns the outlines and its source dictionary with empty namespace", () => {
    const strokesAndSources: [string, string][] = [
      ["WARPL/HREU", "foo:typey-type.json"],
      ["WARPL/HREU", "foo:plover-main-3-jun-2018.json"],
    ];

    expect(splitIntoStrokesDictsAndNamespaces(strokesAndSources)).toEqual([
      ["WARPL/HREU", "foo:typey-type.json", ""],
      ["WARPL/HREU", "foo:plover-main-3-jun-2018.json", ""],
    ]);
  });
});
