import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "#",
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

  return keys;
}

export default mapBriefToNoNumberBarOuterThumbNumbersStenoKeys;
