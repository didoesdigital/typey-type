import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "#",
  "#",
  "1",
  "S",
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
  "*",
  "*",
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
  "leftNumberBarKey",
  "rightNumberBarKey",
  "leftSUpperKey",
  "leftSUpperKey",
  "leftSLowerKey",
  "leftTKey",
  "leftTKey",
  "leftKKey",
  "leftPKey",
  "leftPKey",
  "leftWKey",
  "leftHKey",
  "leftHKey",
  "leftRKey",
  "leftAKey",
  "leftAKey",
  "leftOKey",
  "leftOKey",
  "leftStarUpperKey",
  "leftStarLowerKey",
  "rightStarUpperKey",
  "rightStarLowerKey",
  "dashKey",
  "rightEKey",
  "rightUKey",
  "rightFKey",
  "rightFKey",
  "rightRKey",
  "rightPKey",
  "rightPKey",
  "rightBKey",
  "rightLKey",
  "rightLKey",
  "rightGKey",
  "rightTKey",
  "rightTKey",
  "rightSKey",
  "rightDKey",
  "rightZKey",
] as const;

function mapBriefToNoNumberBarOuterThumbNumbersStenoKeys(brief: Outline) {
  let keys = {
    leftNumberBarKey: false,
    rightNumberBarKey: false,
    leftSUpperKey: false,
    leftSLowerKey: false,
    leftTKey: false,
    leftKKey: false,
    leftPKey: false,
    leftWKey: false,
    leftHKey: false,
    leftRKey: false,
    leftAKey: false,
    leftOKey: false,
    leftStarUpperKey: false,
    leftStarLowerKey: false,
    rightStarUpperKey: false,
    rightStarLowerKey: false,
    dashKey: false,
    rightEKey: false,
    rightUKey: false,
    rightFKey: false,
    rightRKey: false,
    rightPKey: false,
    rightBKey: false,
    rightLKey: false,
    rightGKey: false,
    rightTKey: false,
    rightSKey: false,
    rightDKey: false,
    rightZKey: false,
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
    keys["leftNumberBarKey"] = true;
    keys["rightNumberBarKey"] = true;
  }

  // e.g. '05' is #AOEU in standard number-bar steno, but #AOE in inner-thumbers and #AOU in outer-thumbers
  if (brief === "50EU" || brief === "#AOU" || brief === "#AOEU") {
    keys["leftNumberBarKey"] = false;
    keys["rightNumberBarKey"] = true;
  }

  // #A / 5
  if (
    brief.includes("#") &&
    brief.includes("A") &&
    !brief.includes("O") &&
    !brief.includes("E") &&
    !brief.includes("U")
  ) {
    keys["leftNumberBarKey"] = false;
    keys["rightNumberBarKey"] = true;
  }

  // 23EU
  if (brief.match(/[0-9]/) && !brief.includes("0")) {
    keys["leftNumberBarKey"] = true;
    keys["rightNumberBarKey"] = false;
  }

  // 40
  if (brief.match(/[0-9]/) && !brief.includes("E")) {
    keys["leftNumberBarKey"] = false;
    keys["rightNumberBarKey"] = true;
  }

  // 4 / #H
  if (
    (brief.match(/[1-4]/) && !brief.includes("O") && !brief.includes("E")) ||
    (brief.includes("#") &&
      brief.match(/[STPH]/) &&
      !brief.includes("O") &&
      !brief.includes("E"))
  ) {
    keys["leftNumberBarKey"] = false;
    keys["rightNumberBarKey"] = true;
  }

  // 7 / #-P
  if (
    (brief.match(/[6-9]/) && !brief.includes("O") && !brief.includes("E")) ||
    (brief.includes("#") &&
      !brief.includes("FPLT") &&
      !brief.includes("O") &&
      !brief.includes("E"))
  ) {
    keys["leftNumberBarKey"] = true;
    keys["rightNumberBarKey"] = false;
  }

  // 0
  if (brief === "0" || brief === "#O") {
    keys["leftNumberBarKey"] = false;
    keys["rightNumberBarKey"] = true;
  }

  // Exceptions: https://www.paulfioravanti.com/blog/steno-numbers-georgi/
  if (
    brief.match(/^(60|70|80|90)$/) ||
    brief.match(/^(0EU6|0EU7|0EU8|0EU9)$/)
  ) {
    keys["leftNumberBarKey"] = true;
    keys["rightNumberBarKey"] = false;
  }

  if (keys.leftSUpperKey === true && keys.leftSLowerKey === false) {
    keys.leftSLowerKey = true;
  }

  if (
    keys.leftStarUpperKey === true &&
    keys.leftStarLowerKey === false &&
    keys.rightStarUpperKey === false &&
    keys.rightStarLowerKey === false
  ) {
    keys.leftStarLowerKey = true;
    keys.rightStarUpperKey = true;
    keys.rightStarLowerKey = true;
  }

  return keys;
}

export default mapBriefToNoNumberBarOuterThumbNumbersStenoKeys;
