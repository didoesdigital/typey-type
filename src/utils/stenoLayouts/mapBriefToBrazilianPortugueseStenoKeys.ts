import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "#",
  "1",
  "S",
  "K",
  "2",
  "T",
  "3",
  "F",
  "P",
  "4",
  "L",
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
  "R",
  "W",
  "7",
  "B",
  "P",
  "8",
  "G",
  "H",
  "9",
  "T",
  "S",
  "D",
  "Z",
] as const;

const stenoKeys = [
  "numberBarKey",
  "leftSKey",
  "leftSKey",
  "leftKKey",
  "leftKKey",
  "leftTKey",
  "leftFKey",
  "leftFKey",
  "leftPKey",
  "leftLKey",
  "leftLKey",
  "leftRKey",
  "leftAKey",
  "leftAKey",
  "leftOKey",
  "leftOKey",
  "starKey",
  "dashKey",
  "rightEKey",
  "rightUKey",
  "rightRKey",
  "rightRKey",
  "rightWKey",
  "rightBKey",
  "rightBKey",
  "rightPKey",
  "rightGKey",
  "rightGKey",
  "rightHKey",
  "rightTKey",
  "rightTKey",
  "rightSKey",
  "rightDKey",
  "rightZKey",
] as const;

function mapBriefToBrazilianPortugueseStenoKeys(brief: Outline) {
  let keys = {
    numberBarKey: false,
    leftSKey: false,
    leftKKey: false,
    leftTKey: false,
    leftFKey: false,
    leftPKey: false,
    leftLKey: false,
    leftRKey: false,
    leftAKey: false,
    leftOKey: false,
    starKey: false,
    dashKey: false,
    rightEKey: false,
    rightUKey: false,
    rightRKey: false,
    rightWKey: false,
    rightBKey: false,
    rightPKey: false,
    rightGKey: false,
    rightHKey: false,
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

  return keys;
}

export default mapBriefToBrazilianPortugueseStenoKeys;
