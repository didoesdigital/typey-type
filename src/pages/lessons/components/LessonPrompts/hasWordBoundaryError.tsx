export const hasWordBoundaryError = (
  currentPhrase: string,
  actualText: string
) => {
  return currentPhrase === "wars" && actualText.includes("Star Wars");
};
