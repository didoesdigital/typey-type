import topOneSyllableTranslations from "./consts/topOneSyllableTranslations";
import topMultiSyllableTranslations from "./consts/topMultiSyllableTranslations";

const isOneSyllable = (_outline: string, translation: string) => {
  const lowercaseTranslation = translation.toLowerCase();

  // Whitespace, new lines:
  if (translation.includes(" ") || translation.includes("\n")) {
    return false;
  }

  // Punctuation:
  if (translation.match(/[^A-Za-z0-9]/)) {
    return false;
  }

  // False exceptions:
  if (["mysql", "genre", "genres"].includes(lowercaseTranslation)) {
    return false;
  }

  // True exceptions:
  if (translation === "queue") return true;

  // One syllable words in top 10000 words:
  if (topOneSyllableTranslations.has(translation)) {
    return true;
  }

  // Multi-syllable words in top 10000 words:
  if (topMultiSyllableTranslations.has(translation)) {
    return false;
  }

  // Short words like "hm"
  if (translation.length <= 3) {
    return true;
  }

  const modifiedTranslation = lowercaseTranslation
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");

  return (modifiedTranslation.match(/[aeiouy]{1,2}/g)?.length || 0) === 1;
};

export default isOneSyllable;
