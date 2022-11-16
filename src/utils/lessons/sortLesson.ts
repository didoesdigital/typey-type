import { randomise } from "../utils";
import type { PresentedMaterial, MetWords, UserSettings } from "../../types";

function sortLesson(
  presentedMaterial: PresentedMaterial,
  met: MetWords,
  userSettings: Pick<UserSettings, "spacePlacement" | "sortOrder">
) {
  if (userSettings.sortOrder === "sortRandom") {
    return randomise(presentedMaterial);
  } else if (
    userSettings.sortOrder === "sortNew" ||
    userSettings.sortOrder === "sortOld"
  ) {
    let spaceBefore = "";
    let spaceAfter = "";
    if (
      userSettings &&
      userSettings.spacePlacement &&
      userSettings.spacePlacement === "spaceBeforeOutput"
    ) {
      spaceBefore = " ";
    }
    if (
      userSettings &&
      userSettings.spacePlacement &&
      userSettings.spacePlacement === "spaceAfterOutput"
    ) {
      spaceAfter = " ";
    }

    presentedMaterial.sort(function (a, b) {
      let seenA = met[spaceBefore + a.phrase + spaceAfter] || 0;
      let seenB = met[spaceBefore + b.phrase + spaceAfter] || 0;
      return userSettings.sortOrder === "sortNew"
        ? seenA - seenB
        : seenB - seenA;
    });
  } else if (userSettings.sortOrder === "sortShortest") {
    presentedMaterial.sort((a, b) => {
      const aLength = [...a.phrase].length;
      const bLength = [...b.phrase].length;
      return aLength < bLength ? -1 : aLength > bLength ? 1 : 0;
    });
  } else if (userSettings.sortOrder === "sortLongest") {
    presentedMaterial.sort((a, b) => {
      const aLength = [...a.phrase].length;
      const bLength = [...b.phrase].length;
      return bLength < aLength ? -1 : bLength > aLength ? 1 : 0;
    });
  }
  return presentedMaterial;
}

export default sortLesson;
