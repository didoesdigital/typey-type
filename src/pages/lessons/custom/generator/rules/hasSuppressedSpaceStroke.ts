// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasSuppressedSpaceStroke = (outline: string, _translation: string) =>
  !!outline.match(/\/TK-LS\//);

export default hasSuppressedSpaceStroke;
