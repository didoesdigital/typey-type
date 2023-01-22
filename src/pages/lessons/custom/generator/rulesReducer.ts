import { actions } from "./rulesActions";
import type { Rules, RuleStatus } from "./types";

const defaultState: Rules = {
  isOneSyllable: "on",
  outlineIsTranslation: "disabled",
  hasOneKeyPerFinger: "on",
  hasStretchKeys: "disabled",
  fewerThanFiveCharacters: "on",
  moreThanTwoCharacters: "on",
  moreThanOneSyllable: "disabled",
  hasOnlyOneVowelKey: "disabled",
  hasOnlyShortIVowel: "disabled",
  hasAnyShortVowel: "disabled",
  hasAnyLongVowel: "disabled",
  hasDiphthong: "disabled",
  hasVowelDisambiguator: "disabled",
  hasAnyVowelKey: "disabled",
  isSingleStroke: "on",
  isMultiStroke: "disabled",
  hasForcedWordEnding: "off",
  hasOneConsonantOnEachSide: "disabled",
  hasLhsConsonantWithMultipleKeys: "disabled",
  hasRhsConsonantWithMultipleKeys: "disabled",
  hasDigraphs: "disabled",
  hasCompoundClusters: "disabled",
  hasSomeConsonants: "disabled",
  hasApostrophes: "disabled",
  hasDoubleLetters: "disabled",
  hasDoubleConsonants: "disabled",
  hasDoubleVowels: "disabled",
  hasContractionsPluralsOrPossessives: "disabled",
  hasSimpleStenoKeys: "on",
  hasUnstressedVowels: "disabled",
  hasInversion: "disabled",
  hasSuppressedSpaceStroke: "off",
  hasEfAsVeeOrEss: "disabled",
  isFingerspelled: "off",
  hasNumbers: "disabled",
  hasPunctuation: "disabled",
  hasCapitalLetter: "disabled",
  isUppercase: "off",
  hasDictionaryFormatting: "off",
  hasCoding: "off",
  hasMedical: "off",
  hasDisambiguatingBrief: "off",
  hasPhillyShift: "off",
  hasShortTranslations: "disabled",
  hasLongTranslations: "disabled",
  hasLongWords: "disabled",
  isBrief: "off",
  startsWithPrefix: "disabled",
  endsWithSuffix: "disabled",
  hasStar: "disabled",
  isRomanNumeral: "disabled",
  hasMoreThanOneConsonant: "disabled",
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
