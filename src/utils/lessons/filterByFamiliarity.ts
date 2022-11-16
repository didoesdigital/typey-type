import removeWhitespaceAndSumUniqMetWords from "../removeWhitespaceAndSumUniqMetWords";
import trimAndSumUniqMetWords from "../trimAndSumUniqMetWords";

import type { MetWords, PresentedMaterial } from "../../types";

type FamiliarityTest = (phrase: string) => boolean;

function filterByFamiliarity(
  presentedMaterial: PresentedMaterial,
  met: MetWords,
  userSettings: any,
  revisionMode: boolean
) {
  if (userSettings.spacePlacement === "spaceExact") {
    met = trimAndSumUniqMetWords(met);
  }

  if (userSettings.spacePlacement === "spaceOff") {
    met = removeWhitespaceAndSumUniqMetWords(met);
  }

  var localRevisionMode = revisionMode,
    newWords = userSettings.newWords,
    seenWords = userSettings.seenWords,
    retainedWords = userSettings.retainedWords,
    spacePlacement = userSettings.spacePlacement;

  var testNewWords = function (phrase: string) {
    if (!(phrase in met)) {
      return true;
    } else {
      return met[phrase] < 1;
    }
  };
  var testSeenWords = function (phrase: string) {
    if (!(phrase in met)) {
      return false;
    } else {
      return met[phrase] > 0 && met[phrase] < 30;
    }
  };
  var testRetainedWords = function (phrase: string) {
    if (!(phrase in met)) {
      return false;
    } else {
      return met[phrase] > 29;
    }
  };

  var tests: FamiliarityTest[] = [];
  if (localRevisionMode) {
    tests.push(testNewWords);
    tests.push(testSeenWords);
    tests.push(testRetainedWords);
  } else {
    if (retainedWords) {
      tests.push(testRetainedWords);
    }
    if (seenWords) {
      tests.push(testSeenWords);
    }
    if (newWords) {
      tests.push(testNewWords);
    }
  }

  var filterFunction = function (phrase: string) {
    if (spacePlacement === "spaceBeforeOutput") {
      phrase = " " + phrase;
    } else if (spacePlacement === "spaceAfterOutput") {
      phrase = phrase + " ";
    } else if (spacePlacement === "spaceOff") {
      phrase = phrase.replace(/\s/g, "");
    }
    for (var i = 0; i < tests.length; i++) {
      if (tests[i](phrase)) {
        return true;
      }
    }
    return false;
  };

  return presentedMaterial.filter((item) => filterFunction(item.phrase));
}

export default filterByFamiliarity;
