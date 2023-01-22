import { actions } from "./rulesActions";
import type { Rules } from "./types";

const defaultState: Rules = {
  isOneSyllable: true,
  outlineIsTranslation: true,
  hasOneKeyPerFinger: true,
  hasStretchKeys: false,
  fewerThanFiveCharacters: true,
  moreThanTwoCharacters: false,
  moreThanOneSyllable: false,
  hasOnlyOneVowelKey: true,
  hasOnlyShortIVowel: false,
  hasAnyShortVowel: false,
  hasAnyLongVowel: false,
  hasDiphthong: false,
  hasVowelDisambiguator: false,
  hasAnyVowelKey: false,
  isSingleStroke: true,
  isMultiStroke: false,
  hasForcedWordEnding: false,
  hasOneConsonantOnEachSide: true,
  hasLhsConsonantWithMultipleKeys: false,
  hasRhsConsonantWithMultipleKeys: false,
  hasDigraphs: false,
  hasCompoundClusters: false,
  hasSomeConsonants: false,
  hasApostrophes: false,
  hasDoubleLetters: false,
  hasDoubleConsonants: false,
  hasDoubleVowels: false,
  hasContractionsPluralsOrPossessives: false,
  hasSimpleStenoKeys: true,
  hasUnstressedVowels: false,
  hasInversion: false,
  hasSuppressedSpaceStroke: false,
  hasEfAsVeeOrEss: false,
  isFingerspelled: false,
  hasNumbers: false,
  hasPunctuation: false,
  hasCapitalLetter: false,
  isUppercase: false,
  hasDictionaryFormatting: false,
  hasCoding: false,
  hasMedical: false,
  hasDisambiguatingBrief: false,
  hasPhillyShift: false,
  hasShortTranslations: false,
  hasLongTranslations: false,
  hasLongWords: false,
  isBrief: false,
  startsWithPrefix: false,
  endsWithSuffix: false,
  hasStar: false,
  isRomanNumeral: false,
  hasMoreThanOneConsonant: false,
};

export const initConfig = (state: Rules) => ({
  ...defaultState,
  ...state,
});

const toggleRule = (state: Rules, payload: { ruleName: keyof Rules }) => {
  return {
    ...state,
    [payload.ruleName]: !state[payload.ruleName],
  };
};

export const rulesReducer = (state: Rules, action: any) => {
  switch (action?.type) {
    case actions.toggleRule:
      return toggleRule(state, action.payload);

    default:
      return state;
  }
};
