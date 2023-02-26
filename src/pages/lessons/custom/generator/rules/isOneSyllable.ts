const isOneSyllable = (_outline: string, translation: string) => {
  const lowercaseTranslation = translation.toLowerCase();

  if (translation.includes(" ") || translation.includes("\n")) {
    return false;
  }

  if (translation.match(/[^A-Za-z0-9]/)) {
    return false;
  }

  if (
    ["mysql", "genre", "genres", "startled", "mingled"].includes(
      lowercaseTranslation
    )
  ) {
    return false;
  }

  if (translation === "queue") return true;

  if (translation.length <= 3) {
    return true;
  }

  const modifiedTranslation = lowercaseTranslation
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");

  return (modifiedTranslation.match(/[aeiouy]{1,2}/g)?.length || 0) === 1;
};

export default isOneSyllable;
