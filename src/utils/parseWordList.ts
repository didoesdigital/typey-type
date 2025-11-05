/**
 * A string containing a list of words. It could be programmatically generated using metWords read from local storage or it could be from a textarea on the custom lesson setup page. It might be an empty string. Ideally, it's a plain list of words without spaces before or after them, separated by newlines. For example:
 *
 * ```plaintext
 * I
 * struck
 * a
 * match
 * a little bit
 * on the
 * wall;
 * ```
 */
type InputWordList = string;

function parseWordList(userInputWordList: InputWordList): string[] {
  const wordList: string[] = [];
  if (userInputWordList.length === 0) {
    return wordList;
  }
  let lines = userInputWordList.split("\n");
  lines = lines.filter((phrase) => phrase !== "");
  if (lines.length === 0) {
    return wordList;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    wordList.push(line);
  }

  return wordList;
}

export { parseWordList };
