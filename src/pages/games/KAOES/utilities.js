import { shuffle } from "d3-array";

const disambiguatedStenoKeys = [
  "#",
  "S",
  "T",
  "K",
  "P",
  "W",
  "H",
  "R",
  "A",
  "O",
  "*",
  "E",
  "U",
  "-F",
  "-R",
  "-P",
  "-B",
  "-L",
  "-G",
  "-T",
  "-S",
  "-D",
  "-Z",
];

export const choosePuzzleKey = (previousKey) =>
  shuffle(disambiguatedStenoKeys.filter((key) => key !== previousKey))[0];
