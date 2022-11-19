const describePunctuation = (currentPhrase: string): string => {
  switch (currentPhrase) {
    case "`":
      return "back tick";
    case "“":
      return "left double quotation mark";
    case "”":
      return "right double quotation mark";
    case "‘":
      return "left single quotation mark";
    case "’":
      return "right single quotation mark";
    case "–":
      return "en dash";
    case "—":
      return "em dash";

    default:
      break;
  }

  return "";
};

export default describePunctuation;
