import { shuffle } from "d3-array";
import affixList from "./affixesForTPEUBGSZ.json";
import advancedAffixList from "./advancedAffixesForTPEUBGSZ.json";

// @ts-expect-error TS(7006) FIXME: Parameter 'affixType' implicitly has an 'any' type... Remove this comment to see the full error message
const isSuffix = (affixType) => affixType === "suffixes";

const baseAndAdvancedAffixList = {
  prefixes: [...advancedAffixList.prefixes, ...affixList.prefixes],
  suffixes: [...advancedAffixList.suffixes, ...affixList.suffixes],
};

const addSomeAffixes = (
  // @ts-expect-error TS(7006) FIXME: Parameter 'madeUpWordParts' implicitly has an 'any... Remove this comment to see the full error message
  madeUpWordParts,
  // @ts-expect-error TS(7006) FIXME: Parameter 'madeUpAffixParts' implicitly has an 'an... Remove this comment to see the full error message
  madeUpAffixParts,
  // @ts-expect-error TS(7006) FIXME: Parameter 'affixType' implicitly has an 'any' type... Remove this comment to see the full error message
  affixType,
  // @ts-expect-error TS(7006) FIXME: Parameter 'count' implicitly has an 'any' type.
  count,
  // @ts-expect-error TS(7006) FIXME: Parameter 'level' implicitly has an 'any' type.
  level,
  // @ts-expect-error TS(7006) FIXME: Parameter 'numberOfMetWords' implicitly has an 'an... Remove this comment to see the full error message
  numberOfMetWords
) => {
  const affixSource =
    numberOfMetWords < 1000 ? affixList : baseAndAdvancedAffixList;
  const entries = shuffle(
    affixSource[isSuffix(affixType) ? "suffixes" : "prefixes"]
  )
    .filter((affix) => {
      const affixLength = affix[1].length;
      return level === 4
        ? affixLength >= 4
        : level === 3
        ? affixLength >= 3 && affixLength <= 4
        : level === 2
        ? affixLength >= 2 && affixLength <= 3
        : affixLength >= 1 && affixLength <= 2;
    })
    .slice(0, count);
  entries.forEach(([stroke, affixText]) => {
    madeUpWordParts.push(affixText);
    madeUpAffixParts.push(
      stroke.replace(isSuffix(affixType) ? /^\// : /\/$/, "")
    );
  });
  return [madeUpWordParts, madeUpAffixParts];
};

// @ts-expect-error TS(7006) FIXME: Parameter 'level' implicitly has an 'any' type.
export const makeUpAWordAndHint = (level, numberOfMetWords) => {
  // @ts-expect-error TS(7034) FIXME: Variable 'madeUpWordParts' implicitly has type 'an... Remove this comment to see the full error message
  const madeUpWordParts = [];
  // @ts-expect-error TS(7034) FIXME: Variable 'madeUpAffixParts' implicitly has type 'a... Remove this comment to see the full error message
  const madeUpAffixParts = [];
  addSomeAffixes(
    // @ts-expect-error TS(7005) FIXME: Variable 'madeUpWordParts' implicitly has an 'any[... Remove this comment to see the full error message
    madeUpWordParts,
    // @ts-expect-error TS(7005) FIXME: Variable 'madeUpAffixParts' implicitly has an 'any... Remove this comment to see the full error message
    madeUpAffixParts,
    "prefixes",
    1,
    level,
    numberOfMetWords
  );
  if (Math.random() < 0.5) {
    madeUpWordParts.push("beep");
    madeUpAffixParts.push("PWAOEP");
  } else {
    madeUpWordParts.push("boop");
    madeUpAffixParts.push("PWAOP");
  }
  addSomeAffixes(
    madeUpWordParts,
    madeUpAffixParts,
    "suffixes",
    1,
    level,
    numberOfMetWords
  );

  return [madeUpWordParts.join(""), madeUpAffixParts.join("/")];
};
