function matchSplitText(material, typedText) {
  let materialChars = material.split('');
  let typedTextChars = typedText.split('');
  let i = 0;
  for (; i < typedTextChars.length; i++) {
    if (typedTextChars[i] !== materialChars[i]) {
      break;
    }
  };
  let matched = materialChars.slice(0,i).join('');
  let unmatched = materialChars.slice(i).join('');
  return [matched, unmatched];
}

export default matchSplitText;
