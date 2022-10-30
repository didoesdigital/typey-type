type SingleLetterWords = {
  [singleCharacterWord: string]: string;
};

const singleLetterWords: SingleLetterWords = {
  "a": "AEU",
  "A": "KPA/AEU",
  "I": "EU",
  "X": "10R",
  "V": "5R",
} as const;

export default singleLetterWords;
