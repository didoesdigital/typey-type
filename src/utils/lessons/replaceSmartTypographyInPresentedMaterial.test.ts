import replaceSmartTypographyInPresentedMaterial from "./replaceSmartTypographyInPresentedMaterial";
import type { PresentedMaterial, UserSettings } from "../../types";

describe("replaceSmartTypographyInPresentedMaterial with typography", () => {
  let presentedMaterial: PresentedMaterial;
  beforeEach(() => {
    presentedMaterial = [
      { phrase: "madness—a", stroke: "PHAD/-PBS EPL/TKA*RB AEU" }, // em dash in a string
      { phrase: "—", stroke: "PH-RB" }, // em dash
      { phrase: "–", stroke: "TPH-RB" }, // en dash
      { phrase: "‑", stroke: "XXX" }, // non-breaking hyphen
      { phrase: "᠆", stroke: "XXX" }, // mongolian todo soft hyphen
      { phrase: "⹀", stroke: "XXX" }, // double hyphen
      { phrase: "…", stroke: "SKWR-RBGSZ" },
      { phrase: "“", stroke: "KW-GS" },
      { phrase: "”", stroke: "KR-GS" },
      { phrase: "‘", stroke: "TP-P" },
      { phrase: "’", stroke: "TP-L" },
      { phrase: "æ", stroke: "XXX" },
      { phrase: "Æ", stroke: "XXX" },
      { phrase: "ë", stroke: "XXX" },
    ];
  });

  describe("has fancy typography", () => {
    let userSettings: Pick<UserSettings, "simpleTypography"> = {
      simpleTypography: false,
    };

    it("should return a lesson with smart typography", () => {
      expect(
        replaceSmartTypographyInPresentedMaterial(
          presentedMaterial,
          userSettings
        )
      ).toEqual([
        { phrase: "madness—a", stroke: "PHAD/-PBS EPL/TKA*RB AEU" }, // em dash in a string
        { phrase: "—", stroke: "PH-RB" }, // em dash
        { phrase: "–", stroke: "TPH-RB" }, // en dash
        { phrase: "‑", stroke: "XXX" }, // non-breaking hyphen
        { phrase: "᠆", stroke: "XXX" }, // mongolian todo soft hyphen
        { phrase: "⹀", stroke: "XXX" }, // double hyphen
        { phrase: "…", stroke: "SKWR-RBGSZ" },
        { phrase: "“", stroke: "KW-GS" },
        { phrase: "”", stroke: "KR-GS" },
        { phrase: "‘", stroke: "TP-P" },
        { phrase: "’", stroke: "TP-L" },
        { phrase: "æ", stroke: "XXX" },
        { phrase: "Æ", stroke: "XXX" },
        { phrase: "ë", stroke: "XXX" },
      ]);
    });
  });

  describe("has simple typography", () => {
    let userSettings: Pick<UserSettings, "simpleTypography"> = {
      simpleTypography: true,
    };

    it("should return a lesson with dumb typography", () => {
      expect(
        replaceSmartTypographyInPresentedMaterial(
          presentedMaterial,
          userSettings
        )
      ).toEqual([
        { phrase: "madness-a", stroke: "PHAD/-PBS H-PB AEU" },
        { phrase: "-", stroke: "H-PB" },
        { phrase: "-", stroke: "H-PB" },
        { phrase: "-", stroke: "H-PB" },
        { phrase: "-", stroke: "H-PB" },
        { phrase: "-", stroke: "H-PB" },
        { phrase: "...", stroke: "HR-PS" },
        { phrase: '"', stroke: "KW-GS" },
        { phrase: '"', stroke: "KR-GS" },
        { phrase: "'", stroke: "AE" },
        { phrase: "'", stroke: "AE" },
        { phrase: "ae", stroke: "A*/*E" },
        { phrase: "Ae", stroke: "A*P/*E" },
        { phrase: "e", stroke: "*E" },
      ]);
    });
  });
});
