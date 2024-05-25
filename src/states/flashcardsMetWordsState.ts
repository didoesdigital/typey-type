import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

type FlashcardsMetWords = {
  [word: string]: {
    phrase: string;
    stroke: string;
    rung: number;
  };
};

const _flashcardsMetWordsState = atomWithStorage<FlashcardsMetWords>("flashcardsMetWords", {
    "the": {
      phrase: "the",
      stroke: "-T",
      rung: 0,
    },
  });
export const flashcardsMetWordsState = atom(
  (get) => get(_flashcardsMetWordsState),
  (get, set, word: string, feedback: string, stroke: string, rung: number = 0) => {
  let localStroke = stroke || "XXX";
  let flashcardsMetWords = {...get(_flashcardsMetWordsState)};
  if (flashcardsMetWords[word]) {
    if (flashcardsMetWords[word].rung) {
      rung = flashcardsMetWords[word].rung;
    }
  }

  if (feedback === "easy") {
    rung = rung + 1;
    // debugger
  } else if (feedback === "hard") {
    rung = rung - 1;
    // debugger
    if (rung < 0 ) { rung = 0;}
  }

  flashcardsMetWords[word] = {
    phrase: word,
    stroke: localStroke,
    rung: rung
  }

  set(_flashcardsMetWordsState, flashcardsMetWords);
});
