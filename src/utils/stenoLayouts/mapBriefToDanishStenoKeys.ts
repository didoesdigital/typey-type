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
  "V",
  "4",
  "H",
  "R",
  "5",
  "A",
  "0",
  "O",
  "*",
  "-",
  "Æ",
  "Å",
  "6",
  "F",
  "R",
  "7",
  "P",
  "E",
  "8",
  "L",
  "K",
  "9",
  "T",
  "S",
  "D",
  "D",
  "N",
] as const;
const stenoKeys = [
  "numberBar",
  "leftN",
  "leftSLower",
  "leftT",
  "leftT",
  "leftK",
  "leftP",
  "leftP",
  "leftV",
  "leftH",
  "leftH",
  "leftR",
  "leftA",
  "leftA",
  "leftO",
  "leftO",
  "star",
  "dash",
  "rightÆ",
  "rightÅ",
  "rightF",
  "rightF",
  "rightR",
  "rightP",
  "rightP",
  "rightE",
  "rightL",
  "rightL",
  "rightK",
  "rightT",
  "rightT",
  "rightS",
  "rightDUpper",
  "rightDLower",
  "leftN",
] as const;

function mapBriefToDanishStenoKeys(brief: Outline) {
  let keys = {
    numberBar: false,
    leftN: false,
    leftSLower: false,
    leftT: false,
    leftK: false,
    leftP: false,
    leftV: false,
    leftH: false,
    leftR: false,
    leftA: false,
    leftO: false,
    star: false,
    dash: false,
    rightÆ: false,
    rightÅ: false,
    rightF: false,
    rightR: false,
    rightP: false,
    rightE: false,
    rightL: false,
    rightK: false,
    rightT: false,
    rightS: false,
    rightDUpper: false,
    rightDLower: false,
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

  if (keys.rightDUpper === true && keys.rightDLower === false) {
    keys.rightDLower = true;
  }

  return keys;
}

export default mapBriefToDanishStenoKeys;
