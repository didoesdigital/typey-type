import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

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
