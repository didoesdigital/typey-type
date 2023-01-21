// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasMoreThanOneConsonant = (outline: string, _translation: string) =>
  !!outline.match(/[STKPWHR].+[FRPBLGTSDZ]/) ||
  !!(outline.match(/[STKPWHR]{2,}/) || outline.match(/[FRPBLGTSDZ]{2,}/));

export default hasMoreThanOneConsonant;
