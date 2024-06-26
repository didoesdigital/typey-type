import type {
  // CurrentLessonStrokes,
  GlobalUserSettings,
  Lesson,
  MetWords,
  PrettyLessonTitle,
  Study,
  CurrentLessonStrokes,
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
  completedPhrases: any;
  currentLessonStrokes: CurrentLessonStrokes[];
  currentPhrase: string;
  currentPhraseID: number;
  currentStroke: string;
  disableUserSettings: boolean;
  flashcardsMetWords: any;
  flashcardsProgress: any;
  fullscreen: any;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: any;
  globalUserSettings: GlobalUserSettings;
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
  revisionMode: any;
  settings: any;
  showStrokesInLesson: any;
  startTime: any;
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
};

export type FinishedProps = {
  chooseStudy: () => void;
  currentLessonStrokes: any; // CurrentLessonStrokes;
  disableUserSettings: boolean;
  globalUserSettings: GlobalUserSettings;
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
};
