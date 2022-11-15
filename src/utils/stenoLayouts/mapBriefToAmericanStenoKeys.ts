import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "#",
  "1",
  "S",
  "T",
  "2",
  "K",
  "3",
  "P",
  "W",
  "4",
  "H",
  "R",
  "5",
  "A",
  "0",
  "O",
  "*",
  "-",
  "E",
  "U",
  "6",
  "F",
  "R",
  "7",
  "P",
  "B",
  "8",
  "L",
  "G",
  "9",
  "T",
  "S",
  "D",
  "Z",
] as const;
const stenoKeys = [
  "numberBar",
  "leftSUpper",
  "leftSLower",
  "leftT",
  "leftT",
  "leftK",
  "leftP",
  "leftP",
  "leftW",
  "leftH",
  "leftH",
  "leftR",
  "leftA",
  "leftA",
  "leftO",
  "leftO",
  "star",
  "dash",
  "rightE",
  "rightU",
  "rightF",
  "rightF",
  "rightR",
  "rightP",
  "rightP",
  "rightB",
  "rightL",
  "rightL",
  "rightG",
  "rightT",
  "rightT",
  "rightS",
  "rightD",
  "rightZ",
] as const;

function mapBriefToAmericanStenoKeys(brief: Outline) {
  let keys = {
    numberBar: false,
    leftSUpper: false,
    leftSLower: false,
    leftT: false,
    leftK: false,
    leftP: false,
    leftW: false,
    leftH: false,
    leftR: false,
    leftA: false,
    leftO: false,
    star: false,
    dash: false,
    rightE: false,
    rightU: false,
    rightF: false,
    rightR: false,
    rightP: false,
    rightB: false,
    rightL: false,
    rightG: false,
    rightT: false,
    rightS: false,
    rightD: false,
    rightZ: false,
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

  if (brief.match(/[0-9]/)) {
    keys["numberBar"] = true;
  }

  if (keys.leftSLower === true && keys.leftSUpper === false) {
    keys.leftSUpper = true;
  }

  return keys;
}

export default mapBriefToAmericanStenoKeys;
