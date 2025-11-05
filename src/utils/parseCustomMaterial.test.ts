import { parseCustomMaterial } from "./parseCustomMaterial";
import Zipper from "./zipper";

describe("parseCustomMaterial", () => {
  describe("has no content", () => {
    it("should return empty source material", () => {
      const customMaterial = "";
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [],
          presentedMaterial: [{ phrase: "", stroke: "" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([{ phrase: "", stroke: "" }]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "fail",
        ["Your material needs at least 1 word"],
      ]);
    });
  });
  describe("has no tabs", () => {
    it("should return empty source material", () => {
      const customMaterial = "test TEFT";
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [],
          presentedMaterial: [{ phrase: "", stroke: "" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([{ phrase: "", stroke: "" }]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "fail",
        ["Your material needs at least 1 “Tab” character"],
      ]);
    });
  });
  describe("has a tab but no word", () => {
    it("should return empty source material", () => {
      const customMaterial = "	TEFT";
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [],
          presentedMaterial: [{ phrase: "", stroke: "" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([{ phrase: "", stroke: "" }]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "fail",
        ["Your material needs at least 1 word and 1 “Tab” character"],
      ]);
    });
  });
  describe("has a line with no tabs", () => {
    it("should return a lesson without that line", () => {
      const customMaterial = `testWithSpace TEFT
testWithTab	TEFT
`;
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          presentedMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([
            { phrase: "testWithTab", stroke: "TEFT" },
          ]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "success",
        [],
      ]);
    });
  });
  describe("has only lines with no tabs or no words", () => {
    it("should return empty lesson with fail message", () => {
      const customMaterial = `	TEFT
testWithNoTab
`;
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [],
          presentedMaterial: [{ phrase: "", stroke: "" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([{ phrase: "", stroke: "" }]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "fail",
        ["Your material needs at least 1 word and 1 “Tab” character"],
      ]);
    });
  });
  describe("has a line with multiple tabs", () => {
    it("should return a lesson with the first stroke provided", () => {
      const customMaterial = `testWithTab	TEFT	TEFTD`;
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          presentedMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([
            { phrase: "testWithTab", stroke: "TEFT" },
          ]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "success",
        [],
      ]);
    });
  });
});
