import type { UserSettings } from "../../../../types";
import PARAMS from "../../../../utils/params";

type NewSeenOrMemorised = readonly [boolean, boolean, boolean];

const getProgressRevisionUserSettings = (
  currentSettings: UserSettings,
  newSeenOrMemorised: NewSeenOrMemorised
) => {
  const newUserSettings = Object.assign({}, currentSettings);
  newUserSettings.newWords = newSeenOrMemorised[0];
  newUserSettings.seenWords = newSeenOrMemorised[1];
  newUserSettings.retainedWords = newSeenOrMemorised[2];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, revisePreset, drillPreset, practicePreset] =
    currentSettings?.studyPresets ?? [
      { limitNumberOfWords: 5, repetitions: 5 },
      { limitNumberOfWords: 50, repetitions: 3 },
      { limitNumberOfWords: 100, repetitions: 3 },
      { limitNumberOfWords: 300, repetitions: 1 },
    ];

  if (newSeenOrMemorised[1] && !newSeenOrMemorised[2]) {
    newUserSettings.study = "revise";
    // @ts-ignore TODO: convert params.js to TS
    newUserSettings.sortOrder = PARAMS.revise.sortOrder;
    newUserSettings.limitNumberOfWords = revisePreset.limitNumberOfWords;
    newUserSettings.repetitions = revisePreset.repetitions;
    newUserSettings.showStrokes = PARAMS.revise.showStrokes;
  } else if (newSeenOrMemorised[2] && !newSeenOrMemorised[1]) {
    newUserSettings.study = "drill";
    // @ts-ignore TODO: convert params.js to TS
    newUserSettings.sortOrder = PARAMS.drill.sortOrder;
    newUserSettings.limitNumberOfWords = drillPreset.limitNumberOfWords;
    newUserSettings.repetitions = drillPreset.repetitions;
    newUserSettings.showStrokes = PARAMS.drill.showStrokes;
  } else {
    newUserSettings.study = "practice";
    // @ts-ignore TODO: convert params.js to TS
    newUserSettings.sortOrder = PARAMS.practice.sortOrder;
    newUserSettings.limitNumberOfWords = practicePreset.limitNumberOfWords;
    newUserSettings.repetitions = practicePreset.repetitions;
    newUserSettings.showStrokes = PARAMS.practice.showStrokes;
  }

  return newUserSettings;
};

export default getProgressRevisionUserSettings;
