import sortLesson from "./sortLesson";
import { PresentedMaterial, UserSettings } from "../../types";
// @ts-ignore TODO: sort out types
import { mockRandomForEach } from "jest-mock-random";

describe("sortLesson", () => {
  describe("spaces", () => {
    const metWords = {
      " at": 14,
      " her": 10,
      " sounds": 14,
    };
    let presentedMaterial: PresentedMaterial;
    beforeEach(() => {
      presentedMaterial = [
        { phrase: "her", stroke: "HER" },
        { phrase: "at", stroke: "AT" },
        { phrase: "sounds", stroke: "SOUPBDZ" },
      ];
    });

    describe("when settings sort by old", () => {
      const userSettings: Pick<UserSettings, "sortOrder" | "spacePlacement"> = {
        sortOrder: "sortOld",
        spacePlacement: "spaceBeforeOutput",
      };
      it("should present material by oldest met brief first", () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual([
          { phrase: "at", stroke: "AT" },
          { phrase: "sounds", stroke: "SOUPBDZ" },
          { phrase: "her", stroke: "HER" },
        ]);
      });
    });
    describe("when settings sort by newest met brief first", () => {
      const userSettings: Pick<UserSettings, "sortOrder" | "spacePlacement"> = {
        sortOrder: "sortNew",
        spacePlacement: "spaceBeforeOutput",
      };
      it("should present material by newest met brief first", () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual([
          { phrase: "her", stroke: "HER" },
          { phrase: "at", stroke: "AT" },
          { phrase: "sounds", stroke: "SOUPBDZ" },
        ]);
      });
    });
  });

  describe("no spaces", () => {
    const metWords = {
      "the": 30,
      "of": 1,
    };
    let presentedMaterial: PresentedMaterial;
    beforeEach(() => {
      presentedMaterial = [
        { phrase: "the", stroke: "-T" },
        { phrase: "of", stroke: "-F" },
        { phrase: "and", stroke: "SKP" },
      ];
    });

    describe("when settings sort by random", () => {
      const userSettings: Pick<UserSettings, "sortOrder" | "spacePlacement"> = {
        sortOrder: "sortRandom",
        spacePlacement: "spaceOff",
      };
      mockRandomForEach([0.1]);
      it("should present material in a randomised order", () => {
        expect(
          sortLesson(presentedMaterial, metWords, userSettings)
        ).not.toEqual([
          { phrase: "the", stroke: "-T" },
          { phrase: "of", stroke: "-F" },
          { phrase: "and", stroke: "SKP" },
        ]);
      });
    });
    describe("when settings sort by old", () => {
      const userSettings: Pick<UserSettings, "sortOrder" | "spacePlacement"> = {
        sortOrder: "sortOld",
        spacePlacement: "spaceOff",
      };
      it("should present material by oldest met brief first", () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual([
          { phrase: "the", stroke: "-T" },
          { phrase: "of", stroke: "-F" },
          { phrase: "and", stroke: "SKP" },
        ]);
      });
    });
    describe("when settings sort by newest met brief first", () => {
      const userSettings: Pick<UserSettings, "sortOrder" | "spacePlacement"> = {
        sortOrder: "sortNew",
        spacePlacement: "spaceOff",
      };
      it("should present material by newest met brief first", () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual([
          { phrase: "and", stroke: "SKP" },
          { phrase: "of", stroke: "-F" },
          { phrase: "the", stroke: "-T" },
        ]);
      });
    });
    describe("when settings sort off, by natural lesson order", () => {
      const userSettings: Pick<UserSettings, "sortOrder" | "spacePlacement"> = {
        sortOrder: "sortOff",
        spacePlacement: "spaceOff",
      };
      it("should present material in order", () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual([
          { phrase: "the", stroke: "-T" },
          { phrase: "of", stroke: "-F" },
          { phrase: "and", stroke: "SKP" },
        ]);
      });
    });
  });
});
