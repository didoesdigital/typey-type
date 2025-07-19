import React from "react";
import SingleLineMaterial from "./Material/SingleLineMaterial";
import MultiLineMaterial from "./Material/MultiLineMaterial";
import OnePhraseMaterial from "./Material/OnePhraseMaterial";
import { useAtomValue } from "jotai";
import { upcomingWordsLayoutState } from "../states/userSettingsState";
import type {
  ActualTypedText,
  Lesson,
  LessonSettings,
  MaterialText,
} from "types";

export type MaterialProps = {
  actualText: ActualTypedText;
  completedPhrases: MaterialText[];
  currentPhrase: MaterialText;
  currentPhraseID: number;
  lesson: Lesson;
  settings: LessonSettings;
  upcomingPhrases: MaterialText[];
};

const Material = ({
  actualText,
  completedPhrases,
  currentPhrase,
  currentPhraseID,
  lesson,
  settings,
  upcomingPhrases,
}: MaterialProps) => {
  const upcomingWordsLayout = useAtomValue(upcomingWordsLayoutState);
  return upcomingWordsLayout === "multiline" ? (
    <MultiLineMaterial
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
