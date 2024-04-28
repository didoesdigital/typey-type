import React from "react";
import SingleLineMaterial from "./Material/SingleLineMaterial";
import MultiLineMaterial from "./Material/MultiLineMaterial";
import OnePhraseMaterial from "./Material/OnePhraseMaterial";
import { useAtomValue } from "jotai";
import { upcomingWordsLayoutState } from "../states/userSettingsState";

type Props = {
  actualText: any;
  completedPhrases: any;
  currentPhrase: string;
  currentPhraseID: number;
  lesson: any;
  settings: any;
  upcomingPhrases: any;
};

const Material = ({
  actualText,
  completedPhrases,
  currentPhrase,
  currentPhraseID,
  lesson,
  settings,
  upcomingPhrases,
}: Props) => {
  const upcomingWordsLayout = useAtomValue(upcomingWordsLayoutState);
  return upcomingWordsLayout === "multiline" ? (
    <MultiLineMaterial
      // @ts-ignore TODO: work out what React.memo(function MultiLineMaterial({… needs here
      actualText={actualText}
      currentPhrase={currentPhrase}
      currentPhraseID={currentPhraseID}
      presentedMaterial={lesson.presentedMaterial}
      settings={settings}
    />
  ) : upcomingWordsLayout === "hidden" ? (
    <OnePhraseMaterial
      actualText={actualText}
      completedPhrases={completedPhrases}
      currentPhrase={currentPhrase}
      settings={settings}
    />
  ) : (
    <SingleLineMaterial
      actualText={actualText}
      completedPhrases={completedPhrases}
      currentPhrase={currentPhrase}
      settings={settings}
      upcomingPhrases={upcomingPhrases}
    />
  );
};

export default Material;
