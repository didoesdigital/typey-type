import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "漢",
  "「",
  "4",
  "た",
  "な",
  "3",
  "か",
  "さ",
  "2",
  "い",
  "う",
  "1",
  "お",
  "っ",
  "*",
  "-",
  "4",
  "た",
  "な",
  "3",
  "か",
  "さ",
  "2",
  "い",
  "う",
  "1",
  "お",
  "っ",
  "」",
  "カ",
] as const;

const stenoKeys = [
  "the漢",
  "theLeftKagikakko",
  "theLeft4",
  "theLeftた",
  "theLeftな",
  "theLeft3",
  "theLeftか",
  "theLeftさ",
  "theLeft2",
  "theLeftい",
  "theLeftう",
  "theLeft1",
  "theLeftお",
  "theLeftっ",
  "theStar",
  "dash",
  "theRight4",
  "theRightた",
  "theRightな",
  "theRight3",
  "theRightか",
  "theRightさ",
  "theRight2",
  "theRightい",
  "theRightう",
  "theRight1",
  "theRightお",
  "theRightっ",
  "theRightKagikakko",
  "theカ",
] as const;

function mapBriefToJapaneseStenoKeys(brief: Outline) {
  let keys = {
    the漢: false,
    theLeftKagikakko: false,
    theLeft4: false,
    theLeftた: false,
    theLeftな: false,
    theLeft3: false,
    theLeftか: false,
    theLeftさ: false,
    theLeft2: false,
    theLeftい: false,
    theLeftう: false,
    theLeft1: false,
    theLeftお: false,
    theLeftっ: false,
    theStar: false,
    dash: false,
    theRight4: false,
    theRightた: false,
    theRightな: false,
    theRight3: false,
    theRightか: false,
    theRightさ: false,
    theRight2: false,
    theRightい: false,
    theRightう: false,
    theRight1: false,
    theRightお: false,
    theRightっ: false,
    theRightKagikakko: false,
    theカ: false,
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

export default mapBriefToJapaneseStenoKeys;
