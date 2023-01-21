// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isSingleStroke = (outline: string, _translation: string) =>
  !outline.match(/\//);

export default isSingleStroke;
