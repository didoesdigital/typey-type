import isOneSyllable from "../rules/isOneSyllable";
import outlineIsTranslation from "../rules/outlineIsTranslation";
import hasOneKeyPerFinger from "../rules/hasOneKeyPerFinger";
import hasStretchKeys from "../rules/hasStretchKeys";
import fewerThanFiveCharacters from "../rules/fewerThanFiveCharacters";
import moreThanTwoCharacters from "../rules/moreThanTwoCharacters";
import moreThanOneSyllable from "../rules/moreThanOneSyllable";
import hasOnlyOneVowelKey from "../rules/hasOnlyOneVowelKey";
import hasOnlyShortIVowel from "../rules/hasOnlyShortIVowel";
import hasAnyShortVowel from "../rules/hasAnyShortVowel";
import hasAnyLongVowel from "../rules/hasAnyLongVowel";
import hasDiphthong from "../rules/hasDiphthong";
import hasVowelDisambiguator from "../rules/hasVowelDisambiguator";
import hasAnyVowelKey from "../rules/hasAnyVowelKey";
import isSingleStroke from "../rules/isSingleStroke";
import isMultiStroke from "../rules/isMultiStroke";
import hasForcedWordEnding from "../rules/hasForcedWordEnding";
import hasOneConsonantOnEachSide from "../rules/hasOneConsonantOnEachSide";
import hasOneSpace from "../rules/hasOneSpace";
import hasOneOrMoreSpaces from "../rules/hasOneOrMoreSpaces";
import hasLhsConsonantWithMultipleKeys from "../rules/hasLhsConsonantWithMultipleKeys";
import hasRhsConsonantWithMultipleKeys from "../rules/hasRhsConsonantWithMultipleKeys";
import hasDigraphs from "../rules/hasDigraphs";
import hasCompoundClusters from "../rules/hasCompoundClusters";
import hasSomeConsonants from "../rules/hasSomeConsonants";
import hasApostrophes from "../rules/hasApostrophes";
import hasDoubleLetters from "../rules/hasDoubleLetters";
import hasDoubleConsonants from "../rules/hasDoubleConsonants";
import hasDoubleVowels from "../rules/hasDoubleVowels";
import hasContractionsPluralsOrPossessives from "../rules/hasContractionsPluralsOrPossessives";
import hasSimpleStenoKeys from "../rules/hasSimpleStenoKeys";
import hasUnstressedVowels from "../rules/hasUnstressedVowels";
import hasInversion from "../rules/hasInversion";
import hasSuppressedSpaceStroke from "../rules/hasSuppressedSpaceStroke";
import hasEfAsVeeOrEss from "../rules/hasEfAsVeeOrEss";
import isFingerspelled from "../rules/isFingerspelled";
import hasNumbers from "../rules/hasNumbers";
import hasPunctuation from "../rules/hasPunctuation";
import hasCapitalLetter from "../rules/hasCapitalLetter";
import isUppercase from "../rules/isUppercase";
import hasDictionaryFormatting from "../rules/hasDictionaryFormatting";
import hasCoding from "../rules/hasCoding";
import hasMedical from "../rules/hasMedical";
import hasDisambiguatingBrief from "../rules/hasDisambiguatingBrief";
import hasPhillyShift from "../rules/hasPhillyShift";
import hasShortTranslations from "../rules/hasShortTranslations";
import hasLongTranslations from "../rules/hasLongTranslations";
import hasLongWords from "../rules/hasLongWords";
import isBrief from "../rules/isBrief";
import startsWithPrefix from "../rules/startsWithPrefix";
import endsWithSuffix from "../rules/endsWithSuffix";
import isSuperlative from "../rules/isSuperlative";
import hasStar from "../rules/hasStar";
import isRomanNumeral from "../rules/isRomanNumeral";

import type { RuleFunctionsTypes } from "../types";

const ruleFunctions: Required<RuleFunctionsTypes> = {
  isOneSyllable: isOneSyllable,
  outlineIsTranslation: outlineIsTranslation,
  hasOneKeyPerFinger: hasOneKeyPerFinger,
  hasStretchKeys: hasStretchKeys,
  fewerThanFiveCharacters: fewerThanFiveCharacters,
  moreThanTwoCharacters: moreThanTwoCharacters,
  moreThanOneSyllable: moreThanOneSyllable,
  hasOnlyOneVowelKey: hasOnlyOneVowelKey,
  hasOnlyShortIVowel: hasOnlyShortIVowel,
  hasAnyShortVowel: hasAnyShortVowel,
  hasAnyLongVowel: hasAnyLongVowel,
  hasDiphthong: hasDiphthong,
  hasVowelDisambiguator: hasVowelDisambiguator,
  hasAnyVowelKey: hasAnyVowelKey,
  isSingleStroke: isSingleStroke,
  isMultiStroke: isMultiStroke,
  hasForcedWordEnding: hasForcedWordEnding,
  hasOneConsonantOnEachSide: hasOneConsonantOnEachSide,
  hasOneSpace: hasOneSpace,
  hasOneOrMoreSpaces: hasOneOrMoreSpaces,
  hasLhsConsonantWithMultipleKeys: hasLhsConsonantWithMultipleKeys,
  hasRhsConsonantWithMultipleKeys: hasRhsConsonantWithMultipleKeys,
  hasDigraphs: hasDigraphs,
  hasCompoundClusters: hasCompoundClusters,
  hasSomeConsonants: hasSomeConsonants,
  hasApostrophes: hasApostrophes,
  hasDoubleLetters: hasDoubleLetters,
  hasDoubleConsonants: hasDoubleConsonants,
  hasDoubleVowels: hasDoubleVowels,
  hasContractionsPluralsOrPossessives: hasContractionsPluralsOrPossessives,
  hasSimpleStenoKeys: hasSimpleStenoKeys,
  hasUnstressedVowels: hasUnstressedVowels,
  hasInversion: hasInversion,
  hasSuppressedSpaceStroke: hasSuppressedSpaceStroke,
  hasEfAsVeeOrEss: hasEfAsVeeOrEss,
  isFingerspelled: isFingerspelled,
  hasNumbers: hasNumbers,
  hasPunctuation: hasPunctuation,
  hasCapitalLetter: hasCapitalLetter,
  isUppercase: isUppercase,
  hasDictionaryFormatting: hasDictionaryFormatting,
  hasCoding: hasCoding,
  hasMedical: hasMedical,
  hasDisambiguatingBrief: hasDisambiguatingBrief,
  hasPhillyShift: hasPhillyShift,
  hasShortTranslations: hasShortTranslations,
  hasLongTranslations: hasLongTranslations,
  hasLongWords: hasLongWords,
  isBrief: isBrief,
  startsWithPrefix: startsWithPrefix,
  endsWithSuffix: endsWithSuffix,
  isSuperlative: isSuperlative,
  hasStar: hasStar,
  isRomanNumeral: isRomanNumeral,
};

export default ruleFunctions;
