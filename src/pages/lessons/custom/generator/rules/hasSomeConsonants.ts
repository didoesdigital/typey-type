// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasSomeConsonants = (outline: string, _translation: string) =>
  !!(outline.match(/[STKPWHR]{2,}/) || outline.match(/[FRPBLGTSDZ]{2,}/));

export default hasSomeConsonants;
