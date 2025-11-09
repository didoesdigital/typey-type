import { useChangeFullscreen } from "pages/lessons/components/UserSettings/updateFlashcardSetting";
import {
  Flashcards,
  type FlashcardsProps,
} from "pages/lessons/flashcards/Flashcards";
import { useUpdateFlashcardsProgress } from "states/flashcardsProgressState";
import { useAppMethods } from "states/legacy/AppMethodsContext";

export function FlashcardsWrapper(props: FlashcardsProps) {
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
