// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasOneConsonantOnEachSide = (outline: string, _translation: string) =>
  !!outline.match(/[STKPWHR].+[FRPBLGTSDZ]/);

export default hasOneConsonantOnEachSide;
