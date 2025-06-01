import { mapQWERTYKeysToStenoStroke } from "./mapQWERTYKeysToStenoStroke";

describe("mapQWERTYKeysToStenoStroke", () => {
  describe("American stroke with star", () => {
    it("should return as it was", () => {
      let qwertyString = "dfchp";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "WRA*T";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with center vowels", () => {
    it("should return as it was", () => {
      let qwertyString = "dc;";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "WAS";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with one right-side key that appears on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "dfj";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "WR-R";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with multiple right-side keys that appears on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "rop;";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "H-LTS";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with F and no vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "rfu";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "HR-F";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American stroke with F, P, and no vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "rfui";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "HR-FP";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke without vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "p";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "-T";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with one right-side key that appears on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "uj";
      let stenoLayout = "stenoLayoutAmericanSteno";

      // let stenoBriefClickedString = 'F-R';
      let stenoBrief = "-FR";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with multiple right-side keys that appear on both sides, without vowels or star", () => {
    it("should return as it was", () => {
      let qwertyString = "uiop";
      let stenoLayout = "stenoLayoutAmericanSteno";

      // let stenoBriefClickedString = 'F-PL-T';
      let stenoBrief = "-FPLT";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with vowels", () => {
    it("should return as it was", () => {
      let qwertyString = "nuj";
      let stenoLayout = "stenoLayoutAmericanSteno";

      // let stenoBriefClickedString = 'EF-R';
      let stenoBrief = "EFR";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American right-side stroke with star", () => {
    it("should return as it was", () => {
      let qwertyString = "hnuj[";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "*EFRD";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });

  describe("American number bar stroke", () => {
    it("should return as it was", () => {
      let qwertyString = "3'";
      let stenoLayout = "stenoLayoutAmericanSteno";

      let stenoBrief = "#-Z";
      expect(
        mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()
      ).toEqual(stenoBrief);
    });
  });
});
