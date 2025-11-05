import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
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
  "-",
  "E",
  "U",
  "F",
  "R",
  "P",
  "B",
  "L",
  "G",
  "T",
  "S",
  "D",
  "Z",
] as const;

const stenoKeys = [
  "numberBarKey",
  "leftSKey",
  "leftTKey",
  "leftKKey",
  "leftPKey",
  "leftWKey",
  "leftHKey",
  "leftRKey",
  "leftAKey",
  "leftOKey",
  "starKey",
  "dashKey",
  "rightEKey",
  "rightUKey",
  "rightFKey",
  "rightRKey",
  "rightPKey",
  "rightBKey",
  "rightLKey",
  "rightGKey",
  "rightTKey",
  "rightSKey",
  "rightDKey",
  "rightZKey",
] as const;

function mapBriefToLapwingStenoKeys(brief: Outline) {
  const keys = {
    numberBarKey: false,
    leftSKey: false,
    leftTKey: false,
    leftKKey: false,
    leftPKey: false,
    leftWKey: false,
    leftHKey: false,
    leftRKey: false,
    leftAKey: false,
    leftOKey: false,
    starKey: false,
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

  const briefLetters = brief.split("");

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

export default mapBriefToLapwingStenoKeys;
