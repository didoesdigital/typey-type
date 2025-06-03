import { repetitionsRemaining } from "./repetitionsRemaining";

describe("repetitionsRemaining", () => {
  describe("for 4 reps and 3 words", () => {
    const userSettings = {
      repetitions: 4,
    };
    const presentedMaterial = [
      { phrase: "apple", stroke: "A*EPL" }, // 0 => 4    // 12 words remaining
      { phrase: "banana", stroke: "PWA/TPHA/TPHA" }, // 1 => 4    // 11 words remaining
      { phrase: "coffee", stroke: "KOF/TPAOE" }, // 2 => 4    // 10 words remaining

      { phrase: "apple", stroke: "A*EPL" }, // 3 => 3    // 9 words remaining
      { phrase: "banana", stroke: "PWA/TPHA/TPHA" }, // 4 => 3    // 8 words remaining
      { phrase: "coffee", stroke: "KOF/TPAOE" }, // 5 => 3    // 7 words remaining

      { phrase: "apple", stroke: "A*EPL" }, // 6 => 2    // 6 words remaining
      { phrase: "banana", stroke: "PWA/TPHA/TPHA" }, // 7 => 2    // 5 words remaining
      { phrase: "coffee", stroke: "KOF/TPAOE" }, // 8 => 2    // 4 words remaining

      { phrase: "apple", stroke: "A*EPL" }, // 9 => 1    // 3 words remaining
      { phrase: "banana", stroke: "PWA/TPHA/TPHA" }, // 10 => 1   // 2 words remaining
      { phrase: "coffee", stroke: "KOF/TPAOE" }, // 11 => 1   // 1 word remaining
    ];
    let currentPhraseID = 0;

    it("on first word, returns full reps remaining from userSettings", () => {
      currentPhraseID = 0;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(4);
    });
    it("on third word, returns full reps remaining from userSettings", () => {
      currentPhraseID = 2;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(4);
    });
    it("on fourth word, returns full reps minus 1", () => {
      currentPhraseID = 3;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(3);
    });
    it("on sixth word, returns full reps minus 1", () => {
      currentPhraseID = 5;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(3);
    });
    it("on seventh word, returns full reps minus 1", () => {
      currentPhraseID = 6;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(2);
    });
    it("on ninth word, returns full reps minus 1", () => {
      currentPhraseID = 8;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(2);
    });
    it("on tenth word, returns full reps minus 3", () => {
      currentPhraseID = 9;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(1);
    });
    it("on twelfth word, returns full reps minus 3", () => {
      currentPhraseID = 11;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(1);
    });
    it("on words higher than lesson length, returns 0 reps remaining", () => {
      currentPhraseID = 12;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(0);
    });
  });

  describe("for 1 rep and 3 words", () => {
    const userSettings = {
      repetitions: 1,
    };
    const presentedMaterial = [
      { phrase: "apple", stroke: "A*EPL" },
      { phrase: "banana", stroke: "PWA/TPHA/TPHA" },
      { phrase: "coffee", stroke: "KOF/TPAOE" },
    ];
    let currentPhraseID = 0;

    it("on first word, returns full reps remaining from userSettings", () => {
      currentPhraseID = 0;
      expect(
        repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)
      ).toEqual(1);
    });
  });
});
