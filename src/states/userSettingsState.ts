import { atomWithStorage } from "jotai/utils";
import { UserSettings } from "../types";
import { subFieldAtomGenerator } from "./atomUtils";

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

const subFieldAtom = subFieldAtomGenerator(userSettingsState);

export const startFromWordSettingState = subFieldAtom('startFromWord');
export const beatsPerMinuteState = subFieldAtom('beatsPerMinute');
export const upcomingWordsLayoutState = subFieldAtom('upcomingWordsLayout');
export const showScoresWhileTypingState = subFieldAtom('showScoresWhileTyping');
export const showStrokesAsDiagramsState = subFieldAtom('showStrokesAsDiagrams');
export const showStrokesAsListState = subFieldAtom('showStrokesAsList');
export const showStrokesOnMisstrokeState = subFieldAtom('showStrokesOnMisstroke');
export const sortOrderState = subFieldAtom('sortOrder');
export const spacePlacementState = subFieldAtom('spacePlacement');
export const stenoLayoutState = subFieldAtom('stenoLayout');
export const diagramSizeState = subFieldAtom('diagramSize');
export const limitNumberOfWordsState = subFieldAtom('limitNumberOfWords');
export const repetitionsState = subFieldAtom('repetitions');
export const hideOtherSettingsState = subFieldAtom('hideOtherSettings');
