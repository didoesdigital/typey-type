import { atomWithLazy, atomWithStorage } from "jotai/utils";
import { atom, useAtom, useAtomValue } from "jotai";
import { getFlashcardsNextLesson, getFlashcardsRecommendedCourses } from "../utils/flashcardsRecommendations";
import { globalUserSettingsState } from "./globalUserSettingsState";

type FlashcardsProgressState = {
  [lessonpath: string]: {
    lastSeen: number;
  };
};

export const flashcardsProgressState = atomWithStorage<FlashcardsProgressState>("flashcardsProgress", {});

export const useUpdateFlashcardsProgress = () => {
  const [state, setState] = useAtom(flashcardsProgressState);

  return (lessonpath: string) => {
    let flashcardsProgress = { ...state };

    flashcardsProgress[lessonpath] = {
      lastSeen: Date.now()
    };
    setState(flashcardsProgress);

    return flashcardsProgress;
  }
};

const flashcardsRecommendedCoursesState = atomWithLazy(getFlashcardsRecommendedCourses)
export const flashcardsRecommendationState = atom({
  flashcardsNextLesson: {
    lastSeen: Date.now(), // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
    linkTitle: "Loading…",
    linkText: "Study",
    link: "/lessons/drills/prefixes/flashcards"// + "?recommended=true&" + PARAMS.practiceParams
  },
  flashcardsCourseIndex: 0,
})

export function useUpdateFlashcardsRecommendation() {
  const flashcardsRecommendedCourses = useAtomValue(flashcardsRecommendedCoursesState);
  const flashcardsProgress = useAtomValue(flashcardsProgressState);
  const { flashcardsCourseLevel } = useAtomValue(globalUserSettingsState);
  const [state, setState] = useAtom(flashcardsRecommendationState);

  return () => {
    const [nextFlashcardsLesson, currentFlashcardsCourseIndex] = getFlashcardsNextLesson(flashcardsRecommendedCourses, flashcardsProgress, flashcardsCourseLevel, state.flashcardsCourseIndex);

    setState({
      flashcardsCourseIndex: currentFlashcardsCourseIndex,
      flashcardsNextLesson: nextFlashcardsLesson
    });
  };
}

export const fullscreenState = atom(false);
