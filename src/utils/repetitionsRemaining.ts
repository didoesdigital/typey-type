import type { PresentedMaterial, UserSettings } from "types";

export function repetitionsRemaining(
  userSettings: Partial<UserSettings> & Pick<UserSettings, "repetitions">,
  presentedMaterial: PresentedMaterial,
  currentPhraseID: number
) {
  let lessonLength = presentedMaterial.length;
  if (currentPhraseID > lessonLength) {
    return 0;
  }
  let reps = userSettings.repetitions;
  let wordsPerRep = lessonLength / userSettings.repetitions;
  let wordsRemaining = lessonLength - currentPhraseID;
  return reps - Math.floor((lessonLength - wordsRemaining) / wordsPerRep);
}
