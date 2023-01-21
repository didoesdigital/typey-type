const romanNumerals = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

const isRomanNumeral = (outline: string, translation: string) =>
  romanNumerals.includes(translation) && outline.includes("R");

export default isRomanNumeral;
