import React from "react";
import SingleLineMaterial from "./Material/SingleLineMaterial";
import MultiLineMaterial from "./Material/MultiLineMaterial";
import OnePhraseMaterial from "./Material/OnePhraseMaterial";

export default function Material(props) {
  return props.userSettings.upcomingWordsLayout === "multiline" ? (
    <MultiLineMaterial
      actualText={props.actualText}
      currentPhrase={props.currentPhrase}
      currentPhraseID={props.currentPhraseID}
      presentedMaterial={props.lesson.presentedMaterial}
      settings={props.settings}
      userSettings={props.userSettings}
    />
  ) : props.userSettings.upcomingWordsLayout === "hidden" ? (
    <OnePhraseMaterial
      actualText={props.actualText}
      completedPhrases={props.completedPhrases}
      currentPhrase={props.currentPhrase}
      settings={props.settings}
      upcomingPhrases={props.upcomingPhrases}
      userSettings={props.userSettings}
    />
  ) : (
    <SingleLineMaterial
      actualText={props.actualText}
      completedPhrases={props.completedPhrases}
      currentPhrase={props.currentPhrase}
      settings={props.settings}
      upcomingPhrases={props.upcomingPhrases}
      userSettings={props.userSettings}
    />
  );
}
