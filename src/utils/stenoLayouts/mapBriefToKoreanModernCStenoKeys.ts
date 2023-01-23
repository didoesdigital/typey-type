import type { Outline } from "../../types";

function mapBriefToKoreanModernCStenoKeys(brief: Outline) {
  let keys = {
    the1Key: false,
    the2Key: false,
    the3Key: false,
    the4Key: false,
    the5Key: false,
    theLeftㅎKey: false,
    theLeftㅁKey: false,
    theLeftㄱKey: false,
    theLeftㅈKey: false,
    theLeftㄴKey: false,
    theLeftㄷKey: false,
    theLeftㅇKey: false,
    theLeftㅅKey: false,
    theLeftㅂKey: false,
    theLeftㄹKey: false,
    theㅗKey: false,
    theㅏKey: false,
    theㅜKey: false,
    theStarKey: false,
    theㅓKey: false,
    theㅣKey: false,
    the6Key: false,
    the7Key: false,
    the8Key: false,
    the9Key: false,
    the0Key: false,
    theRightㅎKey: false,
    theRightㅇKey: false,
    theRightㄹKey: false,
    theRightㄱKey: false,
    theRightㄷKey: false,
    theRightㅂKey: false,
    theRightㄴKey: false,
    theRightㅅKey: false,
    theRightㅈKey: false,
    theRightㅁKey: false,
  };

  let briefCharacters = brief.split("");
  let briefCharactersLength = briefCharacters.length;
  let numbers = [];
  let leftSide = [];
  let vowels = [];
  let rightSide = [];
  let vowel = false;
  let vowelRegex = /[ㅗㅏㅜ*\-ㅓㅣ]/;
  let numberRegex = /[0-9]/;

  for (let i = 0; i < briefCharactersLength; i++) {
    let char = briefCharacters[i];
    if (!!char.match(vowelRegex)) {
      vowel = true;
      vowels.push(char);
    } else if (!!char.match(numberRegex)) {
      numbers.push(char);
    } else {
      if (vowel) {
        rightSide.push(char);
      } else {
        leftSide.push(char);
      }
    }
  }

  let numberslength = numbers.length;
  for (let i = 0; i < numberslength; i++) {
    const keyName = "the" + numbers[i] + "Key";
    if (keys.hasOwnProperty(keyName)) {
      // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{…}'
      keys[keyName] = true;
    }
  }

  let vowelslength = vowels.length;
  for (let i = 0; i < vowelslength; i++) {
    if (keys.hasOwnProperty("the" + vowels[i] + "Key")) {
      // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{…}'
      keys["the" + vowels[i] + "Key"] = true;
    } else if (vowels[i] === "*") {
      keys["theStarKey"] = true;
    }
  }

  let leftSidelength = leftSide.length;
  for (let i = 0; i < leftSidelength; i++) {
    if (keys.hasOwnProperty("theLeft" + leftSide[i] + "Key")) {
      // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{…}'
      keys["theLeft" + leftSide[i] + "Key"] = true;
    }
  }

  let rightSidelength = rightSide.length;
  for (let i = 0; i < rightSidelength; i++) {
    if (keys.hasOwnProperty("theRight" + rightSide[i] + "Key")) {
      // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{…}'
      keys["theRight" + rightSide[i] + "Key"] = true;
    }
  }

  // console.log("Brief: " + brief + ", keys: " + Object.entries(keys));
  // console.log("keys: " + Object.entries(keys));

  // This regex looks for 'vowels', star, or hyphen.
  // It escapes the star and hyphen.
  // It captures the matching character to preserve it in .split().
  // let regex = /([ㅗㅏㅜ*\-ㅓㅣ])/;
  // let sortedBrief = brief.split(regex).forEach((charsArray, index) => {
  //   charsArray.split('').sort().join('');
  // });

  // let koreanModernCStenoOrder = '12345ㅎㅁㄱㅈㄴㄷㅇㅅㅂㄹㅗㅏㅜ*ㅓㅣ67890ㅎㅇㄹㄱㄷㅂㄴㅅㅈㅁ';

  return keys;
}

export default mapBriefToKoreanModernCStenoKeys;
