const hasSuppressedSpaceStroke = (outline: string, _translation: string) =>
  !!outline.match(/\/TK-LS\//);

export default hasSuppressedSpaceStroke;
