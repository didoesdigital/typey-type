import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "F",
  "S",
  "C",
  "Z",
  "P",
  "N",
  "R",
  "X",
  "I",
  "U",
  "u",
  "i",
  "e",
  "a",
  "n",
  "p",
  "z",
  "c",
  "s",
  "f",
] as const;

const stenoKeys = [
  "leftCapitalF",
  "leftCapitalS",
  "leftCapitalC",
  "leftCapitalZ",
  "leftCapitalP",
  "leftCapitalN",
  "leftCapitalR",
  "leftCapitalX",
  "leftCapitalI",
  "leftCapitalU",
  "uRightLowercase",
  "iRightLowercase",
  "eRightLowercase",
  "aRightLowercase",
  "nRightLowercase",
  "pRightLowercase",
  "zRightLowercase",
  "cRightLowercase",
  "sRightLowercase",
  "fRightLowercase",
] as const;

function mapBriefToItalianMichelaStenoKeys(brief: Outline) {
  let keys = {
    leftCapitalF: false,
    leftCapitalS: false,
    leftCapitalC: false,
    leftCapitalZ: false,
    leftCapitalP: false,
    leftCapitalN: false,
    leftCapitalR: false,
    leftCapitalX: false,
    leftCapitalI: false,
    leftCapitalU: false,
    uRightLowercase: false,
    iRightLowercase: false,
    eRightLowercase: false,
    aRightLowercase: false,
    nRightLowercase: false,
    pRightLowercase: false,
    zRightLowercase: false,
    cRightLowercase: false,
    sRightLowercase: false,
    fRightLowercase: false,
  };

  let briefLetters = brief.split("");

  for (let i = 0; i < stenoOrder.length; i++) {
    if (briefLetters.length > 0) {
      if (briefLetters[0] === stenoOrder[i]) {
        keys[stenoKeys[i]] = true;
        briefLetters.shift();
      }
    }
  }

  return keys;
}

export default mapBriefToItalianMichelaStenoKeys;
