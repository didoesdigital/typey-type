// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasStretchKeys = (outline: string, _translation: string) =>
  !!outline.match(/[DZ]/);

export default hasStretchKeys;
