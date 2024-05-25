import { atomWithStorage } from "jotai/utils";
import { GlobalUserSettings } from "../types";

export const globalUserSettingsState = atomWithStorage<GlobalUserSettings>("globalUserSettings", {
    experiments: {},
    flashcardsCourseLevel: "noviceCourse",
    showMisstrokesInLookup: false,
    writerInput: "qwerty",
    inputForKAOES: "qwerty",
    backupBannerDismissedTime: null,
  });
