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
  Outline,
  MaterialText,
  ActualTypedText,
} from "../../types";
import type { MainLessonViewProps } from "pages/lessons/MainLessonView";

export type LessonData = {
  version: number;
  lessonStrokes: CurrentLessonStrokes[];
  startTime: number; // We can assume it's a number by the time it's recorded here
  wpm: number;
};

export type DataPoint = {
  attemptPeak: boolean;
  elapsedTime: number;
  hint: Outline;
  hintWasShown: boolean;
  markedCorrect: boolean;
  material: MaterialText;
  materialIndex?: number;
  typedText: ActualTypedText;
  wordsPerMinute: number;
};

export type TransformedData = {
  averageWPM: number;
  version: number;
  dataPoints?: DataPoint[];
} | null;

export type LessonProps = Pick<
  MainLessonViewProps,
  | "totalNumberOfHintedWords"
  | "totalNumberOfLowExposuresSeen"
  | "totalNumberOfMatchedWords"
  | "totalNumberOfMistypedWords"
  | "totalNumberOfNewWordsMet"
  | "totalNumberOfRetainedWords"
  | "totalWordCount"
  | "actualText"
  | "completedPhrases"
  | "currentLessonStrokes"
  | "currentPhrase"
  | "currentPhraseID"
  | "currentStroke"
  | "disableUserSettings"
  | "globalLookupDictionary"
  | "globalLookupDictionaryLoaded"
  | "lesson"
  | "lessonLength"
  | "lessonSubTitle"
  | "lessonTitle"
  | "previousCompletedPhraseAsTyped"
  | "repetitionsRemaining"
  | "settings"
  | "showStrokesInLesson"
  | "targetStrokeCount"
  | "timer"
  | "focusTriggerInt"
> & {
  lessonNotFound: boolean; // To show <LessonNotFound />
  match: any;
  metWords: MetWords;
  personalDictionaries?: ImportedPersonalDictionaries;
  startTime: number | null;
  upcomingPhrases: MainLessonViewProps["upcomingPhrases"] | any;
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
  updateRevisionMaterial: (event: React.ChangeEvent<HTMLInputElement>) => boolean;
};
