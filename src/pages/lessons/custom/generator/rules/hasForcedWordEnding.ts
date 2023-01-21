// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasForcedWordEnding = (outline: string, _translation: string) =>
  !!outline.match(/^[^/]*\/SP-S$/);

export default hasForcedWordEnding;
