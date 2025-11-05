import { mapQWERTYKeysToStenoStroke } from "./mapQWERTYKeysToStenoStroke";

describe("mapQWERTYKeysToStenoStroke", () => {
  describe("American stroke with star", () => {
    it("should return as it was", () => {
      const qwertyString = "dfchp";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "WRA*T";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with center vowels", () => {
    it("should return as it was", () => {
      const qwertyString = "dc;";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "WAS";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with one right-side key that appears on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "dfj";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "WR-R";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with multiple right-side keys that appears on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "rop;";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "H-LTS";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with F and no vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "rfu";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "HR-F";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with F, P, and no vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "rfui";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "HR-FP";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke without vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "p";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "-T";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with one right-side key that appears on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "uj";
      const stenoLayout = "stenoLayoutAmericanSteno";

      // let stenoBriefClickedString = 'F-R';
      const stenoBrief = "-FR";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with multiple right-side keys that appear on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      const qwertyString = "uiop";
      const stenoLayout = "stenoLayoutAmericanSteno";

      // let stenoBriefClickedString = 'F-PL-T';
      const stenoBrief = "-FPLT";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with vowels", () => {
    it("should return as it was", () => {
      const qwertyString = "nuj";
      const stenoLayout = "stenoLayoutAmericanSteno";

      // let stenoBriefClickedString = 'EF-R';
      const stenoBrief = "EFR";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with star", () => {
    it("should return as it was", () => {
      const qwertyString = "hnuj[";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "*EFRD";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American number bar stroke", () => {
    it("should return as it was", () => {
      const qwertyString = "3'";
      const stenoLayout = "stenoLayoutAmericanSteno";

      const stenoBrief = "#-Z";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });
});
