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
  changeShowStrokesAs: any;
  changeShowStrokesAsList: any;
  changeShowStrokesOnMisstroke: any;
  changeSortOrderUserSetting: any;
  changeSpacePlacementUserSetting: any;
  changeStenoLayout: any;
  changeUserSetting: any;
  chooseStudy: any;
  currentLessonStrokes: any;
  disableUserSettings: any;
  globalUserSettings: any;
  handleBeatsPerMinute: any;
  handleDiagramSize: any;
  handleLimitWordsChange: any;
  handleRepetitionsChange: any;
  handleStartFromWordChange: any;
  handleUpcomingWordsLayout: any;
  hideOtherSettings: any;
  lessonLength: any;
  lessonTitle: any;
  location: any;
  metadata: any;
  metWords: any;
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
  updateRevisionMaterial: any;
  updateTopSpeedPersonalBest: any;
  userSettings: any;
};
