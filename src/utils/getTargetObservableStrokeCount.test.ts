import { getTargetObservableStrokeCount } from "./getTargetObservableStrokeCount";

import type { PresentedMaterialItem } from "types";

describe("getTargetObservableStrokeCount", () => {
  describe("with non-observable capitalisation strokes", () => {
    const materialItem: PresentedMaterialItem = {
      phrase: "chaffinch",
      stroke: "KHAF/TK-LS/TPH-FP",
    };

    it("returns a stroke count excluding non-observable capitalisation strokes", () => {
      expect(getTargetObservableStrokeCount(materialItem)).toEqual(2);
    });
  });

  describe("with non-observable space suppression strokes", () => {
    const materialItem: PresentedMaterialItem = {
      phrase: "Turtle-doves",
      stroke: "KPA/TURLT/H-PB/TKOFS",
    };

    it("returns a stroke count excluding non-observable space strokes", () => {
      expect(getTargetObservableStrokeCount(materialItem)).toEqual(3);
    });
  });

  describe("with observable strokes only", () => {
    const materialItem = {
      phrase: "fluttering",
      stroke: "TPHRUT/ERG",
    };

    it("returns a stroke count excluding non-observable strokes", () => {
      expect(getTargetObservableStrokeCount(materialItem)).toEqual(2);
    });
  });
});
