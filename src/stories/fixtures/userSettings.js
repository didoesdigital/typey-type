/**
 *
 * @type {import("../../types").UserSettings}
 */
const userSettings = {
  beatsPerMinute: 10,
  blurMaterial: false,
  caseSensitive: false,
  diagramSize: 1.0,
  simpleTypography: true,
  punctuationDescriptions: true,
  retainedWords: true,
  limitNumberOfWords: 45,
  newWords: true,
  repetitions: 3,
  showScoresWhileTyping: true,
  showStrokes: true,
  showStrokesAsDiagrams: true,
  showStrokesAsList: false,
  showStrokesOnMisstroke: true,
  hideStrokesOnLastRepetition: true,
  spacePlacement: "spaceOff",
  speakMaterial: false,
  textInputAccessibility: true,
  sortOrder: "sortOff",
  seenWords: true,
  startFromWord: 1,
  study: "discover",
  studyPresets: [
    { limitNumberOfWords: 15, repetitions: 5 },
    { limitNumberOfWords: 50, repetitions: 3 },
    { limitNumberOfWords: 100, repetitions: 3 },
    { limitNumberOfWords: 0, repetitions: 1 },
  ],
  stenoLayout: "stenoLayoutAmericanSteno",
  upcomingWordsLayout: "singleLine",
  voiceName: "",
  voiceURI: "",
  hideOtherSettings: false,
};

export default userSettings;
