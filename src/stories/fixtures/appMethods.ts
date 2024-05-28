import { AppMethods } from "../../states/legacy/AppMethodsContext";

const appMethods: AppMethods = {
  appFetchAndSetupGlobalDict: () => Promise.resolve(true),
  changeShowStrokesInLesson: () => undefined,
  createCustomLesson: () => console.log("create custom lesson"),
  customiseLesson: () => undefined,
  generateCustomLesson: () => console.log("generate custom lesson"),
  handleLesson: () => undefined,
  handleStopLesson: () => undefined,
  restartLesson: () => undefined,
  reviseLesson: () => undefined,
  sayCurrentPhraseAgain: () => undefined,
  setCustomLessonContent: () => undefined,
  setPersonalPreferences: () => [],
  setUpProgressRevisionLesson: () => undefined,
  setupLesson: () => undefined,
  startCustomLesson: () => undefined,
  startFromWordOne: () => undefined,
  stopLesson: () => console.log("stop lesson"),
  updateGlobalLookupDictionary: () => undefined,
  updateMarkup: () => undefined,
  updateMetWords: () => undefined,
  updateMultipleMetWords: () => undefined,
  updatePersonalDictionaries: () => undefined,
  updateRecommendationHistory: () => console.log("update recommendation history"),
  updateRevisionMaterial: () => undefined,
  updateStartingMetWordsAndCounts: () => console.log("update starting met words and counts"),
  updateTopSpeedPersonalBest: () => undefined,
  updateUserGoalsUnveiled: () => undefined
}

export default appMethods;
