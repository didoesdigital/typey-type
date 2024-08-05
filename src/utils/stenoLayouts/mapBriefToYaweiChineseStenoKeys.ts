import type { Outline } from "../../types";

// stenoOrder and stenoKeys should always be updated together
const stenoOrder = [
  "#",
  "X",
  "B",
  "5",
  "D",
  "Z",
  "4",
  "G",
  "W",
  "3",
  "I",
  "U",
  "2",
  "N",
  "E",
  "1",
  "A",
  "O",
  "-",
  "#",
  "X",
  "B",
  "6",
  "D",
  "Z",
  "7",
  "G",
  "W",
  "8",
  "I",
  "U",
  "9",
  "N",
  "E",
  "0",
  "A",
  "O",
] as const;

const stenoKeys = [
  "LeftHashKey",
  "LeftXKey",
  "LeftBKey",
  "LeftDKey",
  "LeftDKey",
  "LeftZKey",
  "LeftGKey",
  "LeftGKey",
  "LeftWKey",
  "LeftIKey",
  "LeftIKey",
  "LeftUKey",
  "LeftNKey",
  "LeftNKey",
  "LeftEKey",
  "LeftAKey",
  "LeftAKey",
  "LeftOKey",
  "DashKey",
  "RightHashKey",
  "RightXKey",
  "RightBKey",
  "RightDKey",
  "RightDKey",
  "RightZKey",
  "RightGKey",
  "RightGKey",
  "RightWKey",
  "RightIKey",
  "RightIKey",
  "RightUKey",
  "RightNKey",
  "RightNKey",
  "RightEKey",
  "RightAKey",
  "RightAKey",
  "RightOKey",
] as const;

function mapBriefToYaweiChineseStenoKeys(brief: Outline) {
  let keys = {
    "LeftHashKey": false,
    "LeftXKey": false,
    "LeftBKey": false,
    "LeftDKey": false,
    "LeftZKey": false,
    "LeftGKey": false,
    "LeftWKey": false,
    "LeftIKey": false,
    "LeftUKey": false,
    "LeftNKey": false,
    "LeftEKey": false,
    "LeftAKey": false,
    "LeftOKey": false,
    "DashKey": false,
    "RightHashKey": false,
    "RightXKey": false,
    "RightBKey": false,
    "RightDKey": false,
    "RightZKey": false,
    "RightGKey": false,
    "RightWKey": false,
    "RightIKey": false,
    "RightUKey": false,
    "RightNKey": false,
    "RightEKey": false,
    "RightAKey": false,
    "RightOKey": false,
  };

  let briefLetters = brief.split("");
  // let briefLetters = [...brief];

  for (let i = 0; i < stenoOrder.length; i++) {
    if (briefLetters.length > 0) {
      if (briefLetters[0] === stenoOrder[i]) {
        keys[stenoKeys[i]] = true;
        briefLetters.shift();
      }
    }
  }

  if (brief.match(/[1-5]/)) {
    keys["LeftHashKey"] = true;
  }
  if (brief.match(/[6-9]/) || brief.includes("0")) {
    keys["RightHashKey"] = true;
  }

  return keys;
}

export default mapBriefToYaweiChineseStenoKeys;
