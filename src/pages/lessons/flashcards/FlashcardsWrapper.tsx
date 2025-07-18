import { useChangeFullscreen } from "pages/lessons/components/UserSettings/updateFlashcardSetting";
import { Flashcards } from "pages/lessons/flashcards/Flashcards";
import React from "react";
import { useUpdateFlashcardsProgress } from "states/flashcardsProgressState";
import { useAppMethods } from "states/legacy/AppMethodsContext";
import type { PersonalDictionaryNameAndContents } from "types";

type Props = typeof Flashcards & {
  personalDictionaries: PersonalDictionaryNameAndContents;
};

export function FlashcardsWrapper(props: Props) {
  const { appFetchAndSetupGlobalDict } = useAppMethods();
  const updateFlashcardsProgress = useUpdateFlashcardsProgress();
  const changeFullscreen = useChangeFullscreen();

  return (
    <Flashcards
      {...props}
      changeFullscreen={changeFullscreen}
      fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
      updateFlashcardsProgress={updateFlashcardsProgress}
      personalDictionaries={props.personalDictionaries}
    />
  );
}
