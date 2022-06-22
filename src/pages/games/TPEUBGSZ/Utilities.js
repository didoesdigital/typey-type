import { shuffle } from "d3-array";
import affixList from "./affixesForTPEUBGSZ.json";

const isSuffix = (affixType) => affixType === "suffixes";

const addSomeAffixes = (
  madeUpWordParts,
  madeUpAffixParts,
  affixType,
  count
) => {
  const entries = shuffle(
    affixList[isSuffix(affixType) ? "suffixes" : "prefixes"]
  ).slice(0, count);
  entries.forEach(([stroke, affixText]) => {
    madeUpWordParts.push(affixText);
    madeUpAffixParts.push(
      stroke.replace(isSuffix(affixType) ? /^\// : /\/$/, "")
    );
  });
  return [madeUpWordParts, madeUpAffixParts];
};

export const makeUpAWordAndHint = () => {
  const madeUpWordParts = [];
  const madeUpAffixParts = [];
  addSomeAffixes(madeUpWordParts, madeUpAffixParts, "prefixes", 1);
  if (Math.random() < 0.5) {
    madeUpWordParts.push("beep");
    madeUpAffixParts.push("PWAOEP");
  } else {
    madeUpWordParts.push("boop");
    madeUpAffixParts.push("PWAOP");
  }
  addSomeAffixes(madeUpWordParts, madeUpAffixParts, "suffixes", 1);

  return [madeUpWordParts.join(""), madeUpAffixParts.join("/")];
};
