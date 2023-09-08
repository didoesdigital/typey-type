import type {
  // CurrentLessonStrokes,
  GlobalUserSettings,
  Lesson,
  MetWords,
  PrettyLessonTitle,
  UserSettings,
  Study,
} from "../../types";

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

export type FinishedProps = {
  changeShowScoresWhileTyping: (event: any) => void;
  changeShowStrokesAs: (event: any) => void;
  changeShowStrokesAsList: (event: any) => void;
  changeShowStrokesOnMisstroke: (event: any) => void;
  changeSortOrderUserSetting: (event: any) => void;
  changeSpacePlacementUserSetting: (event: any) => void;
  changeStenoLayout: (event: any) => void;
  changeUserSetting: (event: any) => void;
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
  hideOtherSettings: boolean;
  lesson: Lesson;
  lessonLength: number;
  lessonTitle: PrettyLessonTitle;
  metadata: any;
  metWords: MetWords;
  path: any;
  restartLesson: any;
  reviseLesson: any;
  revisionMode: any;
  setAnnouncementMessage: any;
  settings: any;
  startFromWordOne: any;
  startTime: any;
  timer: any;
  toggleHideOtherSettings: any;
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
