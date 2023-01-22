import { actions } from "./rulesActions";
import type { Rules, RuleStatus } from "./types";

export const defaultState: Rules = {
  endsWithSuffix: "ignored",
  fewerThanFiveCharacters: "ignored",
  hasAnyLongVowel: "ignored",
  hasAnyShortVowel: "ignored",
  hasAnyVowelKey: "ignored",
  hasApostrophes: "ignored",
  hasCapitalLetter: "ignored",
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
  hasMoreThanOneConsonant: "ignored",
  hasNumbers: "ignored",
  hasOneConsonantOnEachSide: "ignored",
  hasOneKeyPerFinger: "on",
  hasOneOrMoreSpaces: "ignored",
  hasOneSpace: "ignored",
  hasOnlyOneVowelKey: "ignored",
  hasOnlyShortIVowel: "ignored",
  hasPhillyShift: "off",
  hasPunctuation: "ignored",
  hasRhsConsonantWithMultipleKeys: "ignored",
  hasShortTranslations: "ignored",
  hasSimpleStenoKeys: "on",
  hasSomeConsonants: "ignored",
  hasStar: "ignored",
  hasStretchKeys: "ignored",
  hasSuppressedSpaceStroke: "off",
  hasUnstressedVowels: "ignored",
  hasVowelDisambiguator: "ignored",
  isBrief: "off",
  isFingerspelled: "off",
  isMultiStroke: "ignored",
  isOneSyllable: "on",
  isRomanNumeral: "ignored",
  isSingleStroke: "on",
  isUppercase: "off",
  moreThanOneSyllable: "ignored",
  moreThanTwoCharacters: "on",
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
