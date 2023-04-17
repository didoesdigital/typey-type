const moreThanOneSyllable = (_outline: string, translation: string) => {
  const lowercaseTranslation = translation.toLowerCase();

  if (translation.includes(" ") || translation.includes("\n")) {
    return true;
  }

  if (
    ["mysql", "genre", "genres", "startled", "mingled"].includes(
      lowercaseTranslation
    )
  ) {
    return true;
  }

  if (translation.match(/^[A-Z]+$/)) return true;

  if (translation === "queue") return false;

  const modifiedTranslation = lowercaseTranslation
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");

  return (modifiedTranslation.match(/[aeiouy]{1,2}/g)?.length || 0) > 1;
};

export default moreThanOneSyllable;
