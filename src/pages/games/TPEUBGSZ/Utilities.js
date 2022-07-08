import { shuffle } from "d3-array";
import affixList from "./affixesForTPEUBGSZ.json";

const isSuffix = (affixType) => affixType === "suffixes";

const addSomeAffixes = (
  madeUpWordParts,
  madeUpAffixParts,
  affixType,
  count,
  level
) => {
  const entries = shuffle(
    affixList[isSuffix(affixType) ? "suffixes" : "prefixes"]
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

export const makeUpAWordAndHint = (level) => {
  const madeUpWordParts = [];
  const madeUpAffixParts = [];
  addSomeAffixes(madeUpWordParts, madeUpAffixParts, "prefixes", 1, level);
  if (Math.random() < 0.5) {
    madeUpWordParts.push("beep");
    madeUpAffixParts.push("PWAOEP");
  } else {
    madeUpWordParts.push("boop");
    madeUpAffixParts.push("PWAOP");
  }
  addSomeAffixes(madeUpWordParts, madeUpAffixParts, "suffixes", 1, level);

  return [madeUpWordParts.join(""), madeUpAffixParts.join("/")];
};
