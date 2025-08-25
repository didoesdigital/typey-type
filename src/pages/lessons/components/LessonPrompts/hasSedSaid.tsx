export const hasSedSaid = (currentPhrase: string, actualText: string) => {
  const sedRegex = new RegExp(/^\s*sed\s*$/);
  // Note: doesn't bother checking for "said,", assuming this is more of an issue for early steno
  // students that have not yet reached story lessons
  return currentPhrase === "said" && actualText.match(sedRegex);
};
