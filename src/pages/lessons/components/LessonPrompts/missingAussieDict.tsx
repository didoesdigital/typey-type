export const missingAussieDict = (
  currentStroke: string,
  actualText: string
) => {
  const untranslatedAussieSuffixRegex = new RegExp(/(A\*U|aw)/);
  return (
    (currentStroke.includes("/A*U ") ||
      currentStroke.includes("/A*U/") ||
      currentStroke.endsWith("/A*U")) &&
    actualText.match(untranslatedAussieSuffixRegex)
  );
};
