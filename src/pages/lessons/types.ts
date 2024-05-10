import type {
  // CurrentLessonStrokes,
  GlobalUserSettings,
  Lesson,
  MetWords,
  PrettyLessonTitle,
  UserSettings,
  Study,
  CurrentLessonStrokes,
  FetchAndSetupGlobalDict,
  LookupDictWithNamespacedDictsAndConfig,
  PersonalDictionaryNameAndContents,
} from "../../types";
import { RecentLessonHistoryItem } from "../progress/components/RecentLessons";

export type LessonData = {
  version: number;
  lessonStrokes: any[];
  startTime: number;
  wpm: number;
} | null;

export type TransformedData = {
  averageWPM: number;
  version: number;
  dataPoints?: any[];
} | null;

export type LessonProps = {
  actualText: string;
  changeFullscreen: any;
  changeShowScoresWhileTyping: (event: any) => void;
  changeShowStrokesAs: (event: any) => void;
  changeShowStrokesAsList: (event: any) => void;
  changeShowStrokesInLesson: any;
  changeShowStrokesOnMisstroke: (event: any) => void;
  changeSortOrderUserSetting: (event: any) => void;
  changeSpacePlacementUserSetting: (event: any) => void;
  changeStenoLayout: (event: any) => void;
  changeUserSetting: (event: any) => void;
  changeVoiceUserSetting: (voiceName: string, voiceURI: string) => void;
  chooseStudy: () => void;
  completedPhrases: any;
  currentLessonStrokes: CurrentLessonStrokes[];
  currentPhrase: string;
  currentPhraseID: number;
  currentStroke: string;
  customiseLesson: any;
  disableUserSettings: boolean;
  fetchAndSetupGlobalDict: FetchAndSetupGlobalDict;
  flashcardsMetWords: any;
  flashcardsProgress: any;
  fullscreen: any;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: any;
  globalUserSettings: GlobalUserSettings;
  handleBeatsPerMinute: (event: any) => void;
  handleDiagramSize: (event: any) => void;
  handleLesson: any;
  handleLimitWordsChange: (event: any) => void;
  handleRepetitionsChange: (event: any) => void;
  handleStartFromWordChange: (event: any) => void;
  handleStopLesson: any;
  handleUpcomingWordsLayout: (event: any) => void;
  toggleHideOtherSettings: () => void;
  lesson: Lesson;
  lessonIndex: any;
  lessonLength: number;
  lessonNotFound: any;
  lessonSubTitle: any;
  lessonTitle: PrettyLessonTitle;
  location: any;
  match: any;
  metWords: MetWords;
  personalDictionaries: PersonalDictionaryNameAndContents[];
  previousCompletedPhraseAsTyped: string;
  recentLessonHistory: RecentLessonHistoryItem[];
  repetitionsRemaining: number;
  restartLesson: any;
  reviseLesson: any;
  revisionMode: any;
  sayCurrentPhraseAgain: any;
  setUpProgressRevisionLesson: any;
  settings: any;
  setupLesson: any;
  showStrokesInLesson: any;
  startCustomLesson: any;
  startFromWordOne: any;
  startTime: any;
  stopLesson: any;
  targetStrokeCount: any;
  timer: number;
  topSpeedPersonalBest: any;
  totalNumberOfHintedWords: any;
  totalNumberOfLowExposuresSeen: any;
  totalNumberOfMatchedWords: any;
  totalNumberOfMistypedWords: any;
  totalNumberOfNewWordsMet: any;
  totalNumberOfRetainedWords: any;
  totalWordCount: any;
  upcomingPhrases: any;
  updateFlashcardsMetWords: any;
  updateFlashcardsProgress: any;
  updateGlobalLookupDictionary: any;
  updateMarkup: any;
  updatePersonalDictionaries: any;
  updatePreset: (studyType: Study) => void;
  updateRevisionMaterial: any;
  updateTopSpeedPersonalBest: any;
  userSettings: UserSettings;
};

export type FinishedProps = {
  changeShowScoresWhileTyping: (event: any) => void;
  changeShowStrokesAs: (event: any) => void;
  changeShowStrokesAsList: (event: any) => void;
  changeShowStrokesOnMisstroke: (event: any) => void;
  changeSortOrderUserSetting: (event: any) => void;
  changeSpacePlacementUserSetting: (event: any) => void;
  changeStenoLayout: (event: any) => void;
  changeUserSetting: (event: any) => void;
  changeVoiceUserSetting: (voiceName: string, voiceURI: string) => void;
  chooseStudy: () => void;
  currentLessonStrokes: any; // CurrentLessonStrokes;
  disableUserSettings: boolean;
  globalUserSettings: GlobalUserSettings;
  handleBeatsPerMinute: (event: any) => void;
  handleDiagramSize: (event: any) => void;
  handleLimitWordsChange: (event: any) => void;
  handleRepetitionsChange: (event: any) => void;
  handleStartFromWordChange: (event: any) => void;
  handleUpcomingWordsLayout: (event: any) => void;
  toggleHideOtherSettings: () => void;
  lesson: Lesson;
  lessonLength: number;
  lessonTitle: PrettyLessonTitle;
  metadata: any;
  metWords: MetWords;
  path: any;
  restartLesson: any;
  reviseLesson: any;
  revisionMode: any;
  settings: any;
  startFromWordOne: any;
  startTime: any;
  timer: number;
  topSpeedPersonalBest: any;
  totalNumberOfHintedWords: any;
  totalNumberOfLowExposuresSeen: any;
  totalNumberOfMatchedWords: any;
  totalNumberOfMistypedWords: any;
  totalNumberOfNewWordsMet: any;
  totalNumberOfRetainedWords: any;
  totalWordCount: any;
  updatePreset: (studyType: Study) => void;
  updateRevisionMaterial: any;
  updateTopSpeedPersonalBest: any;
  userSettings: UserSettings;
};
