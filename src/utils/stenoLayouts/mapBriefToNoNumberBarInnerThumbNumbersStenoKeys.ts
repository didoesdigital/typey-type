import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
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
  "numberBarKey",
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
  "starUpperKey",
  "starLowerKey",
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

function mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief: Outline) {
  let keys = {
    numberBarKey: false,
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
    starUpperKey: false,
    starLowerKey: false,
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
    keys["numberBarKey"] = true;
  }

  if (keys.leftSUpperKey === true && keys.leftSLowerKey === false) {
    keys.leftSLowerKey = true;
  }

  if (keys.starUpperKey === true && keys.starLowerKey === false) {
    keys.starLowerKey = true;
    keys.starUpperKey = true;
  }

  return keys;
}

export default mapBriefToNoNumberBarInnerThumbNumbersStenoKeys;
