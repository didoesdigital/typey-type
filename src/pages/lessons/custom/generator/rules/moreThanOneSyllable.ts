import topOneSyllableTranslations from "./consts/topOneSyllableTranslations";
import topMultiSyllableTranslations from "./consts/topMultiSyllableTranslations";

const moreThanOneSyllable = (_outline: string, translation: string) => {
  const lowercaseTranslation = translation.toLowerCase();

  // Whitespace, new lines:
  if (translation.includes(" ") || translation.includes("\n")) {
    return true;
  }

  // True exceptions:
  if (["mysql", "genre", "genres"].includes(lowercaseTranslation)) {
    return true;
  }

  // False exceptions:
  if (translation === "queue") return false;

  // One syllable words in top 10000 words:
  if (topOneSyllableTranslations.has(translation)) {
    return false;
  }

  // Multi-syllable words in top 10000 words:
  if (topMultiSyllableTranslations.has(translation)) {
    return true;
  }

  // All caps initialisms like "HTML":
  if (translation.match(/^[A-Z]+$/)) return true;

  const modifiedTranslation = lowercaseTranslation
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");

  return (modifiedTranslation.match(/[aeiouy]{1,2}/g)?.length || 0) > 1;
};

export default moreThanOneSyllable;
