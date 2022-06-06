import React from "react";
import SingleLineMaterial from "./Material/SingleLineMaterial";
import MultiLineMaterial from "./Material/MultiLineMaterial";

export default function Material(props) {
  return props.userSettings.upcomingWordsLayout === "multiline" ? (
    <MultiLineMaterial {...props} />
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
