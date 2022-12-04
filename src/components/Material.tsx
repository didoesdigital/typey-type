import React from "react";
import SingleLineMaterial from "./Material/SingleLineMaterial";
import MultiLineMaterial from "./Material/MultiLineMaterial";
import OnePhraseMaterial from "./Material/OnePhraseMaterial";

type Props = {
  actualText: any;
  completedPhrases: any;
  currentPhrase: any;
  currentPhraseID: any;
  lesson: any;
  settings: any;
  upcomingPhrases: any;
  userSettings: any;
};

const Material = ({
  actualText,
  completedPhrases,
  currentPhrase,
  currentPhraseID,
  lesson,
  settings,
  upcomingPhrases,
  userSettings,
}: Props) => {
  return userSettings.upcomingWordsLayout === "multiline" ? (
    <MultiLineMaterial
      // @ts-ignore TODO: work out what React.memo(function MultiLineMaterial({… needs here
      actualText={actualText}
      currentPhrase={currentPhrase}
      currentPhraseID={currentPhraseID}
      presentedMaterial={lesson.presentedMaterial}
      settings={settings}
      userSettings={userSettings}
    />
  ) : userSettings.upcomingWordsLayout === "hidden" ? (
    <OnePhraseMaterial
      actualText={actualText}
      completedPhrases={completedPhrases}
      currentPhrase={currentPhrase}
      settings={settings}
      upcomingPhrases={upcomingPhrases}
      userSettings={userSettings}
    />
  ) : (
    <SingleLineMaterial
      actualText={actualText}
      completedPhrases={completedPhrases}
      currentPhrase={currentPhrase}
      settings={settings}
      upcomingPhrases={upcomingPhrases}
      userSettings={userSettings}
    />
  );
};

export default Material;
