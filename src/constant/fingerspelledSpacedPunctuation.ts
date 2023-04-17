type FingerspelledSpacedPunctuation = {
  [spacedPunctuationSymbol: string]: string;
};

// TODO: don't hardcode this
const fingerspelledSpacedPunctuation: FingerspelledSpacedPunctuation = {
  ":": "STPH-FPLT", // "STPH-FPLT": "{:}",
  ";": "STPH*FPLT", // "STPH*FPLT": "{;}",
  ".": "TP-PL",
} as const;

export default fingerspelledSpacedPunctuation;
