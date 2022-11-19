const punctuationDescriptions: {[punctuationSymbol: string]: string} = {
  "`": "backtick",
  "“": "left double quotation mark",
  "”": "right double quotation mark",
  "‘": "left single quotation mark",
  "’": "right single quotation mark",
  "–": "en dash",
  "—": "em dash",
};


const describePunctuation = (currentPhrase: string): string => {
  return punctuationDescriptions[currentPhrase] ?? ""; // Nullish coalescing operator
};

export default describePunctuation;
