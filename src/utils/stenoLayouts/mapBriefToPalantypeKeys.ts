import type { Outline } from "../../types";

// palantypeOrder and palantypeKeys should always be updated together
const palantypeOrder = [
  "S",
  "C",
  "P",
  "T",
  "H",
  "+",
  "+",
  "M",
  "F",
  "R",
  "N",
  "L",
  "Y",
  "O",
  "E",
  "A",
  "U",
  "-",
  "I",
  "^",
  "^",
  "N",
  "L",
  "C",
  "M",
  "F",
  "R",
  "P",
  "T",
  "+",
  "S",
  "H",
];

const palantypeKeys = [
  "leftS",
  "leftC",
  "leftP",
  "leftT",
  "leftH",
  "leftPlusOne",
  "leftPlusTwo",
  "leftM",
  "leftF",
  "leftR",
  "leftN",
  "leftL",
  "leftY",
  "leftO",
  "leftE",
  "rightA",
  "rightU",
  "dash",
  "centerI",
  "rightCaretOne",
  "rightCaretTwo",
  "rightN",
  "rightL",
  "rightC",
  "rightM",
  "rightF",
  "rightR",
  "rightP",
  "rightT",
  "rightPlus",
  "rightS",
  "rightH",
];

function mapBriefToPalantypeKeys(brief: Outline) {
  let keys = {
    leftS: false,
    leftC: false,
    leftP: false,
    leftT: false,
    leftH: false,
    leftPlusOne: false,
    leftPlusTwo: false,
    leftM: false,
    leftF: false,
    leftR: false,
    leftN: false,
    leftL: false,
    leftY: false,
    leftO: false,
    leftE: false,
    rightA: false,
    rightU: false,
    dash: false,
    centerI: false,
    rightCaretOne: false,
    rightCaretTwo: false,
    rightN: false,
    rightL: false,
    rightC: false,
    rightM: false,
    rightF: false,
    rightR: false,
    rightP: false,
    rightT: false,
    rightPlus: false,
    rightS: false,
    rightH: false,
  };

  let briefLetters = brief.split("");

  for (let i = 0; i < palantypeOrder.length; i++) {
    if (briefLetters.length > 0) {
      if (briefLetters[0] === palantypeOrder[i]) {
        // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{…}'
        keys[palantypeKeys[i]] = true;
        briefLetters.shift();
      }
    }
  }

  if (keys.leftPlusOne === true && keys.leftPlusTwo === false) {
    keys.leftPlusTwo = true;
  }

  if (keys.rightCaretOne === true && keys.rightCaretTwo === false) {
    keys.rightCaretTwo = true;
  }

  return keys;
}

export default mapBriefToPalantypeKeys;
