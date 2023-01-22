import { actions } from "./rulesActions";
import type { Rules, RuleStatus } from "./types";

const defaultState: Rules = {
  isOneSyllable: "on",
  outlineIsTranslation: "on",
  hasOneKeyPerFinger: "on",
  hasStretchKeys: "disabled",
  fewerThanFiveCharacters: "on",
  moreThanTwoCharacters: "disabled",
  moreThanOneSyllable: "disabled",
  hasOnlyOneVowelKey: "on",
  hasOnlyShortIVowel: "disabled",
  hasAnyShortVowel: "disabled",
  hasAnyLongVowel: "disabled",
  hasDiphthong: "disabled",
  hasVowelDisambiguator: "disabled",
  hasAnyVowelKey: "disabled",
  isSingleStroke: "on",
  isMultiStroke: "disabled",
  hasForcedWordEnding: "disabled",
  hasOneConsonantOnEachSide: "on",
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
  hasSuppressedSpaceStroke: "disabled",
  hasEfAsVeeOrEss: "disabled",
  isFingerspelled: "disabled",
  hasNumbers: "disabled",
  hasPunctuation: "disabled",
  hasCapitalLetter: "disabled",
  isUppercase: "disabled",
  hasDictionaryFormatting: "off",
  hasCoding: "off",
  hasMedical: "off",
  hasDisambiguatingBrief: "disabled",
  hasPhillyShift: "off",
  hasShortTranslations: "disabled",
  hasLongTranslations: "disabled",
  hasLongWords: "disabled",
  isBrief: "disabled",
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
