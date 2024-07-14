import GoogleAnalytics from "react-ga4";
import { useSetAtom } from "jotai";
import { flashcardsCourseLevelState } from "../../../../states/globalUserSettingsState";
import { fullscreenState } from "../../../../states/flashcardsProgressState";

// TODO: move to globalUserSettingsState
export function useChangeFlashcardCourseLevel() {
  const setState = useSetAtom(flashcardsCourseLevelState);
  return (event) => {
    const value = event.target.value;
    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Flashcards",
      action: "Change course level",
      label: labelString,
    });
  }
}

export function useChangeFullscreen() {
  const setState = useSetAtom(fullscreenState);

  return (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setState(value);
  }
}
