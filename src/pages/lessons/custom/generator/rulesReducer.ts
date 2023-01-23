import { actions } from "./rulesActions";
import type { Rules, RuleStatus } from "./types";

export const defaultState: Rules = {
  endsWithSuffix: "ignored",
  fewerThanFiveCharacters: "off",
  hasAnyLongVowel: "ignored",
  hasAnyShortVowel: "ignored",
  hasAnyVowelKey: "ignored",
  hasApostrophes: "off",
  hasCapitalLetter: "off",
  hasCoding: "off",
  hasCompoundClusters: "ignored",
  hasContractionsPluralsOrPossessives: "ignored",
  hasDictionaryFormatting: "off",
  hasDigraphs: "ignored",
  hasDiphthong: "ignored",
  hasDisambiguatingBrief: "off",
  hasDoubleConsonants: "ignored",
  hasDoubleLetters: "ignored",
  hasDoubleVowels: "ignored",
  hasEfAsVeeOrEss: "ignored",
  hasForcedWordEnding: "off",
  hasInversion: "ignored",
  hasLhsConsonantWithMultipleKeys: "ignored",
  hasLongTranslations: "ignored",
  hasLongWords: "ignored",
  hasMedical: "off",
  hasNumbers: "off",
  hasOneConsonantOnEachSide: "ignored",
  hasOneKeyPerFinger: "ignored",
  hasOneOrMoreSpaces: "ignored",
  hasOneSpace: "ignored",
  hasOnlyOneVowelKey: "ignored",
  hasOnlyShortIVowel: "ignored",
  hasPhillyShift: "off",
  hasPunctuation: "off",
  hasRhsConsonantWithMultipleKeys: "ignored",
  hasShortTranslations: "ignored",
  hasSimpleStenoKeys: "ignored",
  hasSomeConsonants: "ignored",
  hasStar: "off",
  hasStretchKeys: "ignored",
  hasSuppressedSpaceStroke: "off",
  hasUnstressedVowels: "ignored",
  hasVowelDisambiguator: "ignored",
  isBrief: "off",
  isFingerspelled: "off",
  isMultiStroke: "ignored",
  isOneSyllable: "on",
  isRomanNumeral: "off",
  isSingleStroke: "ignored",
  isSuperlative: "ignored",
  isUppercase: "off",
  moreThanOneSyllable: "ignored",
  moreThanTwoCharacters: "ignored",
  outlineIsTranslation: "ignored",
  startsWithPrefix: "ignored",
};

export const initConfig = (state: Rules) => ({
  ...defaultState,
  ...state,
});

const setRuleStatus = (
  state: Rules,
  payload: { ruleName: keyof Rules; ruleStatus: RuleStatus }
) => {
  return {
    ...state,
    [payload.ruleName]: payload.ruleStatus,
  };
};

export const rulesReducer = (state: Rules, action: any) => {
  switch (action?.type) {
    case actions.setRuleStatus:
      return setRuleStatus(state, action.payload);

    default:
      return state;
  }
};
