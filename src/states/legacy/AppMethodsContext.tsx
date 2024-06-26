import React, { ComponentType, createContext, useContext } from "react";
import "react-tippy/dist/tippy.css";
import setCustomLessonContent from "../../pages/lessons/utilities/setCustomLessonContent";
import customiseLesson from "../../pages/lessons/utilities/customiseLesson";
import generateCustomLesson from "../../pages/lessons/custom/generator/utilities/generateCustomLesson";
import updateMultipleMetWords from "../../pages/games/KPOES/updateMultipleMetWords";
import {
  changeFlashcardCourseLevel,
  changeFullscreen
} from "../../pages/lessons/components/UserSettings/updateFlashcardSetting";
import {
  changeShowStrokesInLesson,
  updateRevisionMaterial
} from "../../pages/lessons/components/UserSettings/updateLessonSetting";
import {
  changeInputForKAOES,
  changeWriterInput, dismissBackupBanner, toggleExperiment
} from "../../pages/lessons/components/UserSettings/updateGlobalUserSetting";
import fetchAndSetupGlobalDict from "../../utils/app/fetchAndSetupGlobalDict";
import App from "../../App";

export type AppMethods = {
  appFetchAndSetupGlobalDict: typeof fetchAndSetupGlobalDict,
  setCustomLessonContent: typeof setCustomLessonContent,
  customiseLesson: typeof customiseLesson,
  generateCustomLesson: typeof generateCustomLesson,
  updateMultipleMetWords: typeof updateMultipleMetWords,
  changeFlashcardCourseLevel: typeof changeFlashcardCourseLevel,
  changeFullscreen: typeof changeFullscreen,
  changeShowStrokesInLesson: typeof changeShowStrokesInLesson,
  changeInputForKAOES: typeof changeInputForKAOES,
  changeWriterInput: typeof changeWriterInput,
  createCustomLesson: typeof App.prototype.createCustomLesson,
  handleLesson: typeof App.prototype.handleLesson,
  handleStopLesson: typeof App.prototype.handleStopLesson,
  restartLesson: typeof App.prototype.restartLesson,
  reviseLesson: typeof App.prototype.reviseLesson,
  sayCurrentPhraseAgain: typeof App.prototype.sayCurrentPhraseAgain,
  setDictionaryIndex: typeof App.prototype.setDictionaryIndex,
  setPersonalPreferences: typeof App.prototype.setPersonalPreferences,
  setUpProgressRevisionLesson: typeof App.prototype.setUpProgressRevisionLesson,
  setupLesson: typeof App.prototype.setupLesson,
  startCustomLesson: typeof App.prototype.startCustomLesson,
  startFromWordOne: typeof App.prototype.startFromWordOne,
  stopLesson: typeof App.prototype.stopLesson,
  toggleExperiment: typeof toggleExperiment,
  dismissBackupBanner: typeof dismissBackupBanner,
  updateFlashcardsMetWords: typeof App.prototype.updateFlashcardsMetWords,
  updateFlashcardsProgress: typeof App.prototype.updateFlashcardsProgress,
  updateFlashcardsRecommendation: typeof App.prototype.updateFlashcardsRecommendation,
  updateGlobalLookupDictionary: typeof App.prototype.updateGlobalLookupDictionary,
  updateMarkup: typeof App.prototype.updateMarkup,
  updateMetWords: typeof App.prototype.updateMetWords,
  updatePersonalDictionaries: typeof App.prototype.updatePersonalDictionaries,
  updateRecommendationHistory: typeof App.prototype.updateRecommendationHistory,
  updateRevisionMaterial: typeof updateRevisionMaterial,
  updateStartingMetWordsAndCounts: typeof App.prototype.updateStartingMetWordsAndCounts,
  updateTopSpeedPersonalBest: typeof App.prototype.updateTopSpeedPersonalBest,
  updateUserGoals: typeof App.prototype.updateUserGoals,
  updateUserGoalsUnveiled: typeof App.prototype.updateUserGoalsUnveiled,
}

const AppMethodsContext = createContext<AppMethods>(null!);

export default AppMethodsContext;

export const useAppMethods = () => {
  return useContext(AppMethodsContext);
}

// For class components
export type WithAppMethods<P> = {
  appMethods: AppMethods;
} & P;
export const withAppMethods = <P, >(Component: ComponentType<WithAppMethods<P>>) => (props: P) => {
  return (
    <AppMethodsContext.Consumer>
      {(appMethods) => <Component {...{ ...props, appMethods }} />}
    </AppMethodsContext.Consumer>
  );
};
