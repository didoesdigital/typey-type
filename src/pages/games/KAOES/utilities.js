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

const unambiguousRightHandKeysRegExp = new RegExp(/^-[FBLGDZ]$/);

export const prettyKey = (key) =>
  unambiguousRightHandKeysRegExp.test(key) ? key.replace("-", "") : key;

export const choosePuzzleKey = (previousKey) =>
  shuffle(disambiguatedStenoKeys.filter((key) => key !== previousKey))[0];
