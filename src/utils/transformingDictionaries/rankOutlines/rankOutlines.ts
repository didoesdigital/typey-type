import penaliseSlashes from "./penaliseSlashes";
import penaliseStars from "./penaliseStars";
import penaliseSlashesWithoutPrefixesOrSuffixes from "./penaliseSlashesWithoutPrefixesOrSuffixes";
import penaliseStretchKeys from "./penaliseStretchKeys";
// import preferPhrasingBriefStarters from "./preferPhrasingBriefStarters";

import type {
  AffixObject,
  StenoDictionary,
  StrokeAndDictionaryAndNamespace,
} from "../../../types";

function rankOutlines(
  arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[],
  misstrokesJSON: StenoDictionary,
  translation: string,
  affixes: AffixObject = { suffixes: [], prefixes: [] }
) {
  misstrokesJSON = misstrokesJSON || {};
  arrayOfStrokesAndTheirSourceDictNames.sort((a, b) => {
    if (a[2] === "user" && b[2] !== "user") {
      return -1; // sort a before b
    }
    if (b[2] === "user" && a[2] !== "user") {
      return 1; // sort a after b
    }

    if (a[1] === "top-10000-project-gutenberg-words.json") {
      return -1; // sort a before b
    }
    if (b[1] === "top-10000-project-gutenberg-words.json") {
      return 1; // sort a after b
    }

    if (
      misstrokesJSON[a[0]] === translation &&
      !(misstrokesJSON[b[0]] === translation)
    ) {
      return 1; // sort a after b
    }
    if (
      misstrokesJSON[b[0]] === translation &&
      !(misstrokesJSON[a[0]] === translation)
    ) {
      return -1; // sort a before b
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

    // In the future, we'll add this to prioritise phrasing brief starters
    // [outlineALengthWithAllPenalties, outlineBLengthWithAllPenalties] =
    //   preferPhrasingBriefStarters(
    //     translation,
    //     outlineA,
    //     outlineB,
    //     outlineALengthWithAllPenalties,
    //     outlineBLengthWithAllPenalties
    //   );

    if (outlineALengthWithAllPenalties === outlineBLengthWithAllPenalties) {
      outlineALengthWithAllPenalties += penaliseStretchKeys(
        outlineA,
        outlineB,
        translation
      );
      outlineBLengthWithAllPenalties += penaliseStretchKeys(
        outlineB,
        outlineA,
        translation
      );
    }

    return outlineALengthWithAllPenalties - outlineBLengthWithAllPenalties;
  });
  return arrayOfStrokesAndTheirSourceDictNames;
}
export default rankOutlines;
