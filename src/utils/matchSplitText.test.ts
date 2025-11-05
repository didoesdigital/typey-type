import {
  matchSplitText,
  type PartialUserSettingsAndCaseAndSpacePlacement,
} from "./matchSplitText";

describe("matchSplitText", () => {
  describe("case insensitive, ignore spacing", () => {
    const settings = { ignoredChars: "" };
    const userSettings: PartialUserSettingsAndCaseAndSpacePlacement = {
      caseSensitive: false,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: "spaceOff",
      sortOrder: "sortOff",
      seenWords: true,
    };

    it("splits typed text into matching and not matching text for partially matching typed text with a misstroke, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "ant";
      const expected = ["an", "d", "an", "t"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for typed text that matches so far but is not finished, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "an";
      const expected = ["an", "d", "an", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for a misstroke, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "the";
      const expected = ["", "and", "", "the"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for perfectly stroked text, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", "", "and", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "And";
      const expected = ["and", "", "And", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked multi-word text, ignore spacing", () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["as well as", "", "as well as", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for stroked multi-word text, ignore spacing", () => {
      const expectedText = "as well as";
      const actualText = "aswell  as";
      const expected = ["as well as", "", "aswell  as", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for prefix with ignored chars, ignore spacing", () => {
      const settings = { ignoredChars: "^" };
      const expectedText = "over-the-^";
      const actualText = "over-the-";
      const expected = ["over-the-", "", "over-the-", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits a word with excess chars", () => {
      const expectedText = "French";
      const actualText = "Frenches";
      const expected = ["French", "", "French", "es"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits multiple words", () => {
      const expectedText = "There";
      const actualText = "There are";
      const expected = ["There", "", "There", " are"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });
  });

  describe("case sensitive, no spacing", () => {
    const settings = { ignoredChars: "" };
    const userSettings: PartialUserSettingsAndCaseAndSpacePlacement = {
      caseSensitive: true,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: "spaceOff",
      sortOrder: "sortOff",
      seenWords: true,
    };

    it("splits typed text into matching and not matching text for partially matching typed text with a misstroke, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "ant";
      const expected = ["an", "d", "an", "t"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for typed text that matches so far but is not finished, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "an";
      const expected = ["an", "d", "an", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for a misstroke, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "the";
      const expected = ["", "and", "", "the"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for perfectly stroked text, ignore spacing", () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", "", "and", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, ignore spacing", () => {
      const expectedText = "And";
      const actualText = "and";
      const expected = ["", "And", "", "and"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for multi-word text, ignore spacing", () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["as well as", "", "as well as", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for multi-word text, ignore spacing", () => {
      const expectedText = "as well as";
      const actualText = "aswellAs";
      const expected = ["as well ", "as", "aswell", "As"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });
  });

  describe("case sensitive, space before", () => {
    const settings = { ignoredChars: "" };
    const userSettings: PartialUserSettingsAndCaseAndSpacePlacement = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: "spaceBeforeOutput",
      sortOrder: "sortOff",
      seenWords: true,
    };

    it("splits typed text into matching and not matching text for partially matching typed text with a misstroke, space before", () => {
      const expectedText = "and";
      const actualText = " ant";
      const expected = [" an", "d", " an", "t"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for typed text that matches so far but is not finished, space before", () => {
      const expectedText = "and";
      const actualText = " an";
      const expected = [" an", "d", " an", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for a misstroke, space before", () => {
      const expectedText = "and";
      const actualText = " the";
      const expected = [" ", "and", " ", "the"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for perfectly stroked text, space before", () => {
      const expectedText = "and";
      const actualText = " and";
      const expected = [" and", "", " and", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, space before", () => {
      const expectedText = "And";
      const actualText = " and";
      const expected = [" ", "And", " ", "and"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked multi-word text, space before", () => {
      const expectedText = "as well as";
      const actualText = " as well as";
      const expected = [" as well as", "", " as well as", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for incorrectly spaced multi-word text, space before", () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["", " as well as", "", "as well as"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for prefix with ignored chars, ignore spacing", () => {
      const settings = { ignoredChars: "^" };
      const expectedText = "over-the-^";
      const actualText = " over-the-";
      const expected = [" over-the-", "", " over-the-", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits a word with excess chars", () => {
      const expectedText = "French";
      const actualText = " Frenches";
      const expected = [" French", "", " French", "es"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits multiple words", () => {
      const expectedText = "There";
      const actualText = " There are";
      const expected = [" There", "", " There", " are"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });
  });

  describe("case sensitive, space before, ignoredChars", () => {
    const settings = { ignoredChars: "^-" };
    const userSettings: PartialUserSettingsAndCaseAndSpacePlacement = {
      caseSensitive: true,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: "spaceBeforeOutput",
      sortOrder: "sortOff",
      seenWords: true,
    };

    it("splits typed text into matching and not matching text for partially matching typed text with a misstroke, an ignored char, space before", () => {
      const expectedText = "^and";
      const actualText = " ant";
      const expected = [" ^an", "t", " an", "t"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for a misstroke, an ignored char, space before", () => {
      const expectedText = "and";
      const actualText = " ^an the";
      const expected = [" ", "and", " ", "^an the"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space before", () => {
      const expectedText = "and^";
      const actualText = " an^";
      const expected = [" an", "d^", " an", "^"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for perfectly stroked text, an ignored char, space before", () => {
      const expectedText = "-and";
      const actualText = " and";
      const expected = [" -and", "", " and", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, an ignored char, space before", () => {
      const expectedText = "-And";
      const actualText = " and";
      const expected = [" -", "And", " ", "and"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space before", () => {
      const expectedText = "as^well^as";
      const actualText = " aswell as";
      const expected = [" as^well^", "as", " aswell", " as"];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });
  });

  describe("case sensitive, space after, ignoredChars", () => {
    const settings = { ignoredChars: "^-" };
    const userSettings: PartialUserSettingsAndCaseAndSpacePlacement = {
      caseSensitive: true,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: "spaceAfterOutput",
      sortOrder: "sortOff",
      seenWords: true,
    };

    it("splits typed text into matching and not matching text for partially matching typed text with a misstroke, an ignored char, space after", () => {
      const expectedText = "^and";
      const actualText = "ant ";
      const expected = ["^an", "d ", "an", "t "];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for a misstroke, an ignored char, space after", () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", " ", "and", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space after", () => {
      const expectedText = "and^";
      const actualText = "and";
      const expected = ["and", "^ ", "and", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for perfectly stroked text, space after", () => {
      const expectedText = "and";
      const actualText = "and ";
      const expected = ["and ", "", "and ", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, an ignored char, space after", () => {
      const expectedText = "And";
      const actualText = "and ";
      const expected = ["", "And ", "", "and "];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space after", () => {
      const expectedText = "as^well^as";
      const actualText = "aswell as ";
      const expected = ["as^well^", "as ", "aswell", " as "];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for prefix with ignored chars, ignore spacing", () => {
      const settings = { ignoredChars: "^" };
      const expectedText = "over-the-^";
      const actualText = "over-the- ";
      const expected = ["over-the- ", "", "over-the- ", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits a word with excess chars", () => {
      const expectedText = "French";
      const actualText = "Frenches ";
      const expected = ["French", " ", "French", "es "];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits multiple words", () => {
      const expectedText = "There";
      const actualText = "There are ";
      const expected = ["There ", "", "There ", "are "];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });
  });

  describe("case sensitive, space off, ignoredChars", () => {
    const settings = { ignoredChars: "^-" };
    const userSettings: PartialUserSettingsAndCaseAndSpacePlacement = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      showStrokesAsList: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: "spaceOff",
      sortOrder: "sortOff",
      seenWords: true,
    };

    it("splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space off", () => {
      const expectedText = " as^well^as";
      const actualText = " as  we ll as";
      const expected = [" as^well^as", "", " as  we ll as", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    it("splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space off", () => {
      const expectedText = " as^well^as";
      const actualText = " as  we";
      const expected = [" as^we", "ll^as", " as  we", ""];
      expect(
        matchSplitText(expectedText, actualText, settings, userSettings)
      ).toEqual(expect.arrayContaining(expected));
    });

    // it('splits typed text into matching and not matching text for typed text that matches but needs a trailing space, ignored caret, no added spaces to material', () => {
    //   const expectedText = "and^ ";
    //   const actualText = "and";
    //   const expected = ["and", "^ ", "and", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches with a trailing space, an ignored char, space off', () => {
    //   const expectedText = "and^ ";
    //   const actualText = "and ";
    //   const expected = ["and^ ", "", "and ", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches with no trailing space, an ignored char, space off', () => {
    //   const expectedText = "and^";
    //   const actualText = "and";
    //   const expected = ["and^", "", "and", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space off', () => {
    //   const expectedText = "and^ the";
    //   const actualText = "and the";
    //   const expected = ["and^ the", "", "and the", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });
  });
  // return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
});
