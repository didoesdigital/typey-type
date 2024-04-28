import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { UserSettings } from "../types";

export const userSettingsState = atomWithStorage<UserSettings>("userSettings", {
    beatsPerMinute: 10,
    blurMaterial: false,
    caseSensitive: false,
    diagramSize: 1.0,
    simpleTypography: true,
    punctuationDescriptions: false,
    retainedWords: true,
    limitNumberOfWords: 45,
    startFromWord: 1,
    newWords: true,
    repetitions: 3,
    showScoresWhileTyping: true,
    showStrokes: true,
    showStrokesAsDiagrams: true,
    showStrokesAsList: false,
    showStrokesOnMisstroke: true,
    hideStrokesOnLastRepetition: true,
    spacePlacement: 'spaceOff',
    speakMaterial: false,
    textInputAccessibility: true,
    sortOrder: 'sortOff',
    seenWords: true,
    study: 'discover',
    stenoLayout: 'stenoLayoutAmericanSteno',
    upcomingWordsLayout: 'singleLine',
    studyPresets: [
      { limitNumberOfWords: 15, repetitions: 5, },
      { limitNumberOfWords: 50, repetitions: 3, },
      { limitNumberOfWords: 100, repetitions: 3, },
      { limitNumberOfWords: 0, repetitions: 1, },
    ],
    voiceName: '',
    voiceURI: '',
    hideOtherSettings: false,
  });


export const startFromWordSettingState = atom((get)=>get(userSettingsState).startFromWord);
export const spacePlacementState = atom((get)=>get(userSettingsState).spacePlacement);
export const beatsPerMinuteState = atom((get)=>get(userSettingsState).beatsPerMinute);
export const upcomingWordsLayoutState = atom((get)=>get(userSettingsState).upcomingWordsLayout);

export const showScoresWhileTypingState = atom(
  (get) => get(userSettingsState).showScoresWhileTyping,
  (get, set, update: boolean) => {
    set(userSettingsState, { ...get(userSettingsState), showScoresWhileTyping: update });
  });
