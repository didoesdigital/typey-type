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

// @ts-expect-error TS(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
export const prettyKey = (key) =>
  unambiguousRightHandKeysRegExp.test(key) ? key.replace("-", "") : key;

// @ts-expect-error TS(7006) FIXME: Parameter 'previousKey' implicitly has an 'any' ty... Remove this comment to see the full error message
export const choosePuzzleKey = (previousKey) =>
  shuffle(disambiguatedStenoKeys.filter((key) => key !== previousKey))[0];
