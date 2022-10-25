import type { StenoDictionary } from "../../types";
import chooseSEndingOverZEnding from "./chooseSEndingOverZEnding";
import chooseTEndingOverDEnding from "./chooseTEndingOverDEnding";
import penaliseSlashes from "./penaliseSlashes";
import penaliseStars from "./penaliseStars";
import penaliseSlashesWithoutPrefixesOrSuffixes from "./penaliseSlashesWithoutPrefixesOrSuffixes";

function rankOutlines(
  arrayOfStrokesAndTheirSourceDictNames: [string, string, string][],
  misstrokesJSON: StenoDictionary,
  translation: string,
  affixes = { suffixes: [], prefixes: [] }
) {
  misstrokesJSON = misstrokesJSON || {};
  arrayOfStrokesAndTheirSourceDictNames.sort((a, b) => {
    if (a[2] === "user" && b[2] !== "user") {
      return -1;
    }
    if (b[2] === "user" && a[2] !== "user") {
      return 1;
    }

    if (a[2] === "plover" && b[2] !== "plover") {
      return 1;
    }
    if (b[2] === "plover" && a[2] !== "plover") {
      return -1;
    }

    if (a[1] === "top-10000-project-gutenberg-words.json") {
      return -1;
    }
    if (b[1] === "top-10000-project-gutenberg-words.json") {
      return 1;
    }

    if (
      misstrokesJSON[a[0]] === translation &&
      !(misstrokesJSON[b[0]] === translation)
    ) {
      return 1;
    }
    if (
      misstrokesJSON[b[0]] === translation &&
      !(misstrokesJSON[a[0]] === translation)
    ) {
      return -1;
    }

    let outlineA = a[0];
    let outlineB = b[0];
    let outlineALengthWithAllPenalties = outlineA.length;
    let outlineBLengthWithAllPenalties = outlineB.length;

    outlineALengthWithAllPenalties += penaliseStars(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseStars(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashes(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseSlashes(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashesWithoutPrefixesOrSuffixes(
      outlineA,
      translation,
      affixes
    );
    outlineBLengthWithAllPenalties += penaliseSlashesWithoutPrefixesOrSuffixes(
      outlineB,
      translation,
      affixes
    );

    if (outlineALengthWithAllPenalties === outlineBLengthWithAllPenalties) {
      let outlineALastLetter = outlineA[outlineA.length - 1];
      let outlineBLastLetter = outlineB[outlineB.length - 1];

      if (
        "SZ".indexOf(outlineALastLetter) !== -1 &&
        "SZ".indexOf(outlineBLastLetter) !== -1
      ) {
        return chooseSEndingOverZEnding(outlineALastLetter, outlineBLastLetter);
      }

      if (
        "TD".indexOf(outlineALastLetter) !== -1 &&
        "TD".indexOf(outlineBLastLetter) !== -1
      ) {
        return chooseTEndingOverDEnding(
          outlineALastLetter,
          outlineBLastLetter,
          translation
        );
      }
    }

    return outlineALengthWithAllPenalties - outlineBLengthWithAllPenalties;
  });
  return arrayOfStrokesAndTheirSourceDictNames;
}
export default rankOutlines;
