import { atomWithStorage } from "jotai/utils";
import { Experiments, GlobalUserSettings } from "../types";
import { subFieldAtomGenerator } from "./atomUtils";
import { atom, Getter, Setter } from "jotai";

export const globalUserSettingsState = atomWithStorage<GlobalUserSettings>("globalUserSettings", {
  experiments: {},
  flashcardsCourseLevel: "noviceCourse",
  showMisstrokesInLookup: false,
  writerInput: "qwerty",
  inputForKAOES: "qwerty",
  backupBannerDismissedTime: null
});

const subFieldAtom = subFieldAtomGenerator(globalUserSettingsState);

export const flashcardsCourseLevelState = subFieldAtom("flashcardsCourseLevel");
export const writerInputState = subFieldAtom("writerInput");
export const inputForKAOESState = subFieldAtom("inputForKAOES");
export const backupBannerDismissedTime = subFieldAtom("backupBannerDismissedTime");

export const experimentsState = atom(
  get => get(globalUserSettingsState).experiments,
  <S extends keyof Experiments>(get: Getter, set: Setter, key: S, value: Experiments[S]): void => {
    const settings = get(globalUserSettingsState);
    set(globalUserSettingsState, {
      ...settings, experiments: {
        ...settings.experiments,
        [key]: value
      }
    });
  });
