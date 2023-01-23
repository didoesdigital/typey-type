import splitBriefsIntoStrokes from "./splitBriefsIntoStrokes";

describe("split briefs into strokes", () => {
  it("returns single stroke as array of that stroke", () => {
    let currentStroke = "SAEUPL";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(["SAEUPL"]);
  });

  it("returns multi-stroke word as array of strokes", () => {
    let currentStroke = "A/WAEU";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(["A", "WAEU"]);
  });

  it("returns phrase with spaces as array of strokes", () => {
    let currentStroke = "-T WUPB";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(["-T", "WUPB"]);
  });

  it("returns phrase with spaces and slashes as array of strokes", () => {
    let currentStroke = "T/SEF or T/SEFL";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual([
      "T",
      "SEF",
      "or",
      "T",
      "SEFL",
    ]);
  });
});
