export type Rules = {
  isOneSyllable?: boolean; // one_syllable
  // outlineIsTranslation?: boolean; // stroke_equals_translation
  // hasOneKeyPerFinger?: boolean; // one_key_per_finger
  // hasStretchKeys?: boolean; // stretch_keys
  // fewerThanFiveCharacters?: boolean; // four_or_less_characters
  // moreThanTwoCharacters?: boolean; // three_or_more_characters
  // moreThanOneSyllable?: boolean; // more_than_one_syllable
  // hasOnlyOneVowelKey?: boolean; // one_of_AOEU
  // hasOnlyShortIVowel?: boolean; // only_short_i
  // hasAnyShortVowel?: boolean; // short_vowel
  // hasAnyLongVowel?: boolean; // long_vowel
  // hasDiphthong?: boolean; // diphthongs
  // hasVowelDisambiguator?: boolean; // vowel_disambiguators
  // hasAnyVowelKey?: boolean; // vowel
  // isSingleStroke?: boolean; // single_stroke
  // isMultiStroke?: boolean; // multi_stroke
  // hasForcedWordEnding?: boolean; // forced_word_ending
  // hasOneConsonantOnEachSide?: boolean; // one_consonant_on_each_side
  // hasLhsConsonantWithMultipleKeys?: boolean; // lhs_consonant_with_multiple_keys
  // hasRhsConsonantWithMultipleKeys?: boolean; // rhs_consonant_with_multiple_keys
  // hasDigraphs?: boolean; // digraphs
  // hasCompoundClusters?: boolean; // compound_clusters
  // hasSomeConsonants?: boolean; // some_consonants
  // hasApostrophes?: boolean; // apostrophes
  // hasDoubleLetters?: boolean; // double_letters
  // hasDoubleConsonants?: boolean; // double_consonants
  // hasDoubleVowels?: boolean; // double_vowels
  // hasContractionsPluralsOrPossessives?: boolean; // contractions_plurals_or_possessives
  // hasSimpleStenoKeys?: boolean; // simple_steno_keys
  // hasUnstressedVowels?: boolean; // unstressed_vowels
  // hasInversion?: boolean; // inversion
  // hasSuppressedSpaceStroke?: boolean; // condensed_stroke
  hasEfAsVeeOrEss?: boolean; // ef_as_vee_or_ess
  // isFingerspelled?: boolean; // fingerspelled_words
  // hasNumbers?: boolean; // numbers
  // hasPunctuation?: boolean; // punctuation
  // hasCapitalLetter?: boolean; // contains_uppercase
  // isUppercase?: boolean; // all_uppercase
  // hasDictionaryFormatting?: boolean; // dictionary_format
  // hasCoding?: boolean; // coding
  // hasMedical?: boolean; // medical
  // hasDisambiguatingBrief?: boolean; // disambiguating_brief
  // hasPhillyShift?: boolean; // philly_shift
  // hasShortTranslations?: boolean; // short_translations
  // hasLongTranslations?: boolean; // long_translations
  // hasLongWords?: boolean; // long_words
  // isBrief?: boolean; // brief
  // startsWithPrefix?: boolean; // prefix
  // endsWithSuffix?: boolean; // suffix
  // hasStar?: boolean; // star
  // isRomanNumeral?: boolean;
  // hasMoreThanOneConsonant?: boolean; // one_consonant_on_each_side || some_consonants
};

type Filter = (outline: string, translation: string) => boolean;
export type FilterAndExpectation = [Filter, boolean];
export type RuleFunctionsTypes = {
  [Property in keyof Rules]: Filter;
};
