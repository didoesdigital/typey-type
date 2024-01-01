function removeIgnoredCharsFromSplitText(
  /** e.g. "^e" */
  matchedChars: string,
  /** e.g. "^" */
  ignoredChars: string
) {
  let newMatchedChars = matchedChars;
  for (let i = 0; i < ignoredChars.length; i++) {
    newMatchedChars = [...newMatchedChars]
      .filter((char) => !ignoredChars.includes(char))
      .join("");
  }
  return newMatchedChars;
}

export default removeIgnoredCharsFromSplitText;
