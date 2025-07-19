import { AppMethods } from "../../states/legacy/AppMethodsContext";

const appMethods: AppMethods = {
  appFetchAndSetupGlobalDict: () => Promise.resolve(true),
  changeShowStrokesInLesson: () => false,
  createCustomLesson: (event) => {
    console.log("create custom lesson");
    return event;
  },
  customiseLesson: () => undefined,
  generateCustomLesson: () => console.log("generate custom lesson"),
  handleLesson: () => undefined,
  restartLesson: () => undefined,
  reviseLesson: () => undefined,
  sayCurrentPhraseAgain: () => undefined,
  setCustomLessonContent: () => undefined,
  setPersonalPreferences: () => [],
  setUpProgressRevisionLesson: () => undefined,
  setupLesson: () => undefined,
  startCustomLesson: () => undefined,
  stopLesson: () => console.log("stop lesson"),
  updateGlobalLookupDictionary: () => undefined,
  updateMarkup: () => undefined,
  updateMetWords: () => undefined,
  updateMultipleMetWords: () => undefined,
  updatePersonalDictionaries: () => undefined,
  updateRevisionMaterial: () => false,
  updateStartingMetWordsAndCounts: () =>
    console.log("update starting met words and counts"),
};

export default appMethods;
