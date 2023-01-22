import { actions } from "./rulesActions";
import type { Rules, RuleStatus } from "./types";

const defaultState: Rules = {
  isOneSyllable: "on",
  outlineIsTranslation: "ignored",
  hasOneKeyPerFinger: "on",
  hasStretchKeys: "ignored",
  fewerThanFiveCharacters: "on",
  moreThanTwoCharacters: "on",
  moreThanOneSyllable: "ignored",
  hasOnlyOneVowelKey: "ignored",
  hasOnlyShortIVowel: "ignored",
  hasAnyShortVowel: "ignored",
  hasAnyLongVowel: "ignored",
  hasDiphthong: "ignored",
  hasVowelDisambiguator: "ignored",
  hasAnyVowelKey: "ignored",
  isSingleStroke: "on",
  isMultiStroke: "ignored",
  hasForcedWordEnding: "off",
  hasOneConsonantOnEachSide: "ignored",
  hasLhsConsonantWithMultipleKeys: "ignored",
  hasRhsConsonantWithMultipleKeys: "ignored",
  hasDigraphs: "ignored",
  hasCompoundClusters: "ignored",
  hasSomeConsonants: "ignored",
  hasApostrophes: "ignored",
  hasDoubleLetters: "ignored",
  hasDoubleConsonants: "ignored",
  hasDoubleVowels: "ignored",
  hasContractionsPluralsOrPossessives: "ignored",
  hasSimpleStenoKeys: "on",
  hasUnstressedVowels: "ignored",
  hasInversion: "ignored",
  hasSuppressedSpaceStroke: "off",
  hasEfAsVeeOrEss: "ignored",
  isFingerspelled: "off",
  hasNumbers: "ignored",
  hasPunctuation: "ignored",
  hasCapitalLetter: "ignored",
  isUppercase: "off",
  hasDictionaryFormatting: "off",
  hasCoding: "off",
  hasMedical: "off",
  hasDisambiguatingBrief: "off",
  hasPhillyShift: "off",
  hasShortTranslations: "ignored",
  hasLongTranslations: "ignored",
  hasLongWords: "ignored",
  isBrief: "off",
  startsWithPrefix: "ignored",
  endsWithSuffix: "ignored",
  hasStar: "ignored",
  isRomanNumeral: "ignored",
  hasMoreThanOneConsonant: "ignored",
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
