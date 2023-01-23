// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isSuperlative = (_outline: string, translation: string) =>
  // (!translation.includes(" ") && translation.endsWith("er")) ||
  (!translation.includes(" ") && translation.endsWith("ier") && translation.length > 5) ||
  (!translation.includes(" ") &&
    translation.endsWith("est") &&
    translation.length > 4) ||
  translation.startsWith("most ") ||
  translation.startsWith("least ") ||
  (translation.startsWith("more ") && translation.endsWith("ly"));

export default isSuperlative;
