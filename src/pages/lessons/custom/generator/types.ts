export type RuleStatus = "on" | "off" | "ignored";

export type Rules = {
  isOneSyllable?: RuleStatus; // one_syllable
  outlineIsTranslation?: RuleStatus; // stroke_equals_translation
  hasOneKeyPerFinger?: RuleStatus; // one_key_per_finger
  hasStretchKeys?: RuleStatus; // stretch_keys
  fewerThanFiveCharacters?: RuleStatus; // four_or_less_characters
  moreThanTwoCharacters?: RuleStatus; // three_or_more_characters
  moreThanOneSyllable?: RuleStatus; // more_than_one_syllable
  hasOnlyOneVowelKey?: RuleStatus; // one_of_AOEU
  hasOnlyShortIVowel?: RuleStatus; // only_short_i
  hasAnyShortVowel?: RuleStatus; // short_vowel
  hasAnyLongVowel?: RuleStatus; // long_vowel
  hasDiphthong?: RuleStatus; // diphthongs
  hasVowelDisambiguator?: RuleStatus; // vowel_disambiguators
  hasAnyVowelKey?: RuleStatus; // vowel
  isSingleStroke?: RuleStatus; // single_stroke
  isMultiStroke?: RuleStatus; // multi_stroke
  hasForcedWordEnding?: RuleStatus; // forced_word_ending
  hasOneConsonantOnEachSide?: RuleStatus; // one_consonant_on_each_side
  hasLhsConsonantWithMultipleKeys?: RuleStatus; // lhs_consonant_with_multiple_keys
  hasRhsConsonantWithMultipleKeys?: RuleStatus; // rhs_consonant_with_multiple_keys
  hasDigraphs?: RuleStatus; // digraphs
  hasCompoundClusters?: RuleStatus; // compound_clusters
  hasSomeConsonants?: RuleStatus; // some_consonants
  hasApostrophes?: RuleStatus; // apostrophes
  hasDoubleLetters?: RuleStatus; // double_letters
  hasDoubleConsonants?: RuleStatus; // double_consonants
  hasDoubleVowels?: RuleStatus; // double_vowels
  hasContractionsPluralsOrPossessives?: RuleStatus; // contractions_plurals_or_possessives
  hasSimpleStenoKeys?: RuleStatus; // simple_steno_keys
  hasUnstressedVowels?: RuleStatus; // unstressed_vowels
  hasInversion?: RuleStatus; // inversion
  hasSuppressedSpaceStroke?: RuleStatus; // condensed_stroke
  hasEfAsVeeOrEss?: RuleStatus; // ef_as_vee_or_ess
  isFingerspelled?: RuleStatus; // fingerspelled_words
  hasNumbers?: RuleStatus; // numbers
  hasPunctuation?: RuleStatus; // punctuation
  hasCapitalLetter?: RuleStatus; // contains_uppercase
  isUppercase?: RuleStatus; // all_uppercase
  hasDictionaryFormatting?: RuleStatus; // dictionary_format
  hasCoding?: RuleStatus; // coding
  hasMedical?: RuleStatus; // medical
  hasDisambiguatingBrief?: RuleStatus; // disambiguating_brief
  hasPhillyShift?: RuleStatus; // philly_shift
  hasShortTranslations?: RuleStatus; // short_translations
  hasLongTranslations?: RuleStatus; // long_translations
  hasLongWords?: RuleStatus; // long_words
  isBrief?: RuleStatus; // brief
  startsWithPrefix?: RuleStatus; // prefix
  endsWithSuffix?: RuleStatus; // suffix
  hasStar?: RuleStatus; // star
  isSuperlative?: RuleStatus;
  isRomanNumeral?: RuleStatus;
  hasOneSpace?: RuleStatus;
  hasOneOrMoreSpaces?: RuleStatus;
};

type Filter = (outline: string, translation: string) => boolean;
export type FilterAndExpectation = [Filter, boolean];
export type RuleFunctionsTypes = {
  [Property in keyof Rules]: Filter;
};
