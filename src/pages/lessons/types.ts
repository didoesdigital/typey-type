import type { LessonCanvasFooterProps } from "pages/lessons/components/LessonCanvasFooter";
import type {
  // CurrentLessonStrokes,
  Lesson,
  MetWords,
  PrettyLessonTitle,
  Study,
  CurrentLessonStrokes,
  LookupDictWithNamespacedDictsAndConfig,
  ImportedPersonalDictionaries,
} from "../../types";

export type LessonData = {
  version: number;
  lessonStrokes: any[];
  startTime: number; // We can assume it's a number by the time it's recorded here
  wpm: number;
};

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
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: any;
  lesson: Lesson;
  lessonLength: number;
  lessonNotFound: any;
  lessonSubTitle: any;
  lessonTitle: PrettyLessonTitle;
  location: any;
  match: any;
  metWords: MetWords;
  personalDictionaries?: ImportedPersonalDictionaries;
  previousCompletedPhraseAsTyped: string;
  repetitionsRemaining: number;
  settings: any;
  showStrokesInLesson: any;
  startTime: number | null;
  targetStrokeCount: any;
  timer: number;
  totalNumberOfHintedWords: any;
  totalNumberOfLowExposuresSeen: any;
  totalNumberOfMatchedWords: any;
  totalNumberOfMistypedWords: any;
  totalNumberOfNewWordsMet: any;
  totalNumberOfRetainedWords: any;
  totalWordCount: any;
  upcomingPhrases: any;
  focusTriggerInt: number;
};

export type FinishedProps = Pick<
  LessonProps,
  | "currentLessonStrokes"
  | "disableUserSettings"
  | "lesson"
  | "lessonLength"
  | "lessonTitle"
  | "metWords"
  | "settings"
  | "startTime"
  | "timer"
  | "totalNumberOfHintedWords"
  | "totalNumberOfLowExposuresSeen"
  | "totalNumberOfMatchedWords"
  | "totalNumberOfMistypedWords"
  | "totalNumberOfNewWordsMet"
  | "totalNumberOfRetainedWords"
  | "totalWordCount"
> & {
  chooseStudy: LessonCanvasFooterProps["chooseStudy"];
  toggleHideOtherSettings: () => void;
  metadata: any;
  path: any;
  restartLesson: any;
  reviseLesson: any;
  revisionMode: any;
  updatePreset: (studyType: Study) => void;
  updateRevisionMaterial: any;
};
