const isSingleStroke = (outline: string, _translation: string) =>
  !outline.match(/\//);

export default isSingleStroke;
