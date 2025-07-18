import type { LessonCanvasFooterProps } from "pages/lessons/components/LessonCanvasFooter";
import type {
  // CurrentLessonStrokes,
  MetWords,
  Study,
  CurrentLessonStrokes,
  ImportedPersonalDictionaries,
  Outline,
  MaterialText,
  ActualTypedText,
  RevisionMaterial,
  LessonIndexEntry,
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
  dataPoints: DataPoint[];
};

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
  metWords: MetWords; // For Finished props
  personalDictionaries?: ImportedPersonalDictionaries; // For Flashcards props
  startTime: number | null;
  upcomingPhrases: MainLessonViewProps["upcomingPhrases"] | any; // Should be picked above but not ready to pass correct type down yet
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
  metadata: LessonIndexEntry;
  path: any;
  restartLesson: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  reviseLesson: (
    event: React.MouseEvent<HTMLAnchorElement>,
    newRevisionMaterial: RevisionMaterial
  ) => void;
  revisionMode: boolean;
  updatePreset: (studyType: Study) => void;
  updateRevisionMaterial: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => boolean;
};
