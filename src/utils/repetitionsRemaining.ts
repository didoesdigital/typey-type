import type { PresentedMaterial, UserSettings } from "types";

export function repetitionsRemaining(
  userSettings: Partial<UserSettings> & Pick<UserSettings, "repetitions">,
  presentedMaterial: PresentedMaterial,
  currentPhraseID: number
) {
  const lessonLength = presentedMaterial.length;
  if (currentPhraseID > lessonLength) {
    return 0;
  }
  const reps = userSettings.repetitions;
  const wordsPerRep = lessonLength / userSettings.repetitions;
  const wordsRemaining = lessonLength - currentPhraseID;
  return reps - Math.floor((lessonLength - wordsRemaining) / wordsPerRep);
}
