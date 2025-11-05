import type { LessonSettings, MaterialText, UserSettings } from "types";

export type PartialUserSettingsAndCaseAndSpacePlacement =
  Partial<UserSettings> &
    Pick<UserSettings, "caseSensitive" | "spacePlacement">;

/** e.g. " ant" (with space) */
type ActualText = string;

/** e.g. " an" */
type MatchedExpected = string;
/** e.g. "d" */
type UnmatchedExpected = string;
/** e.g. " an" */
type MatchedActual = string;
/** e.g. "t" */
type UnmatchedActual = string;
/**
 * return type for matchSplitText that
 * */
type MatchSplitTextReturn = [
  MatchedExpected,
  UnmatchedExpected,
  MatchedActual,
  UnmatchedActual
];

/**
 *
 * @param expected - e.g. "and" (no space)
 * @param actualText - e.g. " ant" (with space)
 * @param settings - e.g. { ignoredChars: "" }
 * @param userSettings - e.g. { spacePlacement: "spaceBeforeOutput", caseSensitive: true}
 * @returns MatchSplitTextReturn - e.g. [" an", "d", " an", "t"], including spaces in returned matchedExpected: MatchedExpected unlike the input argument expected: MaterialText
 */
function matchSplitText(
  expected: MaterialText,
  actualText: ActualText,
  settings: LessonSettings = { ignoredChars: "" },
  userSettings: PartialUserSettingsAndCaseAndSpacePlacement
): MatchSplitTextReturn {
  if (userSettings?.spacePlacement === "spaceBeforeOutput") {
    expected = " " + expected;
  } else if (userSettings?.spacePlacement === "spaceAfterOutput") {
    expected = expected + " ";
  }
  const expectedChars = expected.split("");
  const actualTextChars = actualText.split("");
  let charactersMatch: (char1: string, char2: string) => boolean;
  let expectedIndex = 0;
  let actualTextIndex = 0;
  let ignoredChars = settings.ignoredChars.slice(0);

  if (userSettings?.caseSensitive) {
    charactersMatch = function (char1, char2) {
      return char1 === char2;
    };
  } else {
    charactersMatch = function (char1, char2) {
      return char1.toUpperCase() === char2.toUpperCase();
    };
  }

  if (userSettings?.spacePlacement === "spaceOff") {
    ignoredChars += " ";
  }

  for (
    ;
    actualTextIndex < actualTextChars.length &&
    expectedIndex < expectedChars.length;
    expectedIndex++, actualTextIndex++
  ) {
    // Is material char an ignored char?
    while (ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
      expectedIndex++;
      if (expectedIndex >= expectedChars.length) {
        break;
      }
    }

    // Is typed char an ignored space?
    while (
      userSettings?.spacePlacement === "spaceOff" &&
      actualTextChars[actualTextIndex] === " "
    ) {
      actualTextIndex++;
      if (actualTextIndex >= actualTextChars.length) {
        break;
      }
    }

    // If typed char is undefined, break
    if (!actualTextChars[actualTextIndex]) {
      break;
    }

    // If material char is undefined, break
    if (!expectedChars[expectedIndex]) {
      break;
    }

    // Do material and typed chars match?
    if (
      !charactersMatch(
        actualTextChars[actualTextIndex],
        expectedChars[expectedIndex]
      )
    ) {
      break;
    }
  }

  // Alternative approach to matching trailing ignored character ^ does not work on ignored spaces setting when there are many ignored characters in the middle of the word
  // if (expectedChars.length > actualTextChars.length) {
  //   // Is material char an ignored char?
  //   while(ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
  //     expectedIndex++;
  //     if (expectedIndex >= expectedChars.length) {
  //       break;
  //     };
  //   }
  // }

  const matchedExpected = expectedChars.slice(0, expectedIndex).join("");
  const unmatchedExpected = expectedChars.slice(expectedIndex).join("");
  const matchedActual = actualTextChars.slice(0, actualTextIndex).join("");
  const unmatchedActual = actualTextChars.slice(actualTextIndex).join("");

  return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
}

export { matchSplitText };
